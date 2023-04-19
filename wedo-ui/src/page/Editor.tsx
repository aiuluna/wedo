import React, { useEffect } from "react";
import style from "./ui.module.scss"
import { useParams } from 'react-router-dom'
import useEditor from "../hooks/useEditor";

const BottomBar = () => {
  return <div className={style.footer}></div>
}

const Wedo = () => {
  let { page: pageName } = useParams<{ [key: string]: string }>()
  if (!pageName) pageName = 'default';

  const [editor] = useEditor(pageName);

  useEffect(() => {
    if (!editor) return;
    console.log('editor', editor)
  }, [editor])

  return <React.Fragment>
    <div>123</div>
  </React.Fragment>
}

export default Wedo;