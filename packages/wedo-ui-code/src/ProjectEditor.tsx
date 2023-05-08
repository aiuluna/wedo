import CodeEditor from "./CodeEditor"
import { Explorer } from "./Explorer"
import { RenderContext } from "./RenderContext"
import style from './code.module.scss'
import { useCodeEditor } from "./hooks/useCodeEditor"

export const ProjectEditor = ({ name }: { name: string }) => {
  const editor = useCodeEditor(name, 'codeless')
  return (
    <RenderContext.Provider value={editor}>
      <div className={style['container']}>
        <Explorer />
        <CodeEditor />
      </div>
    </RenderContext.Provider>

  )
}