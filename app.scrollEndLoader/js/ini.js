;(( window ) => {
   
   "use strict";
   
   //##  Private var
   const W = window,
   _ = console.log,
   M = Math;
   
   //#########
   //    Methods for each built-in prototype object
   // 
   
   //### Object
   //----   node  ---------------
   const $$ = function(selector) {
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
   appendChildren = (children, parent) => {
      for(let child of children){
         parent.appendChild( child );
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
   replaceElement = ($elm, target) => {
      //_( $elm.id, target.id )
      const parent = target.parentElement,
      children = toArray( parent.children ),
      targetIndex = children.indexOf( target ),
      
      //##  get Array of newChildren & remove()
      $children = children
         .map((curr, index) => {
            if( index >= targetIndex ){
               curr.remove();
               return curr === target ? $elm : curr;
            }
         });
      
      //##  append $children
      appendChildren( $children, parent );
      
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
   removeClass = function(v){
      this.classList.remove(v);
      return this;
   },
   isType = function(str){
      return type(this) === str ? true : false;
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
   isNill = (v) => {
      if( v === ""  ||  v ===  {}  ||  v === []  ||  v === undefined  ||
           v === null  ||  v === 0  || v === false ){
         return true;
      } else {
       return false;
      } 
   },
   
   
   
   //#####  Array   #####
   head = function(){ return this[0] },
   
   tail = function(){ return this.filter((curr, indx) => indx !== 0) },
   
   index = function(){
      const args = arguments;
      
      //###  this.index() :: return index of this
      if( args.length === 0 ){
         const target = this,
         children = toArray( target.parentElement.children );
         
         return children.indexOf( target );
      
      //###  this.index(n) return element of nth's child
      } else {
         const parent = this,
         targetIndex = args[0];
         
         return toArray( parent.children )
            .filter( isIndexOf(targetIndex) )
            .head();
      }
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
   random_str = function(){
      let num = M.random(),
      charset = range("a", "z"),
      point = round( (charset.length-1) * num );
      
      return charset[point];
   },
   log = function(){
      _( this );
   },
   
   
   
   //###  Number Method
   isGThanEq = function(num){ return this >= num; },
   isLThanEq = function(num){ return this <= num; },
   isGThan = function(num){ return this > num; },
   isLThan = function(num){ return this < num; };
   
   
   
   
   
   //###  Window methods
   //##  window property
   W.__ = alert;
   W.doc = document;
   W.body = doc.body;
   W.root = doc.documentElement;
   
   W.exit = str => {
      throw new Error(str);
      return;
   };
   
   W.chain = v => ({
      map: f => W.chain( f(v) ),
      fold: f => v,
      yes: f => {
         //_( "yes::", v )
         return v ? W.chain( f(v) ) : W.chain(v)
      },
      no: f => {
         //_( "no::", v )
         //_( "isNill(v):", isNill(v) )
         return isNill(v) ? W.chain( f(v) ) : W.chain(v);
      },
      trace: label => {
         _( `${v} ${label}` );
         return W.chain(v);
      },
   });
   
   W.prop = prop => obj => 
      obj[prop] ? obj[prop] : false;
      
   W.getIndex = (elm, arr) => arr.indexOf(elm);
   
   W.head = (arr) => arr[0];
   
   W.tail = arr => arr.filter((curr, i) => i !== 0);
   
   W.abs = M.abs;
   W.pi = M.PI;
   W.round = M.round;
   W.floor = M.floor;
   W.ceil = M.ceil;
   
   W.toMilisec = sec => sec*1000;
   
   W.quad = val => M.pow(val, 2);
   
   W.cube = val => M.pow(val, 3);
   
   W.clear = el => {
      el.value = "";
      el.innerHTML = "";
   };
   
   W.create = (tagName, ...rest) => {
      // @param
      //   | tagName
      //   | text
      //   | parentElement
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
   };
   W.isElement = v => type(v).match(/element/i) ? true : false;
   
   W.isArray = val => type(val).match(/Array/g) ? true : false;
   
   W.isString = str => type(str).match(/String/g) ? true : false;
   
   W.isNumber = val => val.toString().match(/^[0-9.]*$/g) ? true : 0;
   
   W.isBoolean = v => type(v) === "Boolean" ? true : false;
   
   W.isNDigits = (digits, val) => val.length === digits ? 1 : 0;
   
   W.isClass = str=> str.match(/^\..*/g);
   
   W.isId = str => str.match(/#.*$/g);
   
   W.isOdd = n => {
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
   };
   
   W.isEmpty = v => {
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
   };
   
   W.isPage = page => {
      // @page:: String
      return (body.className.includes(page) ? true : false);
   };
   
   W.isVisible = elm => parseInt(elm.style.height) !== 0 ? true : false;
   
   W.clone = dom => dom.cloneNode(true);
   
   W.clearTextNode = el => {
      let ch = el.childNodes,
      len = ch.length,
      tagName = ch.tagName;
      
      if (len === 1  &&  tagName === undefined){
         el.innerHTML = "";
         return el;
      } else {
         _( "Something went wrong! Fn(): "+ clearTextNode.name );
      }
   };
   
   W.getIdClass = el => {
      let txt = "";
      if ( el.hasId() ){
         txt += "#"+ el.id;
      }
      if ( el.hasClass() ) {
         txt += "."+ el.className;
      }
      return txt;
   };
   
   W.getComputed = (el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
   };
   
   W.logBreak = () => _("================");
   
   W.printd = txt => {
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
   };
   
   W.range = (a, b) => {
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
   };
   
   W.repeat = (fn, num) => {
      for(;0 < num; num--){
         fn()
      }
   };
   
   W.sanitize = str => {
      let regex = /(<)|(>)/g,
      result = str.replace(regex, function(match, p1, p2, offset, strg){
         if(p1){
            return "&lt;";
         } else if(p2){
            return "&gt;";
         }
      });
      return result;
   };
   
   W.scrY = () => {
      let args = [].slice.call(arguments);
      if( args.length === 0 ){
         return (0 - body.getBoundingClientRect().top );
      } else {
         return (0 - args[0].getBoundingClientRect().top );
      }
   };
   
   W.timer = () => {
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
   };
   
   W.toArray = collection => [].slice.call(collection);
   
   W.toggleClass = (elm, clas) => {
      if ( elm.hasClass(clas) ){
         elm.classList.remove(clas);
      }else{
         elm.classList.add(clas);
      }
   };
   
   W.type = val => {
      let a = Object.prototype.toString.call(val),
      regex = /\[object (.*)\]$/g,
      result = regex.exec(a);
      
      return result[1];
   };
   
   W.print = (inp, ...rest) => {
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
      "appendTo": {
         value: appendTo,
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
      "insert_before": {
         value: insert_before,
         enumerable: false,
      },
      "isType": {
         value: isType,
         enumerable: false,
      },
      "on": {
         value: on,
         enumerable: false,
      },
      "pushto": {
         value: pushto,
         enumerable: false,
      },
      "removeClass": {
         value: removeClass,
         enumerable: false,
      },
      "attr": {
         value: attr,
         enumerable: false,
      },
      "prop": {
         value: prop,
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
      "addProp": {
         value: addProp,
         enumerable: false
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
      "index": {
         value: index,
         enumerabke: false,
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
      }
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
   
   //#####  noConflict with lodash.js/undescore.js  #####
   // assign `console.log` to `_` if noExist, otherwise, `log`
   W.chain( W.prop("_")(window) )
      //.trace("hi")
      .yes( () => W.log = console.log )
      .no( ()=> W._ = console.log );

      })( window );