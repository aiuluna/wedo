import Editor from '@monaco-editor/react'
import style from './code.module.scss'
import { useContext } from 'react';
import { RenderContext } from './RenderContext';
import { debounce } from '@wedo/utils';

const extToLang = {
  'ts': 'typescript',
  'json': 'json'
}

const CodeEditor = () => {
  const editor = useContext(RenderContext)
  const selectFile = editor?.getSelectedFile()
  return <Editor
    theme='vs-dark'
    className={style["code-editor"]}
    language={extToLang[selectFile?.getExt() as keyof typeof extToLang || 'ts']}
    onChange={debounce(e => {
      console.log('onchange', e)
      selectFile?.setContent(e || '')
      editor?.save()
    }, 2000)}
    value={selectFile?.getContent()}
    options={{
      fontSize: 24
    }}
  />
};

export default CodeEditor;