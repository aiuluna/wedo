import { Bridge, Topic } from "@wedo/meta";
import style from './component.module.scss'
import { useContext, useEffect, useRef, useState } from "react";
import { fileRemote } from "@wedo/request";
import RenderContext from "../render/RenderContext";

const Image = ({ img, bridge }: { img: string, bridge: Bridge }) => {

  const [ver, setVer] = useState(0)
  const self = useRef(false)
  const context = useContext(RenderContext)


  useEffect(() => {
    let timer: any = null;
    const unsub = context.editor?.on(Topic.SelectionChanged).subscribe(() => {
      if (context.editor?.getSelection().contains(bridge.getNode())) {
        timer = setTimeout(() => {
          self.current = true
        }, 100);
      } else {
        self.current = false;
        clearTimeout(timer)
      }
    })
    return () => {
      if (unsub) unsub.unsubscribe()
    }
  }, [])

  useEffect(() => {
    setVer(v => v + 1)
  }, [img])

  return (
    <div className={style.image}>
      <input
        key={ver}
        type="file"
        onClick={e => {
          console.log(self.current)
          if(!self.current) {
            e.preventDefault()
            e.stopPropagation()
            return
          }
        }}
        onChange={(e) => {
          if (e.target.files) {
            fileRemote.post2(e.target.files[0])
              .then((json) => {
                bridge.setPropValue(['img'], json.data)
              })
          }
        }}
      />
      <img src={img || "https://voice-static.oss-accelerate.aliyuncs.com//img/4bb56586af7dbf189e410673a734171c9a912fe8.png"} alt="" />
    </div>
  )
}

export default Image