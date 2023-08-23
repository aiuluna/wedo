import { GroupMeta } from "@wedo/meta";
import PropItem from "../../object/PropItem";
import React, { useState } from "react";
import * as R from 'ramda'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'

import style from './prop-editor.module.scss'
import PropertyItem from "./PropertyItem";

interface GroupProps {
  group: GroupMeta,
  props: { [key: string]: PropItem }
}

const PropertyGroup = ({ group, props }: GroupProps) => {
  const [state, setState] = useState(1);
  const groupStyle = Object.assign({}, group.style)

  if (state === 0) {
    groupStyle.display = "none"
  }

  // 找到当前group的list
  const list = Object.values(props).filter(x => group.propKeys.has(x.meta.config.name))
  // [1: [], 2, []]
  const groupsMap = R.groupBy((x) => x.meta.config.row + '', list);

  const groups = Object.values(groupsMap);
  return (
    <div className={style.group}>
      <h2
        onClick={() => {
          setState((x) => 1 - x)
        }}
      >
        <span>{group.title}</span>
        {state === 0 ? <CaretDownOutlined /> : <CaretRightOutlined />}

      </h2>

      <div style={groupStyle}>
        {groups.map((list, i) => {
          return <React.Fragment key={i}>
            <h3 key={"row-label"} className={style['row-label']}>{list[0].meta.config.rowLabel}</h3>
            <div className={`${style['group-row']} ${i===groups.length-1 ? style.last : ''}`}>
              {list.map((prop) => {
                return (
                  // <div>{prop.meta.config.name}</div>
                  <PropertyItem
                    disabled={!!group.disabled}
                    key={prop.meta.config.name}
                    prop={prop}
                  />
                )
              })}
            </div>
          </React.Fragment>
        })}
      </div>
    </div>
  )
}

export default PropertyGroup;