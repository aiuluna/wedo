import { Bridge } from '@wedo/meta'
import FlexContainer from './FlexContainer'
const Column = ({bridge} : {bridge : Bridge}) => {
  return <FlexContainer bridge={bridge} gap="col" />
}
export default Column