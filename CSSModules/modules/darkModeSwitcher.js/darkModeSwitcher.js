import { _, create, setAttr, setCss, setText, $$ } from './../../js/autil-1.0.4.mod.js'


/* <!--
<div class="switcher">

   <input type="checkbox" class="base" id="switcher-xxx"></input>
   <label class="wrapper" for="switcher-xxx">
      <span class="label">
         <span class="label-off">&emsp";Off</span>
         <span class="label-on">On&emsp";</span>
      </span>
      <span class="button"></span>
   </label>

</div>
-->
*/




const createSwitcher = (target) => {
   let _counter = 0;
   
   const switcherId = "switcher"+ _counter++
   //_( switcherId )
   const switcher = create("div")
      .setAttr({
         class: 'switcher'
      })
      .setCss({
         position: 'fixed',
         top: 0,
         right: 0,
         display: 'table',
         background: 'transparent',
         'transform-origin': '100% 0%',
         transform: 'rotate(90deg) translate(100%, 0%)',
      })
      .setText("DarkMode")
      .appendTo(target),
      
   inp = create("input")
      .setAttr({
         type: 'checkbox',
         id: switcherId
      })
      .appendTo(switcher),
      
   wrapper = create("label-switcher")
      .setAttr({
         "class": "switcher-wrapper",
         "for": switcherId
      })
      .appendTo(switcher),
   
   label = create("span")
      .setAttr({
         class: "switcher-label"
      })
      .appendTo(wrapper),
      
   button = create("span")
      .setAttr({
         class: "switcher-button"
      })
      .appendTo(wrapper),
      
   off = create("span")
      .setAttr({
         class: "switcher-label-off"
      })
      .setText("Off")
      .appendTo(label),
      
   on = create("span")
      .setAttr({
         class: "switcher-label-on"
      })
      .setText("On")
      .appendTo(label)
   
   return switcher
};

const switcher = createSwitcher(document.body);
const addTransition = (elm) => {
   elm.setCss({
      transition: 'all 0.11s ease',
   })
   elm.hasTransition = true
}


switcher.addEventListener('click', (e)=> {
   e.preventDefault()
   
   const html = document.documentElement
   const checkbox = switcher.children[0]
   
   switcher.hasTransition ? true : addTransition(html)
   
   
   checkbox.checked = !checkbox.checked
   html.classList.toggle('dark')
})/**/