import { Input } from 'antd'
import { PropComponentProps } from './propeditor.types';
import useValue from '../../hooks/useValue';

interface StringProps {
  style?: any;
  regex: RegExp
}

const StringInput = ({
  regex,
  style,
  propValue,
  metaProps,
  onChange
}: PropComponentProps & StringProps) => {
  if (metaProps) console.log("🚀 ~ file: StringInput.tsx:17 ~ metaProps:", metaProps)
  const [value, setValue] = useValue(propValue, onChange)

  return <Input
    style={{ width: 200, ...style }}
    {...metaProps}
    value={value}
    onKeyDown={e => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        return
      }
      if (!e.key.match(regex)) {
        e.preventDefault();
        e.stopPropagation();
        return
      }
    }}
    onChange={e => {
      setValue(e.target.value)
    }}
  />
}

export default StringInput;