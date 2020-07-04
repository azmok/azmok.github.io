import { _, create, setCss, attr, body, repeat} from "./modules/autil-1.0.1.mod.js";

const createSwitcher = (target) => {
   let _counter = 0;
   
   return (() => {
      let offTxt, onTxt,
      switcherId = "switcher"+ _counter++,
      box = create("div")
         .attr({'class': 'box'}),
      inp = create("input")
         .attr({'type': 'checkbox'})
         .attr({'id': switcherId}),
      wrapper = create("label"),
      label = create("span"),
      button = create("span"),
      off = create("span"),
      on = create("span");
      
      wrapper.setAttribute("class", "wrapper");
      wrapper.setAttribute("for", switcherId);
      label.setAttribute("class", "label");
      button.setAttribute("class", "button"); 
      off.setAttribute("class", "label-off");
      on.setAttribute("class", "label-on");
      
      off.innerHTML = "&emsp;Off";
      on.innerHTML = "On&emsp;";
      
      label.appendChild(off);
      label.appendChild(on);
      wrapper.appendChild(label);
      wrapper.appendChild(button);
      box.appendChild(inp);
      box.appendChild(wrapper);
      target.appendChild(box);
   });
};

const switcher = createSwitcher(body);
repeat(switcher, 4);