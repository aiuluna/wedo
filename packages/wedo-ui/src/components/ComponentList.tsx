import { ComponentsLoader } from "@wedo/loader/lib";
import { useRef } from "react";
import { UIModel } from "../object/UIModel";
import style from './compo-list.module.scss'
import { groupBy } from 'ramda'
import { ComponentMeta } from "@wedo/meta";
import { UIEvents } from "../object/uiModel.types";

interface ComponentListProps {
  editor: UIModel
}



const ComponentList = ({ editor }: ComponentListProps) => {
  const groupTitle: any = {
    basic: "基础组件",
    container: "容器组件",
    // "custom-react": "外部React组件",
    // "custom-vue": "外部Vue组件",
  }

  const { current: loader } = useRef(ComponentsLoader.getInstance());

  // 将group为basic和container分组
  const groupList = Object.values(groupBy((x: ComponentMeta) => x.group, loader.list))

  return <div className={style["component-list"]}>
    <div className={style["component-list-inner"]}>
      {
        groupList.map((list: Array<ComponentMeta>, i: number) => {
          const title = groupTitle[list[0].group];
          return <div key={i} className={style['component-list-group']}>
            <h2>{title}</h2>
            {list.map((compMeta: ComponentMeta) => {
              return (
                <div
                  key={compMeta.name}
                  draggable
                  className={style["component-list-item"]}
                  onDragStart={(evt) => {
                    evt.preventDefault()
                    editor.dispatch(UIEvents.EvtStartDragAdd, compMeta)
                  }}
                >
                  <img src={compMeta.imageUrl} alt="" />
                  <div className={style.text}>
                    {compMeta.title}
                  </div>
                </div>
              )
            })}
            <div style={{ clear: "both" }}></div>
          </div>
        })
      }

    </div>
  </div>
}

export default ComponentList;