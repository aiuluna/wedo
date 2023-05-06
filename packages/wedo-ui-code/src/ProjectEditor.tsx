import CodeEditor from "./CodeEditor"
import { Explorer } from "./Explorer"
import { RenderContext } from "./RenderContext"
import style from './code.module.scss'
import { useCodeEditor } from "./hooks/useCodeEditor"

export const ProjectEditor = () => {
  const editor = useCodeEditor('root', 'codeless')
  return (
    <RenderContext.Provider value={editor}>
      <div className={style['container']}>
        <Explorer />
        <CodeEditor lang="typescript" />
      </div>
    </RenderContext.Provider>

  )
}