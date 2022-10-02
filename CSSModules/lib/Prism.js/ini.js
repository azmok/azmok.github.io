import { _, create, setAttr, appendTo } from 'https://azmok.github.io/CSSModules/js/autil-1.0.4.mod.js'


/* relative to '.html' file <script> attached */
const url_prism_css = 
   "https://azmok.github.io/CSSModules/lib/Prism.js/okaidia.css",
url_prism_js = 
   "https://azmok.github.io/CSSModules/lib/Prism.js/prism.min.js",
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
   })
   .catch(err => _(err.message) )
   
// Plugin: Line Highlight
import('./plugins/line-highlight/ini.js')
   .then(obj => {
      obj.default()
   })
   .catch(err => _(err.message) )
   