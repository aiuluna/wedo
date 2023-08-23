import React, { useEffect } from "react";
import style from "./ui.module.scss"
import { useParams } from 'react-router-dom'
import useEditor from "../hooks/useEditor";
import ComponentList from "../components/ComponentList";
import Panel from "../components/render/Panel";
import { UIModel } from "../object/UIModel";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import PropEditor from "../components/propEditor/ComponentPropEditor";
import TitleBar from "../components/frame/TitleBar";
import RenderContext from "../components/render/RenderContext";
import { CordNew } from "@wedo/meta/lib/instance/Cord.new";
import { Rect } from "@wedo/utils";
import { usePage, NodeRender } from "@wedo/render";
import { Topic } from "@wedo/meta";

const BottomBar = () => {
  return <div className={style.footer}></div>
}

const Preview = () => {
  let { page: pageName } = useParams<{ [key: string]: string }>()
  if (!pageName) pageName = 'default';

  
  const page = usePage(pageName)

  useEffect(() => {
    requestAnimationFrame(() => {
      if (page !== null) {
        // page.emit(Topic.Loaded)
      } 
    })
  }, [page])

  if (!page) {
    return null;
  }

  return <React.Fragment>
    <TitleBar pageName={pageName} name="preview" />
    <div className={style['preview-container']}>
      <RenderContext.Provider value={{
        cord: new CordNew(Rect.ZERO),
        page
      }}>
        <NodeRender node={page.getRoot()} />

      </RenderContext.Provider>

    </div>
    {/* <BottomBar /> */}
  </React.Fragment>
}


export default Preview;