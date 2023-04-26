import Editor from '@monaco-editor/react'
import './code.less'

const CodeEditor = ({ lang }: { lang: string }) => {
  return <Editor theme='vs-dark' className='code-editor' language={lang} />
};

export default CodeEditor;