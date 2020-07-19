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
 */

import { hkhkDic_basic as basicDict } from "./dic/hkhkDic_basic.js";
import { hkhkDic_punc1 as puncDict1 } from "./dic/hkhkDic_punc1.js";
import { hkhkDic_punc2 as puncDoct2  } from "./dic/hkhkDic_punc2.js";
import { _, $$, isArray, toArray } from "./myModule.mod.js";


"use strict";

let dictionary = basicDict.concat(puncDict1, puncDoct2 ),
hex2Code = hex => parseInt(hex, 16),
code2Hex = (int) => {
   let radix = 16;
   
   return int.toString(radix);
},
char2Hex = char => {
   let code = char.charCodeAt(),
   hex = code2Hex(code);
   
   return hex;
},
hex2Char = hex => {
   let code = hex2Code(hex),
   char = String.fromCharCode(code);
   
   return char;
},
char2Hkana = char => {
   let char_hex = char2Hex(char),
   matched = dictionary.filter( arr => {
      return arr.includes(char_hex);
   });
   
   if( matched.join("") ){
      let m = matched[0];
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
   
   //####  No Match  ####
   } else {
      return char;
   }
},
clearAll = ev => {
   let clearBtn = ev.target,
   selector = clearBtn.getAttribute("data-clear-target"),
   clearTargets = $$(selector);
   
   toArray(clearTargets).map(curr => {
      let tagName = curr.tagName;
      
      if( tagName === "TEXTAREA"  || tagName === "INPUT" ){
         curr.value = "";
      } else {
         curr.innerHTML = "";
      }
   });
},
addClass = (elm, className) => elm.classList.add( className ),
removeClass = (elm, className) => elm.classList.remove( className ),
toggleClassTimer = (elm, className, duration) => {
   elm.classList.add( className );
   
   setTimeout(() => {
      removeClass(elm, className);
   }, duration);
      
},
copyTextToClipboard = (targetElm) => {
   /**  
    ** Clippboard API: 'navigator.clipboard.xxx' 
      
    ** my memo:: this api doesnt work well on 'compositiosatrt/compositioend' event of iPad. 
      **/
   
   const cboard = navigator.clipboard;
      
   try{
      if( cboard ){
         // copy to navigator.clipboard
         cboard.writeText(targetElm.value)
            .then( () => {
               // make 'copied' message elm visible
               toggleClassTimer(msgBoard, "visible", 1000);
            })
            .catch( e => {
               console.error( `${e.name}: ${e.message}` ); 
            });
      } else {
         throw new Error("'window.navigator.clipboard' isn't implemented in your browser.")
      }
   } catch(e){
      console.error(`${e.name}: ${e.message}`);
   }
}

let input = $$(".io-in")[0],
output = $$(".io-out")[0],
copyBtn = $$('.btn-copy')[0],
clearBtn = $$('.btn-clear')[0],
msgBoard = $$('#msg-board');


output.disabled = true;


input.on("change", e => {
   e.preventDefault();
   
   let str = input.value,
   str_replaced = toArray(str)
      .map(char => {
         let char_replaced = char2Hkana(char);
         
         return char_replaced;
      })
      .join("");
   
   output.value = str_replaced;
   output.disabled = false;
});


copyBtn.on("click", e => {
   e.preventDefault();
   
   addClass(copyBtn, "clicked");
   removeClass(clearBtn, "clicked");
   
   copyTextToClipboard(output);
});


clearBtn.on("click", e => {
   e.preventDefault();
   
   clearAll(e);
   
   addClass(clearBtn, "clicked");
   removeClass(copyBtn, "clicked");
   
});
