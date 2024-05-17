"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[678],{537:function(e,t,a){a.r(t),a.d(t,{Head:function(){return v},default:function(){return h}});var r=a(5785),l=a(7294),n=a(8161),o=a(1883),c=a(1257),i=a(7094),s=a(80),m=a(3935);var d=e=>{let{children:t,isRendering:a}=e;const r="undefined"!=typeof document?l.useRef(document.createElement("div")):null;return l.useEffect((()=>{const e=document.getElementById("portal-root");if(e)return e.appendChild(r.current),()=>{e.removeChild(r.current)}}),[]),a&&m.createPortal(l.createElement("div",{className:"overlay top-0 relative z-[9999] bg-[rgba(247,247,247,0.3)]",style:{position:"fixed",width:"100vw",height:"100vh"}},t),r.current)},u=a(6754);var h=()=>{const{0:e,1:t}=(0,l.useState)([]),{0:a,1:m}=(0,l.useState)([]),{0:h,1:v}=(0,l.useState)(!1),{0:p,1:x}=(0,l.useState)(""),{0:E,1:f}=(0,l.useState)(!1);(0,l.useEffect)((()=>{(async()=>{try{const{data:e}=await c.Z.get("http://localhost:3240/api/outline-list");await t(e)}catch(e){await(0,u.Dk)().then((e=>{m(e)})).catch((e=>console.error("Error setting up the database:",e)))}})()}),[]);const b=async e=>{if(confirm("Are you sure you want to delete?"))try{await c.Z.delete("http://localhost:3240/api/outline",{params:{delId:e}}),await t((t=>t.filter((t=>t._id!==e))))}catch(a){(0,u.C7)(e).then((()=>{m((t=>t.filter((t=>t._id!==e))))})).catch((e=>console.error("Error deleting key:",e)))}};return l.createElement("main",null,l.createElement(n.Z,null),l.createElement("button",{onClick:()=>v((e=>!e)),className:" bg-[var(--secondary-color)] ml-10 mt-4 border border-[2px] border-[var(--secondary-text)] rounded-xl"},l.createElement(i.gyF,{className:"fill-[var(--secondary-text)]",size:"3rem"})),l.createElement(d,{isRendering:h},l.createElement("div",{className:"rounded border border-2 border-[var(--primary-text)]  primary container md:max-w-2xl mx-auto mt-32"},l.createElement("div",{className:"relative cursor-pointer",onClick:()=>v(!1)},l.createElement(i.gyF,{className:"fill-[var(--accent-text)] rotate-45 absolute right-0 top-0 fill-[var(--secondary-text)]",size:"3rem"})),l.createElement("div",{className:"flex justify-center items-center min-h-[15rem]"},l.createElement("div",{className:"flex flex-col"},l.createElement("label",{className:"text-3xl mb-3 font-semibold text-white",htmlFor:"outline-name"},"Create Outline"),l.createElement("div",{className:"flex"},l.createElement("input",{name:"outline-name",value:p,onChange:e=>x(e.target.value),className:"text-xl h-10 text-black min-w-[20rem] rounded px-2",placeholder:"Outline Name"}),l.createElement("button",{className:"accent rounded h-10 w-10 flex justify-center items-center",onClick:async e=>{x(""),v(!1);try{const e=await c.Z.post("http://localhost:3240/api/outline",{name:p}),{completed:a,message:r}=e.data;if(!a){confirm(p+" already exists would you like to write over this file?")&&await c.Z.post("http://localhost:3240/api/outline",{name:p,override:!0})}const{data:l}=await c.Z.get("http://localhost:3240/api/outline-list");t(l)}catch(a){(0,u.IR)(p).then((e=>{m((t=>[].concat((0,r.Z)(t),[{title:p,_id:e}])))})).catch((e=>{console.error("Error adding store:",e)}))}}},l.createElement(i.gyF,{className:"fill-[var(--accent-text)] ",size:"2rem"}))))))),l.createElement("div",{className:"gap-4 grid px-8 pt-4 container xl:max-w-7xl mx-auto"},e.length>0?e.map(((e,t)=>l.createElement("div",{key:t,className:"relative outline-cont hover:scale-[1.05] duration-100 ease-linear"},l.createElement("button",{className:"absolute top-2 right-3 z-[1] hover:outline hover:outline-2 rounded",onClick:()=>b(e)},l.createElement(s.F1H,{size:"2rem"})),l.createElement(o.Link,{to:"/outline/"+e,key:e},l.createElement("div",{className:"bg-[var(--third-color)] border border-[var(--third-text)] text-[var(--third-text)] p-8 flex items-center rounded-lg "},l.createElement("h1",{className:"text-4xl"},e)))))):a.map(((e,t)=>{let{title:a,_id:r}=e;return l.createElement("div",{key:t,className:"relative outline-cont hover:scale-[1.05] duration-100 ease-linear"},l.createElement("button",{className:"absolute top-2 right-3 z-[1] hover:outline hover:outline-2 rounded",onClick:()=>b(r)},l.createElement(s.F1H,{size:"2rem"})),l.createElement(o.Link,{to:"/outline/"+r,key:a},l.createElement("div",{className:"bg-[var(--third-color)] border border-[var(--third-text)] text-[var(--third-text)] p-8 flex items-center rounded-lg "},l.createElement("h1",{className:"text-4xl"},a))))}))),E&&l.createElement("h1",{className:"background text-4xl w-full text-center"},"Ruh Roh Server took a dump..."))};const v=()=>l.createElement("title",null,"Outline App")}}]);
//# sourceMappingURL=component---src-pages-index-js-4956b04e56f7abf96039.js.map