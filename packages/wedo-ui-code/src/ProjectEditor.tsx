import { CodeProjectType } from "@wedo/code"
import CodeEditor from "./CodeEditor"
import { Explorer } from "./Explorer"
import { RenderContext } from "./RenderContext"
import style from './code.module.scss'
import { useCodeEditor } from "./hooks/useCodeEditor"

export const ProjectEditor = ({ name, type }: { name: string, type: CodeProjectType }) => {
  const editor = useCodeEditor(type + "-" + name, type)

  return (
    <RenderContext.Provider value={editor}>
      <div className={style['container']}>
        <Explorer />
        <CodeEditor />
      </div>
    </RenderContext.Provider>

  )
}