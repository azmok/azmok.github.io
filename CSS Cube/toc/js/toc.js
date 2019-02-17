"use strict";

const inset = toArray($$('.inset'));
inset.map((elm)=>{
  //_( $(elm).prev().prop("tagName") )
  if( $(elm).prev().prop("tagName") === "H2" ){
    $(elm).hide();
    $(elm).prev().on("click", function(e){
      $(e.target).next().toggle();
    }) 
  }
});
