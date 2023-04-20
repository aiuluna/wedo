import React, { useEffect } from "react";
import style from "./ui.module.scss"
import { useParams } from 'react-router-dom'
import useEditor from "../hooks/useEditor";
import ComponentList from "../components/ComponentList";
import Panel from "../components/render/Panel";
import NodeRender from "../components/render/NodeRender";

const BottomBar = () => {
  return <div className={style.footer}></div>
}

const Wedo = () => {
  let { page: pageName } = useParams<{ [key: string]: string }>()
  if (!pageName) pageName = 'default';

  const [editor] = useEditor(pageName);

  useEffect(() => {
    if (!editor) return;
    console.log('editor', editor)
  }, [editor])

  if(!editor) {
    return null
  }

  return <React.Fragment>
    {/* <TitleBar pageName={pageName} name="skedo" /> */}
    <div className={style.container}>
      <ComponentList editor={editor} />
      <Panel editor={editor}>
        {/* <LocalComponent /> */}
        <NodeRender node={editor.page.getRoot()}/>
      </Panel>
      {/* <Panel editor={editor}>
        <NodeRender node={editor.page.root} />
      </Panel>
      <div className={style["right"]}>
        <RightTabs editor={editor} />
      </div> */}
    </div>
    {/* <BottomBar /> */}
  </React.Fragment>
}

export default Wedo;