import { CodeProjectType } from "@wedo/code";
import { CodeEditorUIModel, Topic } from "../object/CodeEditorUIModel"
import { useEffect, useMemo, useState } from "react";

export const useCodeEditor = (name: string, type: CodeProjectType) => {

  const editor = useMemo(() => {
    return new CodeEditorUIModel(name, type)
  }, [])

  const [_, setVer] = useState(0)

  useEffect(() => {
    const sub = editor.on([Topic.SelectionChanged, Topic.Loaded, Topic.FileAdded, Topic.FileRenamed]).subscribe(() => {
      setVer(x => x + 1)
    })
    return () => {
      sub && sub.unsubscribe()
    }
  }, [])

  return editor;
}