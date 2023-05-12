import { JsonPage, Page, Topic } from "@wedo/meta";
import { useEffect, useRef, useState } from "react";
import { WedoContext } from '@wedo/runtime'
import { ComponentsLoader } from "@wedo/loader/lib";
import { fileRemote } from '@wedo/request'

const json: JsonPage = {
  page: {
    type: "react",
    name: "page",
    group: "container",
    box: {
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

export const usePage = (pageName: string): (Page | null) => {
  const [page, setPage] = useState<Page | null>(null)

  const ctx = useRef<WedoContext | null>(null)

  useEffect(() => {
    ComponentsLoader.getInstance().on(Topic.RemoteComponentsLoaded).subscribe(() => {
      loadPage()
    })
  }, [])

  async function loadPage() {
    // await fileRemote.get()
  }

  return page;
}

