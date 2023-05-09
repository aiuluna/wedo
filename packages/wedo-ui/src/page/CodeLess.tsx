
import { ProjectEditor } from '@wedo/ui-code'
import { useParams } from 'react-router-dom'
import TitleBar from '../components/frame/TitleBar';
import { CaretRightOutlined } from "@ant-design/icons"
import { useState } from 'react';
import { useCodeEditor } from '@wedo/ui-code/src/hooks/useCodeEditor';

export default () => {
  const { page: pageName } = useParams<{ [key: string]: any }>();
  const type = 'codeless';
  const editor = useCodeEditor(pageName, type)
  const [loading, setLoading] = useState(false)

  return <>
    <TitleBar pageName={pageName} name={type}>
      <CaretRightOutlined
        onClick={async (e) => {
          try {
            setLoading(true)
            await editor.build()
            // message.success("编译成功")
          } catch (ex) {
            console.error(ex)
            // message.error("编译失败")
          } finally {
            setLoading(false)
          }
        }}
        style={{
          fontSize: "32px",
          color: loading ? "grey" : "lightgreen",
        }}
      />
    </TitleBar>
    <ProjectEditor name={pageName} />
  </>
}