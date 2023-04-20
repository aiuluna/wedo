import { useEffect, useState } from "react";
import { UIModel } from "../object/UIModel";
import { JsonPage, Topic } from "@wedo/meta";
import { ComponentsLoader } from "@wedo/loader/lib";

const json: JsonPage = {
  page: {
    type: "react",
    name: "page",
    group: "container",
    box: {
      left: (3200 - 414) / 2,
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
    const _editor = await UIModel.getInstance(json, pageName)
    setEditor(_editor)
  }

  return [editor]
}

export default useEditor