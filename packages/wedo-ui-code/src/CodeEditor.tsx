import Editor from '@monaco-editor/react'
import style from './code.module.scss'
import { useContext } from 'react';
import { RenderContext } from './RenderContext';

const extToLang = {
  'ts': 'typescript',
  'json': 'json'
}

const CodeEditor = () => {
  const context = useContext(RenderContext)
  const selectFile = context?.getSelectedFile()
  return <Editor
    theme='vs-dark'
    className={style["code-editor"]}
    language={extToLang[selectFile?.getExt() as keyof typeof extToLang || 'ts']} 
    onChange={e => {
      selectFile?.setContent(e || '')
    }}
    value={selectFile?.getContent()}
    options={{
      fontSize: 24
    }}
    />
};

export default CodeEditor;