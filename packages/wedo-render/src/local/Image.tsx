
import { Bridge } from '@wedo/meta'
import classes from './component.module.scss'


interface ImageProps {
  img : string,
  bridge : Bridge
}

const Image = ({img, bridge} : ImageProps) => {
  // const data = bridge.getNodeData()
	return <img className={classes.img} src={img} /> 
}

export default Image