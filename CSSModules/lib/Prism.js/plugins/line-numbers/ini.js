import { _, create, setAttr, appendTo } from 'https://azmok.github.io/CSSModules/js/autil-1.0.4.mod.js'


export default function(){
   /* relative to '.html' file <script> attached */
   const url_prism_plugin_lineNumbers_css = 
      "https://azmok.github.io/CSSModules/lib/Prism.js/plugins/line-numbers/line-numbers-0.0.1.css",
   url_prism_plugin_lineNumbers_js = 
      "https://azmok.github.io/CSSModules/lib/Prism.js/plugins/line-numbers/line-numbers.min.js",
   head = document.head,
   body = document.body
   
   // prismjs.plugin.line-numbers
   create('link')
      .setAttr({
         rel: "stylesheet",
         href: url_prism_plugin_lineNumbers_css,
      })
      .appendTo(head)
   Array.from(head.children).map(child => {
      child.tagName === "LINK" ? 
         _( child.href, "\n", location.href ) : 
         false
   })

   // prismjs.plugin.line-numbers
   create('script')
      .setAttr({
         src: url_prism_plugin_lineNumbers_js,
      })
      .appendTo(body)
   _(6)
}