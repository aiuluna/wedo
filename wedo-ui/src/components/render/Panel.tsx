import { useContext, useEffect, useMemo, useRef } from "react"
import useBound from "../../hooks/useBound"
import { UIModel } from "../../object/UIModel"
import useThrottledState from "../../hooks/useThrottledState"
import RenderContext from "./RenderContext"
import classes from './render.module.scss'
import "./render.scss"
import { UIEvents } from "../../object/uiModel.types"
import Shadow from "./Shadow"
import { Topic } from "@wedo/meta"

type VecRef = {
  vec: [number, number] | null
}
export default ({ children, editor }: {
  children: JSX.Element,
  editor: UIModel
}) => {
  const [rect, ref] = useBound();
  const vec = useRef<VecRef>({ vec: null })
  const startVec = useRef<VecRef>({ vec: null })
  const [position, setPosition] = useThrottledState<[number, number]>([0, 0], 16)
  const renderContext = useContext(RenderContext);

  // 提前执行将editor放到context上
  useMemo(() => {
    renderContext.editor = editor
  }, [])

  useEffect(() => {

  }, [rect])

  return (
    <RenderContext.Provider value={renderContext}>
      <div
        className={classes.panel}
        onMouseMove={(e) => {
          e.preventDefault()
          // 触发鼠标移动事件
          editor.dispatch(UIEvents.EvtMoving, [e.clientX, e.clientY])

          // editor.selection.forEach((node) => {
          //   node.emit(Topic.MouseMoveEventPass, e)
          // })

          // 处理拖拽新元素事件
          const meta = editor.dropComponentMeta;
          // 没有dropMeta表示没有发生拖拽事件
          if (!meta) return;

          setPosition([e.clientX, e.clientY])
          const position = [renderContext.cord.worldX(e.clientX), renderContext.cord.worldY(e.clientY)]
          editor.dispatch(UIEvents.EvtAddDraging, position)
        }}
        onMouseUp={e => {
          e.preventDefault()
          vec.current.vec = null;
          startVec.current.vec = null;
          editor.dispatch(UIEvents.EvtDrop)
          setPosition([0, 0])
        }}
      >
        <Shadow
          position={position}
          meta={editor.dropComponentMeta}
        />
        {children}
      </div>

    </RenderContext.Provider>
  )
}