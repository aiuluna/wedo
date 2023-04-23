import { Topic } from "@wedo/meta";
import { useState } from "react"
import useSubscribe from "../../hooks/useSubscribe";
import { UIModel } from "../../object/UIModel"
import style from './prop-editor.module.scss'
import PropertyGroup from "./PropertyGroup";

interface PropEditorProps {
  editor: UIModel
}

const ComponentPropEditor = ({ editor }: PropEditorProps) => {

  const [ver, setVer] = useState(0);

  useSubscribe([editor.propertyEditor, Topic.PropertyModelUpdated], () => {
    setVer(x => x + 1)
  })

  return (
    <div className={style.editor} key={ver}>
      <div className={style.scroller}>

        {editor.propertyEditor.groups.map((group) => {
          return <PropertyGroup key={group.name} group={group} props={editor.propertyEditor.props} />
        })}
      </div>
    </div>
  )
}

export default ComponentPropEditor