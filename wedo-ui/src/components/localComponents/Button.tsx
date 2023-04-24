import { Bridge } from '@wedo/meta';
import { Button as AntdButton } from 'antd'
import styles from './component.module.scss'
import { TextInput } from './TextInput';

interface ButtonProps {
  text: string,
  bridge: Bridge,
  color: string,
  fontFamily: string,
  fontStyle: Set<string>,
  align: "left" | "right" | "center",
  fontSize: number,
  style: any
}

const Button = ({
  text,
  fontSize,
  fontStyle = new Set<string>(),
  align,
  color,
  fontFamily,
  bridge,
}: ButtonProps) => {
  const style = bridge.getPassProps().style;
  const applyStyle: any = {
    fontFamily,
    fontSize,
    textAlign: align,
    color,
    ...style,
  }

  if (fontStyle.has("bold")) {
    style.fontWeight = "bold"
  }
  if (fontStyle.has("italic")) {
    style.fontStyle = "italic"
  }

  
  return (
    <div className={styles.button} style={applyStyle}>
      <TextInput
        onStateChange={(state: string) => {
          if (state === "display") {
            // bridge.getNode().getBox().width.setMode("auto")
            // bridge.getNode().emit(Topic.NodePropUpdated)
          }
        }}
        onTextChange={(text: string) => {
          bridge.setPropValue(["text"], text)
        }}
        text={text}
      />
    </div>
  )
}

export default Button;