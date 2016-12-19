"use strict";

(function () {

   var toggles = document.querySelectorAll(".toggle");
   var i = 0;
   
   var hideshow = function (ev) {
      
      // ev.stopPropagation();
      if (ev.target.className === "toggle") {
      
         var target = ev.target;
         var n = 0;
         
         for(;n < target.children.length; n++) {
            
            var ul2 = target.children[n];
         
            if (ul2.style.display !== "none") {
            
               ul2.style.display = "none";
            
            } else {
         
               ul2.style.display = "block";
            
            }
         
         }
      
      }
      
   };
   
   for (;i < toggles.length; i++) {
      
      var toggle = toggles[i];
      toggle.addEventListener("click", hideshow);
      
   }

})();