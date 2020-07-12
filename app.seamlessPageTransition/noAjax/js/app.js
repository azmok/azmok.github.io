import { _, body, $$, attr, type } from "./myModule.mod.js";



/********** Bad UX
   (1) It is bad UX because when browser's hitory-back button clicked, `body.page*` element remained being disappeared.
 *********/
const link = $$("a")[0],
page = $$("[class*='page'")[0];

link.on("click", (e)=>{
   page.classList.add("disappear");
}); /**/







/********** Good UX
   (2) using 'history.pushState()', 'window.onpopstate()' to remove `.disappear` class in 
            order to make visible when browser's history-back button clicked.
 **********
const link = $$("a")[0],
page = $$("[class*='page'")[0];

link.on("click", (e)=>{
   page.classList.add("disappear");
   _( page.className )
   
   const state = {},
   title = "",
   url = "";
   
   history.pushState(
      state,
      title,
      url
   );
});

// browser 'hitory back' event
window.onpopstate = (e) => {
   page.classList.remove("disappear");
   _("back button pushed")
} /**/








/********** little bad UX
   (3) using 'window.setTimeout()' to remove `.disaapear` class in 
            order to make visible when browser's history-back button clicked.
 **********
const link = $$("a")[0],
page = $$("[class*='page'")[0];

link.on("click", (e)=>{
   page.classList.add("disappear");
   setTimeout(()=>{
      page.classList.remove("disappear");
   }, 400)
}); /**/