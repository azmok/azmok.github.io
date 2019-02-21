/*#####  HankanaApp MIT Licence  #####
 *
 * The MIT License (MIT)
 * Copyright © 2019 Azuma Okumura <azumaO@gmail.com>
 * 
 * Hankana.App was made with ❤︎ by Azuma Okumura under MIT Licence () that follows 
 * clipborad.js's MIT licence.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * 
 * 
 * 
 #####  Clipborad.js MIT Licence  #####
 * 
 * The MIT License (MIT)
 * Copyright © 2019 Zeno Rocha <hi@zenorocha.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
   




"use strict";

const hkhkDic = hkhkDic_basic.concat(hkhkDic_punc1, hkhkDic_punc2 ),
hex2Code = (hex)=> parseInt(hex, 16),
code2Hex = (int)=>{
   const radix = 16;
   return int.toString(radix);
},
char2Hex = (char)=>{
   //_( char )
   const code = char.charCodeAt();
   //_( code )
   const hex = code2Hex(code);
   return hex;
},
hex2NumReference = (hex)=>{
   return "&#x" + hex;
},
hex2Char = hex =>{
   const code = hex2Code(hex);
   //_( code )
   const char = String.fromCharCode(code);
   //_( char )
   return char;
},
char2Hkana = (char)=>{
   const char_hex = char2Hex(char);
   const matched = hkhkDic.filter((arr, indx, dic)=>{
      //_( arr )
      return arr.includes(char_hex);
   });
   
   // .join() needed.
   //  because when no matched, returned empty vector(array) could pass conditionals.
   if( matched.join("") ){
      //_( matched[0].length )
      //  -->  [[ 3042, 30a2, ff71 ]]           len=3  hira/kana
         
      //  -->  [[ 304c, 30ac, [ff76, ff9e] ]]   len=3  hira/kana daku-ten,
       
      //  -->  [[ 3071, 30d1, [ff8a, ff9f] ]]   len=3  hira/kana daku-onpu
      
      //  --> [[ xxxx, xxxx ]]                  len=2  punctuation
      const m = matched[0];
      
      let char_replaced;
      
      switch( m.length ){
         case 3:  //####  nira/kana |  daku-*
            if( isArray(m[2]) ){
               // daku-*
               char_replaced = hex2Char(m[2][0]) + hex2Char(m[2][1]);
            } else {
               //  hira/kana
               char_replaced = hex2Char(m[2]);
            }
            break;
         
         case 2:  //####  punctuation
            char_replaced = hex2Char(m[1]);
            break;
         default:
            _( matched[0].length );
      }
      
      return char_replaced;
      
   } else {
      // No Match
      //####  return hex of original char
      //_( char_hex )
      return char;
   }
};



let input = $$(".io-in")[0],
out = $$(".io-out")[0];

out.disabled = true;
input.on("change", ()=>{
   const str = input.value,
   str_replaced = toArray(str)
      .map((char, i)=>{
         const char_replaced = char2Hkana(char);
         
         return char_replaced;
      })
      .join("");
   
   out.value = str_replaced;
   out.disabled = false;
});



let copyBtn = $$('.btn-copy')[0],
clearBtn = $$('.btn-clear')[0],
clickedEvenetElsSet = [
   input,
   out,
   copyBtn,
   clearBtn
],
othersClickedStateReset = (now)=>{
   clickedEvenetElsSet.forEach((el)=>{
      if( el !== now ){
         if( el.className.includes("clicked") ){ 
            el.classList.remove("clicked");
         }
      }
   });
};
clickedEvenetElsSet.forEach((el)=>{
   el.on("click", function(e){
      othersClickedStateReset(el);
   });
}) 


copyBtn.on("click", function(e){
   e.preventDefault();
   this.classList.toggle("clicked");
});
clearBtn.on("click", function(e){
   e.preventDefault();
   this.classList.toggle("clicked");
});


/*  ads toggle  */
$$('.ads-strup')[0].on("click", function(e){
   e.preventDefault();
   
   this.parentElement.classList.toggle("clicked");
   this.classList.toggle("clicked");
});

/*  copy btn  */ 
   /*** Clicpboard.js ***/
   new ClipboardJS('.btn-copy'); 
   /*********************/

/*  clear btn  */
$$('.btn-clear')[0].on("click", function(e){
   const target = this.getAttribute("data-clear-target");
   //_( target)
   
   const els = $$(target);
   //_( els.length )
   if( els.length === 1){
      //_( $$(target) )
      if( $$(target).tagName === "TEXTAREA" || "INPUT"){
         $$(target).value = "";
      } else {
         $$(target).innerHTML = "";
      }
   } else {
      els.forEach((el)=>{
         if( el.tagName === "TEXTAREA" || "INPUT"){
         el.value = "";
      } else {
         el.innerHTML = "";
      }
      });
   }
});