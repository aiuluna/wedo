import{r as e,T as s}from"./index.76e514c0.js";const n=t=>{const[c,r]=e.exports.useState(0);e.exports.useEffect(()=>{const o=t.on([s.NewNodeAdded,s.NodeChildrenUpdated]).subscribe(()=>{r(d=>d+1)});return()=>o.unsubscribe()},[])},u=n;export{u};
