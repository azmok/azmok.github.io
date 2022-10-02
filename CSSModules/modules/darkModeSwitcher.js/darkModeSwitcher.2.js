import { _, create, setAttr, setCss, setText, $$ } from './autil-1.0.4.mod.js'


/* css
.switcher{
   display: table;
   margin: 25px auto;
}
input[type='checkbox']{
   display: none;
}

.wrapper, .label, .button{
   display: block;
}
.wrapper{
   position: relative;
   user-select: none;
   cursor: pointer;
}
.label, .button{
   position: absolute;
   transition: all 0.28s ease;
}

.wrapper{
   width: 120px;
   height: 40px;
   border: 2px solid #aaa;
   border-radius: 20px;
   overflow: hidden;
}
.label{
   top: 0;
   left: 0;
   z-index: 1;
   
   width: 200%;
   height: 100%;
   background: #ddd;
}
.label-off, .label-on{
   display: block;
   position: absolute;
   top: 0;
   width: 50%;
   height: 100%;
   font: normal normal 700 18px/2 Monospace;
   letter-spacing: 0px;
}
.label-off{
   left: 0;
   color: #aaa;
   background: #eee
}
.label-on{
   left: 50%;
   color: #fff;
   background: #ffcab5;
   text-align: right;
}

.button{
   top: 50%;
   left: 90%;
   transform: translate(-100%, -50%);
   z-index: 2;
   
   width: 32px;
   height: 32px;
   border: 2px solid #aaa;
   border-radius: 50%;
   background: #fff;
}
input[type='checkbox']:checked + .wrapper .label{
   left: -100%;
}
input[type='checkbox']:checked + .wrapper .button{
   left: 10%;
   transform: translate(0%, -50%);
}
*/

const css_switcher = `
.switcher{
   display: table;
   margin: 25px auto;
}
input[type='checkbox']{
   display: none;
}

.wrapper,
.label,
.button{
   display: block;
}
.wrapper{
   position: relative;
   user-select: none;
   cursor: pointer;
}
.label, .button{
   position: absolute;
   transition: all 0.28s ease;
}

.wrapper{
   width: 120px;
   height: 40px;
   border: 2px solid #aaa;
   border-radius: 20px;
   overflow: hidden;
}
.label{
   top: 0;
   left: 0;
   z-index: 1;
   
   width: 200%;
   height: 100%;
   background: #ddd;
}
.label-off,
.label-on{
   display: block;
   position: absolute;
   top: 0;
   width: 50%;
   height: 100%;
   font: normal normal 700 18px/2 Monospace;
   letter-spacing: 0px;
}
.label-off{
   left: 0;
   color: #aaa;
   background: #eee
}
.label-on{
   left: 50%;
   color: #fff;
   background: #ffcab5;
   text-align: right;
}

.button{
   top: 50%;
   left: 90%;
   transform: translate(-100%, -50%);
   z-index: 2;
   
   width: 32px;
   height: 32px;
   border: 2px solid #aaa;
   border-radius: 50%;
   background: #fff;
}
input[type='checkbox']:checked + .wrapper .label{
   left: -100%;
}
input[type='checkbox']:checked + .wrapper .button{
   left: 10%;
   transform: translate(0%, -50%);
}`

create('style')
   .setText(css_switcher)
   .appendTo(document.head)
/**/

const createSwitcher = (target) => {
   let _counter = 0;
   
   return (() => {
      let offTxt, onTxt,
      switcherId = "switcher"+ _counter++,
      
      switcher = create("div")
         .setAttr({'class': 'switcher'})
         .setCss({
         position: 'fixed',
         top: 0,
         right: 0,
         display: 'table',
         background: 'transparent',
         'transform-origin': '100% 0%',
         transform: 'rotate(90deg) translate(100%, 0%)'
         
         }),
      inp = create("input")
         .setAttr({'type': 'checkbox'})
         .setAttr({'id': switcherId}),
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
      switcher.appendChild(inp);
      switcher.appendChild(wrapper);
      target.appendChild(switcher);
      
      return switcher
   });
};


const Switcher = createSwitcher(document.body)
const switcher1 = Switcher()

const addTransition = (elm) => {
   elm.setCss({
      transition: 'all 0.11s ease',
   })
   elm.hasTransition = true
}

switcher1.addEventListener('click', (e)=> {
   e.preventDefault()
   
   const html = document.documentElement
   const checkbox = switcher1.children[0]
   
   switcher1.hasTransition ? true : addTransition(html)
   
   
   checkbox.checked = !checkbox.checked
   html.classList.toggle('dark')
   //$$('')
})/**/