import{s as c}from"./component.module.eb27806f.js";import{TextInput as f}from"./TextInput.c638c947.js";import{j as l}from"./index.76e514c0.js";const d=({text:a,fontSize:i,fontStyle:s=new Set,align:e,color:n,fontFamily:r,bridge:o})=>{const x=o.getPassProps().style,t={fontFamily:r,fontSize:i,textAlign:e,color:n,...x};return s.has("bold")&&(t.fontWeight="bold"),s.has("italic")&&(t.fontStyle="italic"),l("div",{className:c.text,style:t,children:l(f,{style:{textAlign:e},onTextChange:p=>{o.setPropValue(["text"],p)},text:a})})};export{d as default};