
   //##  Private var
export const M = Math,
   _ = console.log,
   
   //###  Window methods / property
   __ = alert,
   doc = document,
   body = doc.body,
   root = doc.documentElement,
   
   exit = str => {
      throw new Error(str);
      return;
   },
   
   predicate = v => ({
      map: f => predicate( f(v) ),
      yes: f => {
         //_( "yes::", v )
         return !isNill(v) ? predicate(f(v)) : predicate(v)
      },
      no: f => {
         //_( "no::", v )
         //_( "isNill(v):", isNill(v) )
         return isNill(v) ? predicate(f(v)) : predicate(v);
      },
      value: () => v,
      trace: label => {
         _( `${v} ${label}` );
         return predicate(v);
      },
   }),
   
   abs = M.abs,
   pi = M.PI,
   round = M.round,
   floor = M.floor,
   ceil = M.ceil,
   
   toMilisec = sec => sec*1000,
   
   quad = val => M.pow(val, 2),
   
   cube = val => M.pow(val, 3),
   
   clear = el => {
      el.value = "";
      el.innerHTML = "";
   },
   
   create = (tagName, ...rest) => {
      let nl = doc.createElement(tagName),
      txt = "",
      parent = null;
      
      if( rest.length <= 2 ){
         if( rest.length === 2 ){
            txt = rest[0];
            parent = rest[1];
            
            nl.innerHTML = txt;
            
            parent.appendChild(nl);
            
            return nl;
         } else if( rest.length === 1 ){
            let txt = rest[0];
            
            nl.innerHTML = txt;
            
            return nl;
         
         //#  rest.length === 0
         } else {
            nl.innerHTML = txt;
            
            return nl;
         }
      }
   },
   
   isElement = v => type(v).match(/element/i) ? true : false,

   isNodeList = v => type(v).match(/NodeList/i) ? true : false,
   
   isArray = val => type(val).match(/Array/g) ? true : false,
   
   isString = str => type(str).match(/String/g) ? true : false,
   
   isNumber = val => val.toString().match(/^[0-9.]*$/g) ? true : 0,
   
   isBoolean = v => type(v) === "Boolean" ? true : false,
   
   isNDigits = (digits, val) => val.length === digits ? 1 : 0,
   
   isClass = str=> str.match(/^\..*/g),
   
   isId = str => str.match(/#.*$/g),
   
   isOdd = n => {
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
   
   isEmpty = v => {
      let reg_space = /[\s\n\r\t\f\v]+/g,
      regexJp = /[\p{sc=Hira}\p{sc=Katakana}\p{sc=Han}\u3002-\u3006]+/gu,
      reg_anyChar = /[\w\p{sc=Hira}\p{sc=Katakana}\p{sc=Han}\u3002-\u3006]+/gu;
      
      //#  String
      if( type(v).match("String") ){
         
         if( v.match(reg_anyChar) ){
            return false;
         } else if (v === ""){
            return true;
         } else if ( v.match(reg_space) ){
            return true;
         } else {
            return false;
         }
      
      //#  Array
      } else if ( type(v).match("Array") ){
         if( v.length === 0 ){
            return true;
         } else {
            return false;
         }
      
      //#  Object
      } else if( type(v).match("Object") ){
         for(let prop in v){
            if( v.hasOwnProperty(prop) ){
               return false;
            }
         }
         return true;
      }
   },
   
   isNill = (v) => {
      if( v === ""  ||  v ===  {}  ||  v === []  ||  v === undefined  ||
           v === null  ||  v === 0  || v === false ){
         return true;
      } else {
         return false;
      } 
   },
   
   isVisible = elm => parseInt(elm.style.height) !== 0 ? true : false,
   
   clone = dom => dom.cloneNode(true),
   
   clearTextNode = el => {
      let ch = el.childNodes,
      len = ch.length,
      tagName = ch.tagName;
      
      if (len === 1  &&  tagName === undefined){
         el.innerHTML = "";
         return el;
      } else {
         _( "Something went wrong! Fn(): "+ clearTextNode.name );
      }
   },
   
   getIdClass = el => {
      let txt = "";
      if ( el.hasId() ){
         txt += "#"+ el.id;
      }
      if ( el.hasClass() ) {
         txt += "."+ el.className;
      }
      return txt;
   },
   
   getComputed = (el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
   },
   
   logBreak = () => _("================"),
   
   printd = txt => {
      let isPrintd = () => $('.printd') ? $('.printd').length : false,
      el = create("div");
      
      el.attr({
         class: "printd"
      })
      .setCss({
         position: "fixed",
         right: "0",
         top: "5rem",
         display: "table",
         background: "rgba(0,0,0,0.7)",
         color: "#00bdff",
         font: "1.25rem/1 'Courier', monospace",
         padding: "2rem",
      })
      .text( txt )
      .appendTo( body );
      
      return el;
   },
   
   range = (a, b) => {
      const set = [];
      
      if( type(a) === type(b) ){
         
         // a,b : Number
         if( type(a) === "Number" ){
            if( a < b ){
               for(; a <= b; a++){
                  set.push(a);
               }
            
            // a > b
            } else {
               for(; a >= b; a--){
                  set.push(a);
               }
            }
         
         // a,b :: String
         } else {
            if( a < b ){
               let v1 = a.charCodeAt(),
               v2 = b.charCodeAt();
               //_( v1, v2 )
               for(; v1 <= v2; v1++){
                  //_( String.fromCharCode(v1) )
                  set.push( String.fromCharCode(v1) );
               }
               
               // a > b
            } else {
               let v1 = a.charCodeAt(),
               v2 = b.charCodeAt();
               //_( v1, v2 )
               for(; v1 >= v2; v1--){
                  //_( String.fromCharCode(v1) )
                  set.push( String.fromCharCode(v1) );
               }
            }
         }
      }
      
      return set;
   },
   
   repeat = (fn, num) => {
      for(;0 < num; num--){
         fn()
      }
   },
   
   sanitize = str => {
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
   
   scrY = () => {
      let args = [].slice.call(arguments);
      if( args.length === 0 ){
         return (0 - body.getBoundingClientRect().top );
      } else {
         return (0 - args[0].getBoundingClientRect().top );
      }
   },
   
   timer = () => {
      let _tStart = 0,
      _tEnd = 0,
      _tDuration = 0,
      _laps = [];
      
      return({
         start: () => _tStart = window.performance.now(),
         lap: () => {
            const lap = window.performance.now() - _tStart;
            _laps.push( lap )
            _( lap )
         },
         end: function(){
            this.lap()
         },
         average: () => _( _laps.reduce((acc, curr) => acc + curr) / _laps.length ),
         show: ()=>{
            let monitor = create("DIV").
               attr({
                  class: "monitor",
               })
               .setCss({
                  position: "fixed",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
               })
               .appendTo( body )
            
            setInterval( ()=>{
               monitor.text( parseInt(window.performance.now()) );
            }, 10)
         },
      })
   },
   
   toArray = collection => [].slice.call(collection),
   
   toggleClass = (elm, clas) => {
      if ( elm.hasClass(clas) ){
         elm.classList.remove(clas);
      }else{
         elm.classList.add(clas);
      }
   },
   
   type = val => {
      let a = Object.prototype.toString.call(val),
      regex = /\[object (.*)\]$/g,
      result = regex.exec(a);
      
      return result[1];
   },
   
   print = (inp, ...rest) => {
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
   },
   
   
   
   //#########
   //    Methods for each built-in prototype object
   // 
   
   //### Object
   //----   node  ---------------
   $$ = function(selector) {
      //#  ContextObject === null  &&  function scope
      if( type(this) === "Undefined"){
         if ( isId(selector) ) {
            return doc.querySelector(selector);
         } else {
            return doc.querySelectorAll(selector);
         }
      } else {
         if ( isId(selector) ) {
            return this.querySelector(selector);
         } else {
            return this.querySelectorAll(selector);
         }
      }
   },
   
   addClass = function(v){
      this.classList.add(v);
      return this;
   },
   
   addMethod = function(name, fn){
      this[name] = fn;
      return this;
   },
   
   addProp = function(props){
      //this[prop] = val;
      for(let prop in props){
         /* newObj.prop = props.prop
                        -----------
                           value */
         this[prop] = props[prop];
      }
      return this;
   },
   
   appendChildren = (children, parent) => {
      for(let child of children){
         parent.appendChild( child );
      }
   },
   
   appendTo = function(el){
      el.appendChild(this);
      return this;
   },
   
   attr = function(obj){
      //#  get
      if( type(obj) ===  "String"){
         return this.getAttribute(obj);
      
      //# set
      } else {
         for(let prop in obj){
            this.setAttribute(prop, obj[prop])
         }
         return this;
      }
   },
   
   html = function(str){
      //#  set
      if( str ){
         this.innerHTML = str;
         return this;
      
      //#  get
      } else {
         return this.innerHTML;
      }
   },
   
   getCss = function(prop){
      if( this.style[prop] ){
         return this.style[prop]
      } else {
         prop = camel2dash(prop)
         return window.getComputedStyle(this).getPropertyValue(prop);
      }
   },
   
   getRect = function (el) {
      return this.getBoundingClientRect();
   },
   
   hasId = function(v){
      if( v === undefined ){
      
      //#  check element have  ids
         return ( this.id !== "" ? true : false );
      //#  check element has passed id 
      } else {
         return this.id.includes(v);
      }
   },
   
   hasClass = function(v){
      if( v === undefined ){
      //#  check element have  classNames
         return ( this.className !== "" ? true : false );
      //#  check element has passed className 
      } else {
         return this.className.includes(v);
      }
   },
   
   hasChildren = function(){
      return this.children.length > 0 ? true : false;
   },
   
   hasChildNodes = function(){
      let len = this.childNodes.length;
      
      return len > 0 ? true : false;
   },
   
   hasProp = function(prop){
      //_( type(this[prop]) ) // Undefined
      return this[prop] ? true : false;
   },
   
   isType = function(str){
      return type(this) === str ? true : false;
   },
   
   index = function(){
      const args = arguments;
      const isIndexOf = i => (curr, currIndx) => i === currIndx;
      
      //###  this.index() :: return index of this
      if( args.length === 0 ){
         const target = this,
         children = toArray( target.parentElement.children );
         
         return children.indexOf( target );
      
      //###  this.index(n) return element of nth's child
      } else {
         const parent = this,
         targetIndex = args[0];
         
         return (
            parent.hasChildren() ?
            toArray( parent.children )
               .filter( isIndexOf(targetIndex) )
               .head() :
            null
         );
      }
   },
   
   insert_before = function (target){
      const parent = target.parentElement,
      newElm = this,
      children = toArray( parent.children ),
      targetIndex = children.indexOf( target );
      
      //###  pure: re-organize tree  ###
         // -forward children-
      const forwardChildren = children
         .filter((curr, currIndx)=>{
            if( currIndx < targetIndex ){
               return true;
            } else {
               return false;
            }
         });
         // -tail children-
      const tailChildren = children
         .filter((curr, currIndx)=>{
            if( currIndx >= targetIndex ){
               return true;
            } else {
               return false;
            }
         });
         // -concat: array of new DOM Tree -
      const newTreeArr = forwardChildren
         .concat( newElm )
         .concat( tailChildren );
      
      //###  impure: delete DOM  ###
      children.forEach((curr, indx)=>{
         if( indx.isGThanEq( targetIndex ) ){
            curr.remove();
         }
      });
      
      //###  append changed tree  ###
      newTreeArr.map((curr, currIndx) => {
         if( currIndx.isGThanEq( targetIndex ) ){
            // _( curr.text() )
            parent.appendChild( curr );
         }
      });
      return this;
   },
   
   on = function(ev, fn, capture){
      this.addEventListener(ev, fn, capture);
   },
   
   pushto = function(arr){
      arr.push(this);
   },
   
   setCss = function(obj){
      for(let prop in obj){
         this.style[prop] = obj[prop];
      }
      return this;
   },
   
   prop = function(obj){
      for(let prop in obj){
         
         this[prop] = obj[prop];
      }
      return this;
   },
   
   removeClass = function(v){
      this.classList.remove(v);
      return this;
   },
   
   replaceWith = function(newElm){
      this.outerHTML = newElm.outerHTML;
   },
   
   text = function(str){
      //#  set
      if( str ){
         this.innerText = str;
         return this;
      
      //#  get
      } else {
         return this.innerText;
      }
   },
   
   //#####  Array   #####
   head = function(){ return this[0] },
   
   sliceAt = function(forwardEnd, afterwardStart){
      const forward = this.filter((curr, currIndx) => currIndx < afterwardStart),
      afterward = this.filter((curr, currIndx) => currIndx >= afterwardStart);
      
      return [forward, afterward];
   },
   
   tail = function(){ return this.filter((curr, indx) => indx !== 0) },
   
   take = function(num){
      const head = this.filter((curr, indx) => indx < num);
      
      return head;
   },
   
   takeAfter = function(takedNumOrArr){
      takedNumOrArr = 
         type(takedNumOrArr) === "Array" ?
         takedNumOrArr = takedNumOrArr.length :
         takedNumOrArr;
      
      const tail = this.filter((curr, indx) => indx > takedNumOrArr -1);
      
      return tail;
   },
      
   //#####  String  #####
   addABrackets = function(num){
      if(!num || num === 1){
         return "<"+ this +">";
      } else {
         let added = "<"+ this +">";
         return added.addABrackets(--num);
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
   
   addColons = function(num){
      if(!num || num === 1){
         return ":"+ this +":";
      } else {
         let added = ":"+ this +":";
         return added.addColons(--num);
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
   
   log = function(){
      _( this );
   },
   
   random_str = function(){
      let num = M.random(),
      charset = range("a", "z"),
      point = round( (charset.length-1) * num );
      
      return charset[point];
   },
   
   toNumber = function(){
      if( type(this) === "String" ){
         let regex = /[1-9]\d*|0(?=[^\d]+)/g,
         //matched = regex.exec(this); // result is no expected
         matched = this.match(regex); // result is expected
         
         return matched;
      } else {
         throw "Input of toNumber() must be String.";
      }
   },
   
   //###  Number Method
   isGThanEq = function(num){ return this >= num; },
   
   isLThanEq = function(num){ return this <= num; },
   
   isGThan = function(num){ return this > num; },
   
   isLThan = function(num){ return this < num; };
   
   

   

   // Set methods for XXXX.prototype
   Object.defineProperties( Object.prototype, {
      "$$": {
         value: $$,
         enumerable: false,
      },
      "addClass":{
         value: addClass,
         enumerable: false,
      },
      "addMethod": {
         value: addMethod,
         enumerable: false,
      },
      "addProp": {
         value: addProp,
         enumerable: false
      },
      "appendTo": {
         value: appendTo,
         enumerable: false,
      },
      "attr": {
         value: attr,
         enumerable: false,
      },
      "getCss": {
         value: getCss,
         enumerable: false,
      },
      "getRect": {
         value: getCss,
         enumerable: false,
      },
      "html": {
         value: html,
         enumerable: false,
      },
      "hasId": {
         value: hasId,
         enumerable: false,
      },
      "hasClass": {
         value: hasClass,
         enumerable: false,
      },
      "hasChildren": {
         value: hasChildren,
         enumerable: false,
      },
      "hasChildNodes": {
         value: hasChildNodes,
         enumerable: false,
      },
      "hasProp": {
         value: hasProp,
         enumerable: false,
      },
      "insert_before": {
         value: insert_before,
         enumerable: false,
      },
      "index": {
         value: index,
         enumerabke: false,
      },
      "isType": {
         value: isType,
         enumerable: false,
      },
      "on": {
         value: on,
         enumerable: false,
      },
      "prop": {
         value: prop,
         enumerable: false,
      },
      "pushto": {
         value: pushto,
         enumerable: false,
      },
      "replaceWith": {
         enumerable: false,
         value: replaceWith,
      },
      "removeClass": {
         value: removeClass,
         enumerable: false,
      },
      "setCss": {
         value: setCss,
         enumerable: false,
      },
      "text": {
         value: text,
         enumerable: false,
      },
   });
   
   Object.defineProperties( Array.prototype, {
      "head": {
         value: head,
         enumerable: true,
      },
      "tail": {
         value: tail,
         enumerable: true,
      },
      "sliceAt": {
         value: sliceAt,
         enumerable: true,
      },
      "take": {
         value: take,
         enumerable: true,
      },
      "takeAfter": {
         value: takeAfter,
         enumerable: true,
      },
   });
   
   Object.defineProperties( String.prototype, {
      "random": {
         value: random_str,
         enumerable: true,
      },
      "addABrackets": {
         value: addABrackets,
         enumerable: true,
      },
      "addColons": {
         value: addColons,
         enumerable: true,
      },
      "addSBrackets": {
         value: addSBrackets,
         enumerable: true,
      },
      "addQuos": {
         value: addQuos,
         enumerable: true,
      },
      "addTabs": {
         value: addTabs,
         enumerable: true,
      },
      "toNumber": {
         value: toNumber,
         enumerable: true,
      },
   });
   
   Object.defineProperties( Number.prototype, {
      "isGThanEq": {
         value: isGThanEq,
         enumerable: false,
      },
      "isLThanEq": {
         value: isLThanEq,
         enumerable: false,
      },
      "isGThan": {
         value: isGThan,
         enumerable: false,
      },
      "isLThan": {
         value: isLThan,
         enumerable: false,
      },
      });