import { _, body, $$, attr, type } from "./myModule.mod.js";

const loadPages = (pageNum) => {
   return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(),
      currUrl = location.href,
      parentPath = currUrl.substring(0, currUrl.lastIndexOf("/") ) + "/",
      requestUrl = parentPath
            + (parseInt(pageNum) === 1 ? "index" : `page${pageNum}`)
            + ".html";
      
      xhr.addEventListener('readystatechange', () => {
         if( xhr.readyState !== 4){
            return;
         } else if( xhr.readyState === 4  &&  xhr.status === 200 ){
            setTimeout(()=> resolve({
               xhr,
               requestUrl,
               pageNum,
            }), 1300);
         } else {
            reject(xhr)
         }
      });
      
      xhr.open("GET", requestUrl);
      xhr.send();
   });
},
getPageClassElm = () => {
    return $$("[class*='page']")[0];
},
getButtonElm = () => {
    return $$('button')[0];
},
refreshDoms = () => {
    getPageClassElm();
    getButtonElm();
},
addEvents = () => {
   let elm = getPageClassElm(),
   link = getButtonElm();

   link.addEventListener('click', (e)=> {
      let pageNum = link.attr("data-page-num");
      //_(pageNum)
      elm.classList.add("disappeare");
      
      loadPages(pageNum)
         .then( obj => {
            const sourceTxt = obj.xhr.response,
            parser = new DOMParser(),
            newDom = parser.parseFromString(sourceTxt, "text/html");
            
            body.innerHTML = newDom.querySelector("BODY").innerHTML;
            
            let relUrl = (obj.requestUrl).substring( obj.requestUrl.lastIndexOf("/")+1 )
            _( relUrl )
            
            history.pushState(
               { url: window.location.href },
               `title ${obj.pageNum}`,
               relUrl
            );
         
            addEvents();
         })
         .catch( err => {
            _( err.statusText, err.status );
         })
   });
};
window.onpopstate = (e)=>{
         _( "onpopstate")
         location.href = location.href
      }
addEvents();
