import{r as t,R as u,T as f,a as p,j as c,z as m}from"./index.76e514c0.js";import{s as g}from"./component.module.eb27806f.js";const b=({img:o,bridge:a})=>{const[i,l]=t.exports.useState(0),s=t.exports.useRef(!1),n=t.exports.useContext(u);return t.exports.useEffect(()=>{let e=null;const r=n.editor?.on(f.SelectionChanged).subscribe(()=>{n.editor?.getSelection().contains(a.getNode())?e=setTimeout(()=>{s.current=!0},100):(s.current=!1,clearTimeout(e))});return()=>{r&&r.unsubscribe()}},[]),t.exports.useEffect(()=>{l(e=>e+1)},[o]),p("div",{className:g.image,children:[c("input",{type:"file",onClick:e=>{if(console.log(s.current),!s.current){e.preventDefault(),e.stopPropagation();return}},onChange:e=>{e.target.files&&m.post2(e.target.files[0]).then(r=>{a.setPropValue(["img"],r.data)})}},i),c("img",{src:o||"https://voice-static.oss-accelerate.aliyuncs.com//img/4bb56586af7dbf189e410673a734171c9a912fe8.png",alt:""})]})};export{b as default};