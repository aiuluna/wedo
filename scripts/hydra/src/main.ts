#!/usr/bin/env node
import path from 'path';
import yargs from 'yargs-parser'
import { Projects } from './projects';
import { getProjects } from './walk';
import { chooseRunnablesProject, error } from './utils';

const argv = yargs(process.argv.slice(2))
const cmd = argv._[0]

const projects = getProjects()
async function run() {
  switch (cmd) {
    case "list":
    case "ls":
      projects.list()
      break;
    case "install-deps":
      projects.install(argv.type)
      break;
    case "install-dep":
      projects.install(argv.type, argv.name)
      break;
    case "reinstall":
      projects.reInstall(argv.type, argv.name)
      break;
    case "install-links":
      await projects.links()
      break;
    case "install-link":
      await projects.links(argv.name)
      break;
    case "clear":
      projects.clear()
      break;
    case "dev":
      let dev_name = argv.name;
      if (!dev_name) {
        error("Please specify a project name")
        break
      }
      let pkg = projects.findPackage(dev_name)
      if (!pkg) {
        pkg = await chooseRunnablesProject(projects, `project ${dev_name} not found, you may choose one from below.\n`)
      }
      pkg?.runDev()
      break;
    case "build":
      projects.build(argv.name)
      break;
    case "serve":
      projects.serve(argv.name)
      break;
    default:
      break;
  }
}

run()