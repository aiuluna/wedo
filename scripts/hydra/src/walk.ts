import fs from 'fs'
import path from 'path'
import { Package } from './package';
import { Projects } from './projects';

function* walk(dir: string, pattern: RegExp, exclude: RegExp): Generator<any> {
    const files = fs.readdirSync(dir);
    // console.log('files', files)
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fullName = path.resolve(dir, file)
        if (fullName.match(exclude)) {
            continue
        }
        if (fullName.match(pattern)) {
            yield [file, dir]
        }
        if (fs.statSync(fullName).isDirectory()) {
            yield* walk(fullName, pattern, exclude)
        }

    }
}

export function getProjects(): Projects {
  console.log('path.resolve', path.resolve(__dirname, '../../../packages'))
    const results = [...walk(path.resolve(__dirname, '../../../packages'), /package\.json$/, /(node_modules|\.git)/)]
    return new Projects(results.map(([file, dir]) => {
      // console.log('file', file)
      // console.log('dir', dir)
      return new Package(file, dir)
    }))
}