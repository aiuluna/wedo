import{r as a,u as l,T as s,j as n}from"./index.76e514c0.js";import{s as c}from"./component.module.eb27806f.js";import{ListRender as p}from"./ListRender.3fe3a853.js";const m=({bridge:e,gap:o})=>{const[i,t]=a.exports.useState(e.getNode().getChildren());return l([e.getNode(),[s.NewNodeAdded,s.NodeChildrenUpdated]],()=>{t(e.getNode().getChildren())}),l([e.getNode(),s.NodeGapIndexChanged],d=>{if(d!==null){const r=e.getNode().getChildren();r.splice(d,0,`__${o.toUpperCase()}__`),t(r)}else t(e.getNode().getChildren())}),n("div",{className:c[o],children:n(p,{children:i,bridge:e,childrenProps:{style:{position:""}}})})};export{m as default};