const _ = console.log,
      __ = alert,
      doc = document,
      body = doc.body,
      root = doc.documentElement,
      
      M = Math,
      abs = M.abs,
      pi = M.PI,
      round = M.round,
      floor = M.floor,
      ceil = M.ceil,
      toMilisec = (sec)=> sec*1000,
      quad = (val)=> M.pow(val, 2),
      cube = (val)=> M.pow(val, 3),
_foreach = (oArr, prop)=>{
   oArr.map((curr, indx)=>{
      _( indx, curr[prop], curr.className )
   });
},
_slice = function(collection, arg1, arg2){
   return [].slice.call(collection, arg1, arg2);
},
addABrackets = function(num){
   if(!num || num === 1){
      return "<"+ this +">";
   } else {
      let added = "<"+ this +">";
      return added.addABrackets(--num);
   }
},
addColons = function(num){
   if(!num || num === 1){
      return ":"+ this +":";
   } else {
      let added = ":"+ this +":";
      return added.addColons(--num);
   }
},
addSBrackets = function(num){
   if(!num || num === 1){
      return "["+ this +"]";
   } else {
      let added = "["+ this +"]";
      return added.addSBrackets(--num);
   }
},
addQuos = function(num){
   if(!num || num === 1){
      return "\""+ this +"\"";
   } else {
      let added = "\""+ this +"\"";
      return added.addQuos(--num);
   }
},
addTabs = function(num){
   let tabs = "";
   for(;0 < num; num--){
      tabs += "&emsp;";
   }
   return tabs + this;
},
clear = (el) =>{
   el.value = "";
   el.innerHTML = "";
},
create = (tagName, ...rest)=>{
   if( rest ){
         /*###############################
               rest.length === 3
         #################################*/
         /* create(tagName, text, Array of Key-Val(attr-val) Objs, ParentElmement)
          * @Param
          *    @tagName:(tagNameOfElement)::String
          *    @rest[0]:(textToOutput)::String
          *    @rest[1]:(parentElement)::HTML Element Object      */
      
      if( rest[1] ){
         /*###############################
               rest.length === 2
         #################################*/
         let txt = rest[0],
         parent = rest[1],
         nl = doc.createElement(tagName);
         
         nl.innerHTML = txt;
         parent.appendChild(nl);
         
         return nl;
      } else if( rest[0] ){
         /*################################
               rest.length === 1
         ################################*/
         let txt = rest[0],
         nl = doc.createElement(tagName);
         
         nl.innerHTML = txt;
         
         return nl;
      } else {
         /*################################
               rest[0] === ""
         ################################*/
         let txt = "",
         nl = doc.createElement(tagName);
         
         nl.innerHTML = txt;
         
         return nl;
      }
   } else {
      _( tagName, "no rest parameter" )
      return doc.createElement(tagName);
   }
},
changeTopmostTag = (el, tag, depth, markDpt)=>{

   let newEl = doc.createElement(tag);
   
   // disable first marker  && specify intervals of .marker(css)
   if( depth > 0  &&  depth % markDpt === 0 ){
      newEl.setAttr("class", "vis marker");
   } else {
      newEl.setAttr("class", "vis");
   }
   newEl.innerHTML = el.innerHTML;
   
   if( hasChildren(el) ){ // children >= 1
      let children = el.children
      let len = children.length;
      
      if( len >= 2 ){      // children >= 2
         for( let i = 0; i < len; i++){
            
            let child = children[i];
            let newC = changeTopmostTag(child, tag, depth+1, markDpt);
            
            if( i === 0 ){       // first loop(for outputing tagName.toLowerCase()s
               newEl.innerHTML = `<b>${depth}</b> ` + el.tagName.toLowerCase() + getIdClass(el);
            }
            newEl.innerHTML += newC.outerHTML;
         }
      } else {             // children === 1
         let child = el.children[0];
         let newC = changeTopmostTag(child, tag, depth+1, markDpt);
         
         newEl.innerHTML = `<b>${depth}</b> ` + el.tagName.toLowerCase() + getIdClass(el);
         newEl.innerHTML += newC.outerHTML;
      }
   } else {                // children === 0
      newEl.innerHTML = `<b>${depth}</b> ` + el.tagName.toLowerCase() + getIdClass(el);
   }
   return newEl;
},
isType = function(str){
   return type(this) === str ? true : false;
},
isArray = (val) => type(val).match(/Array/g) ? true : false,
isString = (str) => type(str).match(/String/g) ? true : false,
isNumber = (val) => val.toString().match(/^[0-9.]*$/g) ? true : 0,
isBoolean = (v)=> type(v) === "Boolean" ? true : false,
isNDigits = (digits, val)=> val.length === digits ? 1 : 0,
isClass = (str) => str.match(/^\..*/g),
isId = (str) => str.match(/^#.*/g),
isOdd = (n)=>{
   try{
      let R = n % 2;
      if(R){
         return false; // odd: reminder 1
      } else {
         return true; // even: reminder 0
      }
   } catch(e){
      throw "argument is Not a Number";
   }
},
isPage = (page)=>{
   // @page:: String
   return (body.className.includes(page) ? true : false);
},
isLessThanX = (val, x)=> parseInt(val) <= x ? true : false,
isVisible = (elm) => parseInt(elm.style.height) !== 0 ? true : false,
clone = (dom)=> dom.cloneNode(true),

hasChildren = (el)=> el.children.length > 0 ? el.children.length : false,

hasChildNodes = (el)=>{
   var len = el.childNodes.length;
   return len > 0 ? len : false;
},

clearTextNode = (el)=>{
   var ch = el.childNodes,
   len = ch.length,
   tagName = ch.tagName;
   if (len === 1  &&  tagName === undefined){
      el.innerHTML = "";
      return el;
   } else {
      _( "Something went wrong! Fn(): "+ clearTextNode.name );
   }
},
foreach = (arr, fn)=>{
   arr.forEach((curr,indx)=>{
      fn(curr, indx); // <== foreach(arr, fn(curr, index){} );
   });
},
getAttr = function(v){
   return this.getAttribute(v);
},
getX = (el, str)=>{
   if ( !str ){
      return el.getBoundingClientRect().left + window.scrollX;
   } else if( str === "d"){ // dynamic: x from viewport
      return el.getBoundingClientRect().left;
   }
},
getY = (el, str)=>{
   if ( !str ){
      return el.getBoundingClientRect().top + window.scrollY;
   } else if( str === "d"){ // dynamic: x from viewport
      return el.getBoundingClientRect().top;
   }
},
getChildren = (el)=> hasChildren(el) ? el.children : false,
getIdClass = (el)=>{
   let txt = "";
   if ( hasId(el) ){
      txt += "#"+ el.id;
   }
   if ( hasClass(el) ) {
      txt += "."+ el.className;
   }
   return txt;
},
getCss = function(prop){
   if( this.style[prop] ){
      return this.style[prop]
   } else {
      prop = camel2dash(prop)
      return window.getComputedStyle(this).getPropertyValue(prop);
   }
},
getRect = (el)=> el.getBoundingClientRect(),
getComputed =(el, prop)=>{
   return window.getComputedStyle(el).getPropertyValue(prop);
},
hasId = (el)=> el.id ? el.id : "",
hasClass = (el)=> el.className ? el.className : "",
isEmpty = (v)=>{
   let reg_space = /[\s\n\r\t\f\v]+/g,
   regexJp = /[\p{sc=Hira}\p{sc=Katakana}\p{sc=Han}\u3002-\u3006]+/gu,
   reg_anyChar = /[\w\p{sc=Hira}\p{sc=Katakana}\p{sc=Han}\u3002-\u3006]+/gu;
   if( type(v).match("String") ){         // String
      
      if( v.match(reg_anyChar) ){
         return false;
      }else if (v === ""){
         return true;
      } else if( v.match(reg_space) ){
         return true;
      }else {
         return false;
      }
   }else if( type(v).match("Array") ){    // Array
      if( v.length === 0 ){
         return true;
      } else {
         return false;
      }
   }else if( type(v).match("Object") ){   // Object
      for(let prop in v){
         if( v.hasOwnProperty(prop) ){
            return false;
         }
      }
      return true;
   }
},
logBreak = ()=> _("================"),
log = function(){
   _( this )
},
objToString = (obj, hasOwn)=>{
   /* @Param
         - obj::Object::(target object to get string version of key-val pair.)
         - hasOwn::Boolean::(true-->original property only.)
    */
   let txt = "";
   
   for (let prop in obj){
      
      //####  only obj.hasOwnProperty() key-val
      if(hasOwn){
         if( obj.hasOwnProperty(prop) ){
            txt += prop + " : "+ obj[prop] +"<br/>"
         }
      
      //####  all key-value
      } else {
         txt += prop + " : "+ obj[prop] +"<br/>"
      }
   }
   return txt;  
},
on = function(ev, fn, capture){
   this.addEventListener(ev, fn, capture);
},
printd = (txt)=>{
   let isPrintd = ()=> $('.printd') ? $('.printd').length : false,
   el = create("div");
   
   el.setAttr("class", "printd");
   el.style.position = "fixed";
   el.style.right = "0";
   el.style.top = "5rem";
   el.style.display = "table";
   el.style.background = "rgba(0,0,0,0.7)";
   el.style.color = "#00bdff";
   el.style.font = "1.25rem/1 'Courier', monospace";
   el.style.padding = "2rem";
   el.innerHTML = txt;
   body.appendChild(el);
   return el;
},
pushto = function(arr){
   arr.push(this);
},
repeat = (fn, num)=>{
   for(;0 < num; num--){
      fn()
   }
},
sanitize = (str)=>{
   let regex = /(<)|(>)/g,
   result = str.replace(regex, function(match, p1, p2, offset, strg){
      if(p1){
         return "&lt;";
      } else if(p2){
         return "&gt;";
      }
   });
   return result;
},
scrY = ()=> {
   let args = [].slice.call(arguments);
   if( args.length === 0 ){
      return (0 - body.getBoundingClientRect().top );
   } else {
      return (0 - args[0].getBoundingClientRect().top );
   }
},
setAttr = function(type, val){
   this.setAttribute(type, val);
   return this;
},
setIdClass = function(idClass){
   if ( isClass(idClass) ){
      this.setAttr("class", idClass.substring(1));
   } else {
      this.setAttr("id", idClass.substring(1));
   }
   return this;
},
setClass = function(cls){
   this.setAttr("class", cls);
   return this;
},
setCss = function(cssObj){
   for(let prop in cssObj){
      this.style[prop] = cssObj[prop];
   }
   return this;
},
setId = function(id){
   this.setAttr("id", id);
   return this;
},
setProperty = function(obj){
   for(let prop in obj){
      if( obj.hasOwnProperty(prop) ){
         //logBreak()
         //_( "OWN: ", prop )
         //_( "-----" )
         this[prop] = obj[prop];
      }
   }
},
toArray = (alobj)=> [].slice.call(alobj),
toNumber = function(){
   if( type(this) === "String" ){
      let regex = /\d*/,
      arr = this.match(regex),
      str = arr.toString(),
      num = parseInt(str);
      return num;
   } else {
      throw "Input of toNumber() must be String.";
   }
},
toggleClass = (elm, clas) => {
   let hasClassName = elm.className.includes(clas);
   if ( hasClassName ){
      elm.classList.remove(clas);
   }else{
      elm.classList.add(clas);
   }
},
toggleSiblingH = (elm) => {
   const next = elm.nextElementSibling;

   if ( isVisible(next) ){
      unvisible(next);
   } else {
      next.classList.add('transition');
      visible(next);
   }
},
type = (val) => {
   let a = Object.prototype.toString.call(val), // [object xxx]
   regex = /\[object (.*)\]$/g;
   result = regex.exec(a);
   /* result[0]                 :: whole matched string 
      result[1], result[1], ... :: parenthesized back refrence
      reuslt.input              :: whole string before exec()
      result.index              :: matched index position(0-start)
    */
   return result[1]
},
wrapImg = (el)=>{
   let wrapper = create("DIV").setClass("img-wrapper"),
   _height = getComputed(el, "height").toNumber(),
   _width = getComputed(el, "width").toNumber(),
   parent = el.parentElement;
   
   wrapper.setCss({
      height: _height + "px",
      width: _width + "px"
   });
   wrapper.appendChild( el.cloneNode() );
   parent.replaceChild(wrapper, el);
   return wrapper;
}


String.prototype.addABrackets = addABrackets;
String.prototype.addColons = addColons;
String.prototype.addSBrackets = addSBrackets;
String.prototype.addQuos = addQuos;
String.prototype.addTabs = addTabs;
String.prototype.log = log;

Number.prototype.addABrackets = addABrackets;
Number.prototype.addColons = addColons;
Number.prototype.addSBrackets = addSBrackets;
Number.prototype.addQuos = addQuos;
Number.prototype.addTabs = addTabs;
Number.prototype.log = log;


//Object.prototype.setClass = setClass;

Object.defineProperty( Object.prototype, "isType", {
   value: isType,
   enumerable: false
});
Object.defineProperty(Object.prototype, "setClass", {
   value: setClass,
   enumerable: false
});
//Object.prototype.setCss = setCss;
Object.defineProperty(Object.prototype, "setCss", {
   value: setCss,
   enumerable: false
});
//Object.prototype.setId = setId;
Object.defineProperty(Object.prototype, "setId", {
   value: setId,
   enumerable: false
});
//Object.prototype.setIdClass = setIdClass;
Object.defineProperty(Object.prototype, "setIdClass", {
   value: setIdClass,
   enumerable: false
});
//Object.prototype.getAttr = getAttr;
Object.defineProperty(Object.prototype, "getAttr", {
   value: getAttr,
   enumerable: false
});
Object.defineProperty(Object.prototype, "getCss", {
   value: getCss,
   enumerable: false
})
//Object.prototype.setAttr = setAttr;
Object.defineProperty(Object.prototype, "setAttr", {
   value: setAttr,
   enumerable: false
});
//Object.prototype.on = on;
Object.defineProperty(Object.prototype, "on", {
   value: on,
   enumerable: false
});
//Object.prototype.pushto = pushto;
Object.defineProperty(Object.prototype, "pushto", {
   value: pushto,
   enumerable: false
});
Object.defineProperty(Object.prototype, "toNumber", {
   value: toNumber,
   enumerable: false
});
//Object.prototype.setProperty = setProperty;
Object.defineProperty(Object.prototype, "setProperty", {
   value: setProperty,
   enumerable: false
});


window.$$ = function(selector) {
   if ( isId(selector) ) {
      return doc.querySelector(selector);
   } else {
      return doc.querySelectorAll(selector);
   }
};
/*
Object.prototype.print = function(inp){
   inp = "<p class='print'>"+ inp + "</p>";
   this.innerHTML += inp;
}*/
window.print = (inp, ...rest)=>{
   /* @param
    *    inp::String                  --> (String text you want to print)
    *    ret[0]::HTML Element Object  --> (Target element you want to print)
    *    rest[1]::Boolean           --> (Text reflesh)
               false(default): insert after previous text,
               true: overwrite on previous text.
                 */
   if ( rest.length !== 0 ){
   //_( rest.length )
      let target = rest[0],
      refleash = rest[1];
      
      if( refleash === true ){ // true:: reflesh
         target.innerHTML = inp;
      } else { // default:: insert
         target.innerHTML += inp + "\n";
      }
   } else {
      inp = "<p class='print'>"+ inp + "</p>";
      body.innerHTML += inp;
   }
};
