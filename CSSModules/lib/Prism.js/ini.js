import { _, create, setAttr, appendTo } from './../../js/autil-1.0.4.mod.js'


/* relative to '.html' file <script> attached */
const url_prism_css = 
   "../lib/Prism.js/okaidia.css",
url_prism_js = 
   "../lib/Prism.js/prism.min.js",
head = document.head,
body = document.body

// prism_css
create('link')
   .setAttr({
      rel: "stylesheet",
      href: url_prism_css,
   })
   .appendTo(head)

// prism_js
create('script')
   .setAttr({
      src: url_prism_js,
   })
   .appendTo(body)

// Plugin: Line Numbers
import('./plugins/line-numbers/ini.js')
   .then(obj => {
      obj.default()
      _(2)
   })
   .catch(err => _(err.message) )
// Plugin: Line Highlight
import('./plugins/line-highlight/ini.js')
   .then(obj => {
      obj.default()
      _(3)
   })
   .catch(err => err)
   