import { _, create, setAttr, appendTo } from './../../js/autil-1.0.4.mod.js'



const doDarkModeSwitcher = () => {
   /* relative to `.html` file script attached */
   const body = document.querySelector('body'),
   head = document.head,
   url_dmSwitcher_js = "../modules/darkModeSwitcher.js/darkModeSwitcher.js",
   url_dmSwitcher_css = "../modules/darkModeSwitcher.js/darkModeSwitcher.css"
   
   // js
   create('script')
      .setAttr({
         type: 'module',
         defer: true,
         src: url_dmSwitcher_js,
      })
      .appendTo(body)
   
   // css
   create('link')
      .setAttr({
         rel: "stylesheet",
         href: url_dmSwitcher_css,
      })
      .appendTo(head)
}
doDarkModeSwitcher()

export default doDarkModeSwitcher