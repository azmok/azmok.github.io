import { _, create, setCss, attr, body } from "./modules/autil-1.0.1.mod.js";

"use strict";


let css = {
   switcher : {
      display: "table",
      margin: "25px auto",
   },
   base : {
      display: "none",
   },
   container : {
      position: "relative",
      display: "block",
      width: "120px",
      height: "40px",
      border: "2px solid #aaa",
      borderRadius: "20px",
      overflow: "hidden"
   },
   label : {
      display: "block",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "-1",
      width: "200%",
      height: "100%",
      background: "#ddd",
      transition: "all 0.28s ease",
      userSelect: "none",
      WebkitUserSelect: "none",
   },
   labelOff : {
      display: "block",
      position: "absolute",
      top: "0",
      left: "0",
      width: "50%",
      height: "100%",
      color: "#aaa",
      background: "#eee",
      font: "normal normal 700 18px/2.05 Monospace",
      letterSpacing: "0px",
      paddingLeft: "1rem",
   },
   labelOn : {
      display: "block",
      position: "absolute",
      top: "0",
      left: "50%",
      width: "50%",
      height: "100%",
      color: "#fff",
      background: "#ffcab5",
      textAlign: "right",
      font: "normal normal 700 18px/2.05 Monospace",
      letterSpacing: "0px",
      paddingRight: "1rem",
   },
   button : {
      display: "block",
      position: "absolute",
      transition: "all 0.28s ease",
      top: "50%",
      left: "90%",
      transform: "translate(-100%, -50%)",
      zIndex: "2",
      width: "32px",
      height: "32px",
      border: "2px solid #aaa",
      borderRadius: "50%",
      background: "#fff",
   },
},
Switcher = (obj) => {
   //_(2)
   obj.isOn = () => obj.checked;
   return obj;
},
createSwitcher = (target, css) => {
   //_( 1 )
   let i = 0;
   let switcherId = "switcher" + i++,
   switcher = create("DIV")
      .attr({'class': 'switcher'})
      .setCss(css["switcher"]),
   base = create("INPUT")
      .attr({'type': 'checkbox'})
      .attr({'id': switcherId})
      .attr({'class': "base"})
      .setCss(css["base"]),
   container = create("LABEL")
      .attr({"for": switcherId})
      .attr({'class': "container"})
      .setCss(css["container"]),
   label = create("SPAN")
      .attr({'class': "label"})
      .setCss(css["label"]),
   off = create("SPAN", "Off")
      .attr({'class': "label-off"})
      .setCss(css["labelOff"]),
   on = create("SPAN", "On")
      .attr({'class': "label-on"})
      .setCss(css["labelOn"]),
   button = create("SPAN")
      .attr({'class': "button"})
      .setCss(css["button"]);
   
   label.appendChild(off);
   label.appendChild(on);
   
   container.appendChild(label);
   container.appendChild(button);
   
   switcher.appendChild(base);
   switcher.appendChild(container);
   target.appendChild(switcher);
   
   return base;
},
clickedAction = function(){
   let label = this.nextElementSibling.children[0],
   btn = this.nextElementSibling.children[1];
   
   if( this.checked ){
      label.setCss({left: "-100%"});
      btn.setCss({
         left: "10%",
         transform: "translate(0%, -50%)"
      });
   } else {
      label.setCss(css["label"]);
      btn.setCss(css["button"]);
   }
},
bgChange = function(col){
   return {
      ON: function(){
         body.style.background = "pink";
      },
      OFF: function(){
         body.style.background = "";
      }
   };
},
dialogMsg = function(txt){
   let dBox = create("DIV", "", body),
   dBoxin = create("DIV", txt, dBox),
   css = {
      default: {
         position: "absolute",
         top: "0",
         left: "50%",
         display: "table",
         background: "darkcyan",
         color: "#fff",
         transition: "all 0.4s ease",
         tranform: "translate(-50%, -100%)",
         opacity: 0
      },
      on: {
         top: "100px",
         opacity: 1
      },
      off: {
         top: 0,
         opacity: 0
      }
   };
   
   dBoxin.setCss({
      textAlign: "center",
      padding: "1rem"
   });
   dBox.setCss(css["default"]);
   
   return ({
      ON: ()=>{
         dBox.setCss(css["on"]);
      },
      OFF: ()=>{
         dBox.setCss(css["off"]);
      }
   });
};



let base = createSwitcher(body, css);


base = Switcher(base);

base.on("click", clickedAction.bind(base) );
//base.toggle("click", bgChange );
/**/