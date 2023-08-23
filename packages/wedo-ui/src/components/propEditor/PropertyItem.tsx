import { Topic } from "@wedo/meta"
import useSubscribe from "../../hooks/useSubscribe"
import PropItem from "../../object/PropItem"
import { useEffect, useState } from "react"
import { PropComponentProps } from './propeditor.types'
import style from './prop-editor.module.scss'
import StringInput from "./StringInput"
import Integer from "./Integer"
import ColorPicker from "./ColorPicker"
import Image from "./Image"
import { Select } from 'antd'
import SizeInput from "./SizeInput"
import FontStyleSelector from "./FontStyleSelector"
import TextAlignSelector from "./TextAlignSelector"

interface PropItemProps {
  prop: PropItem,
  disabled: boolean
}
const Option = Select.Option;

const ptnList = /^list<(.*)>$/
function render(type: string, props: PropComponentProps, key: any) {
  // list<integer>
  if (type.match(ptnList)) {
    console.log("🚀 ~ file: PropertyItem.tsx:14 ~ render ~ type:", type)
  }

  switch (type) {
    case 'name':
      return <StringInput key={key} {...props} regex={/^[a-zA-Z0-9]*$/} />
    case 'integer':
      return <Integer key={key} {...props} />
    case 'string':
      return (
        <StringInput
          style={{ width: 100 }}
          key={key}
          {...props}
          regex={/.*/}
        />
      )
    case 'image':
      return <Image key={key} {...props} />
    case 'color':
      return (
        <ColorPicker
          key={key}
          disabled={props.disabled}
          defaultValue={props.propValue}
          onChange={v => props.onChange(v)}
        />
      )
    case 'select':
      return (
        <Select
          key={key}
          disabled={props.disabled}
          {...props.metaProps}
          onChange={(value) => props.onChange(value)}
          defaultValue={props.propValue}
        >
          {props.metaProps.selections.map((item: any) => {
            return <Option key={item.value} value={item.value}>{item.text}</Option>
          })}

        </Select>)
    case "font-family":
      return (
        <Select
          key={key}
          {...props.metaProps}
          defaultValue={"Microsoft Yahei"}
          disabled={props.disabled}
          onChange={(value) => props.onChange(value)}
        >
          <Option value="Microsoft YaHei">微软雅黑</Option>
          <Option value="宋体">宋体</Option>
          <Option value="arial">Arial</Option>
          <Option value="cursive">cursive</Option>
          <Option value="helvetica">Helvetica</Option>
        </Select>
      )
    case "size":
      return <SizeInput key={key} {...props} />
    case "font-align":
      return (
        <TextAlignSelector
          key={key}
          initialValue={props.propValue}
          onChange={(value) => props.onChange(value)}
        />
      )
    case "font-style":
      return (
        <FontStyleSelector
          key={key}
          initialValue={props.propValue}
          onChange={(value) => {
            props.onChange(value)
          }}
        />
      )
    default:
      return null
  }
}

function renderProp(prop: PropItem, disabled: boolean, key: any) {
  return render(prop.meta.config.type, {
    disabled: disabled || prop.disabled,
    onChange: (v: any) => {
      prop.set(v)
      return
    },
    children: prop.meta.config.children,
    propValue: prop.value,
    metaProps: prop.meta.config.props
  }, key)

}

const PropertyItem = ({
  prop,
  disabled
}: PropItemProps) => {
  const [_, setVer] = useState(0)

  // useSubscribe([prop, Topic.PropertyChanged], () => {
  //   setVer(x => x + 1)
  // })
  useEffect(() => {
    const unsub = prop.on(Topic.PropertyChanged).subscribe(() => {
      setVer(x => x + 1)
    })

    return () => {
      unsub && unsub.unsubscribe()
    }
  }, [prop])





  return <div className={style.prop}>
    {prop.meta.config.label && (
      <span className={style["prop-label"]}>
        {prop.meta.config.label}:
      </span>
    )}
    {renderProp(prop, disabled, prop.meta.config.name)}
  </div>
}

export default PropertyItem