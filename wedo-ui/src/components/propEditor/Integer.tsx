import useValue from "../../hooks/useValue";
import { PropComponentProps } from "./propeditor.types";
import {Input} from "antd";

const parseInt = (val: any) : number | null => {
  if (typeof val === 'number') return val;
  if (/^\d+px$/.test(val)) {val = val.replace('px', '')}
  if (val === '' || val === undefined) return null;
  const value = Number.parseInt(val);
  return isNaN(value)? null : value;
}

const Integer = ({
  propValue,
  metaProps,
  disabled,
  onChange
}: PropComponentProps) => {
  const [value, setValue] = useValue(() => parseInt(propValue), onChange)

  return <Input 
    {...metaProps}
    disabled={disabled}
    value={value}
    style={{width: 70}}
    onKeyDown={e => {
      const key = e.key;
      if (key === 'Delete' || key === 'Backspace') return;
      if (key === 'ArrowUp') {
        setValue(val => {
          if (val === null || val === undefined) return 1;
          return val + 1;
        })
        return
      } else if (key === 'ArrowDown') {
        setValue(val => {
          if (val === null || val === undefined) return 0;
          return Math.max(0, val - 1);
        })
        return
      }

      if (key.match(/^![0-9]$/)) {
        e.preventDefault()
        e.stopPropagation()
        return
      }


    }}
    onChange={e => {
      const value = e.target.value;
      if (value === '') {
        setValue(null)
      } else {
        setValue(parseInt(value))
      }
    }}
  />
}

export default Integer;