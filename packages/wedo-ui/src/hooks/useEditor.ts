import { useEffect, useState } from "react";
import { UIModel } from "../object/UIModel";
import { JsonPage, Topic } from "@wedo/meta";
import { ComponentsLoader } from "@wedo/loader/lib";
import { compose, pageRemote, fileRemote } from "@wedo/request";

const json: JsonPage = {
  page: {
    type: "react",
    name: "page",
    group: "container",
    box: {
      // left: (3200 - 414) / 2,
      left: 300,
      top: 40,
      width: 414,
      height: 736,
    },
    children: [],
    style: {
      border: "1px solid #eee",
      backgroundColor: "white",
    },
  },
  links: {}
}

const useEditor = (pageName: string): [UIModel | null] => {
  const [editor, setEditor] = useState<UIModel | null>(null);

  useEffect(() => {
    ComponentsLoader.getInstance().on(Topic.RemoteComponentsLoaded)
      .subscribe(() => {
        loadPage()
      })
    ComponentsLoader.getInstance().load()
  }, [])


  const loadPage = async () => {

    const svcCall = compose(pageRemote.get, fileRemote.get, data => {
      if (!data) return false;
      return [data.url]
    })
    const user = localStorage['x-user']
    const result = await svcCall(user, pageName)

    if (!result.success) {
      const _editor = await UIModel.getInstance(json, pageName)
      setEditor(_editor)
    } else {
      const page = JSON.parse(result.data)
      console.log(page)
      setEditor(await UIModel.getInstance(page, pageName) )
    }
  }

  return [editor]
}

export default useEditor