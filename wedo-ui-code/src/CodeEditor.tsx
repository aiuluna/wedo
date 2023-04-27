import Editor from '@monaco-editor/react'
import style from './code.module.less'

const CodeEditor = ({ lang }: { lang: string }) => {
  return <Editor theme='vs-dark' className={style["code-editor"]} language={lang} />
};

export default CodeEditor;