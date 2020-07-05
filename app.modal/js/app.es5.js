
'use strict';

var doc = document,
isId = function isId(str) {
   return str.match(/^#.*/g);
},

/* モーダル実装時に使う、自作関数 */
$$ = function $$(selector) {
   if (isId(selector)) {
      return doc.querySelector(selector);
   } else {
      return doc.querySelectorAll(selector);
   }
},
wait = function wait(fn, time) {
   setTimeout(fn, time);
};

var myAlert = function myAlert() {
   var modal = $$(".modal")[0],
   modalBg = $$(".modal-bg")[0],
   okBtn = $$(".modal button")[0]; // モーダルon
   
   modal.classList.add("on");
   modalBg.classList.add("on"); // モーダルclickされた時
   
   okBtn.addEventListener("click", function () {
      //modal.classList.remove("on");
      modal.style.display = "none";
      modalBg.classList.remove("on");
   });
};
/* pattern 1 */
wait(myAlert, 500);


/* pattern 2 *
window.onload = function(){
   myAlert();
} */
