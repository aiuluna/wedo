import React, { useEffect } from "react";
import style from "./ui.module.scss"
import { useParams } from 'react-router-dom'
import useEditor from "../hooks/useEditor";
import ComponentList from "../components/ComponentList";
import Panel from "../components/render/Panel";
import NodeRender from "../components/render/NodeRender";
import { UIModel } from "../object/UIModel";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import PropEditor from "../components/propEditor/ComponentPropEditor";
import TitleBar from "../components/frame/TitleBar";

const BottomBar = () => {
  return <div className={style.footer}></div>
}



const Wedo = () => {
  let { page: pageName } = useParams<{ [key: string]: string }>()
  if (!pageName) pageName = 'default';

  const [editor] = useEditor(pageName);


  const saveListener = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      editor?.save();
      console.log('保存成功')
    }
  }

  useEffect(() => {
    if (!editor) return;
    window.addEventListener('keydown', saveListener)
    return () => window.removeEventListener('keydown', saveListener)
  }, [editor])

  if (!editor) {
    return null
  }

  return <React.Fragment>
    <TitleBar pageName={pageName} name="wedo" />
    <div className={style.container}>
      <ComponentList editor={editor} />
      <Panel editor={editor}>
        {/* <LocalComponent /> */}
        <NodeRender node={editor.page.getRoot()} />
      </Panel>
      <div className={style["right"]}>
        <RightTabs editor={editor} />
      </div>
    </div>
    {/* <BottomBar /> */}
  </React.Fragment>
}

const RightTabs = ({ editor }: { editor: UIModel }) => {
  return <Tabs defaultActiveKey="1"
    type="card"
    style={{ height: '100%', overflowY: 'auto' }}
    items={new Array(1).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: `属性编辑`,
        key: id,
        children: <PropEditor editor={editor} />,
      };
    }) }>
    {/* <TabPane tab="属性编辑" key="1">
      <PropEditor editor={editor}/>
    </TabPane> */}
    {/* <TabPane tab="页面结构" key="2">
      
    </TabPane> */}
  </Tabs>
}

export default Wedo;