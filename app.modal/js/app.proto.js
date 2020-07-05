'use strict';

const _ = console.log,
doc = document,
isId = function(str){
   return str.match(/^#.*/g);
},

/* モーダル実装時に使う、自作関数 */
$$ = function(selector) {
   if ( isId(selector) ) {
      return doc.querySelector(selector);
   } else {
      return doc.querySelectorAll(selector);
   }
},
toArray = (DOMcollection)=> [].slice.call(DOMcollection);

const myAlert = () => {
   window.addEventListener("DOMContentLoaded", function(){
      let el = $$(".modal")[0];
      
      el.classList.add("on");
      
      // モーダルclickされた時
      el.addEventListener("click", function(){
         el.classList.add("disappear");
      });
      
      // モーダルclick ==> animationEnd
      el.addEventListener("animationend", function(){
         _("animationend event fired!")
         el.classList.remove("on"); // '見える'クラスを取る(見えなくする)
         el.classList.remove("disappear"); // アニメ用のクラスを取る(リセットボタンが不要の場合、つまり通常のアラートのように1回しか使わない場合は、不要。`.disappear`は残しておいても問題はない。
      });
   });
};
myAlert();