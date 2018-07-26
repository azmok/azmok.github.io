let doc = document,
body = document.body,

hasChildren = (el)=> el.children.length > 0 ? el.children.length : false,
has_id = (el)=> el.id ? el.id : "",
has_class = (el)=> el.className ? el.className : "",
getIdClass = (el)=>{
   let txt = "";
   if ( has_id(el) ){
      txt += "#"+ el.id;
   }
   if ( has_class(el) ) {
      txt += "."+ el.className;
   }
   return txt;
},

changeTopmostTag = (el, tag, depth, markDpt)=>{

   let newEl = doc.createElement(tag);
   
   // disable first marker  && specify intervals of .marker(css)
   if( depth > 0  &&  depth % markDpt === 0 ){
      newEl.setAttribute("class", "vis marker");
   } else {
      newEl.setAttribute("class", "vis");
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
visualizeHTML = (inp, depth, marker)=>{
   /* @param:: 
    *  (ex) @VariableName::Type -- Description
    *
    *       @inp::DOM Object   -- target element that you want to visualize.
    *       @depth::Number     -- start depth. depth number is outputed preceeding
    *          "TagName#id.className" as a Text.
    *       @marker::Number    -- marker is displayed by CSS. Marker number
    *          specify intervals of the marker.
    *                                                                      */
	
	let out = doc.createElement('div');
	out.setAttribute("id", "out");
	let changed = changeTopmostTag(inp, "div", depth, marker);
	out.innerHTML = changed.outerHTML;
	body.appendChild(out);
};
