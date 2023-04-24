import { Bridge } from '@wedo/meta'
import FlexContainer from './FlexContainer'
const Row = ({bridge} : {bridge : Bridge}) => {
  return <FlexContainer bridge={bridge} gap="column" />
}
export default Row