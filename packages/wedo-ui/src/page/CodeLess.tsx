
import { ProjectEditor } from '@wedo/ui-code'
import { useParams } from 'react-router-dom'

export default () => {
  const {page: pageName} = useParams<{[key: string]: any}>();
  return <>
    
    <ProjectEditor name={pageName}/>
  </>
}