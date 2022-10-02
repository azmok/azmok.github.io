import { _, create, setAttr, appendTo } from './../../../../js/autil-1.0.4.mod.js'


export default function(){
   /* relative to '.html' file <script> attached */
   const url_prism_plugin_highlight_css = 
      "../lib/Prism.js/plugins/line-highlight/line-highlight.min.css",
   url_prism_plugin_highlight_js = 
      "../lib/Prism.js/plugins/line-highlight/line-highlight.min.js",
   head = document.head,
   body = document.body
      
   // prismjs.plugin.line-highlight_css
   create('link')
      .setAttr({
         rel: "stylesheet",
         href: url_prism_plugin_highlight_css,
      })
      .appendTo(head)
   
   // prismjs.plugin.line-highlight_js
   create('script')
      .setAttr({
         src: url_prism_plugin_highlight_js,
      })
      .appendTo(body)
}