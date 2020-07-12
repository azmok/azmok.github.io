import { _, body, $$, attr, type } from "./myModule.mod.js";

const link = $$("a")[0],
page = $$("[class*='page'")[0];

link.on("click", (e)=>{
   page.classList.add("disappear");
   //_( page.className )
})