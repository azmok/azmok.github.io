"use strict";
var _ = console.log;

document.body.onload = function() {
    var toggles = document.querySelectorAll(".toggle"),
        i = 0,
        lists = document.querySelectorAll('.lists');
    
    /*********************
     if creating object property in 'for loop' , pre-defining object by literal is important! 
    ************************/
    for (;i < lists.length; i++) {
        var list, listH, btn;
        list = lists[i];
        /************************************
          overFlow => getRect() => height:0
          overflow setting affects element height.
        **************************************/
        list.style.overflowY = 'hidden';
        listH = list.getBoundingClientRect().height;
        
        list.style.height = '0';
        
        btn = list.previousElementSibling;
        btn.height = listH; // list-Height assigns the button Object Property
        btn.addEventListener('mousedown', function(ev) {
            var elmH;
            ev.preventDefault();
            // _(this.height);
            elmH = this.nextElementSibling.getBoundingClientRect().height;
            // _(this.nextElementSibling.tagName, elmH);
            if(elmH === 0) {
                this.classList.add('clicked');
                this.nextElementSibling.style.height = this.height + 'px';
            } else {
                this.classList.remove('clicked');
                this.nextElementSibling.style.height = 0;  
            }
        });
    }
       // _(obj);
};