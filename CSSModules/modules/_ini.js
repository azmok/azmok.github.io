import doDarkModeSwitcher from './darkModeSwitcher.js/_ini.js'
import { create, setAttr, appendTo } from './../js/autil-1.0.4.mod.js'


/* relative to `.html` file that <link rel="stylesheet" ...> tag will be added */
const url_label_css = '../modules/label.css/_ini.css',
head = document.head
// css
create('link')
   .setAttr({
      rel: "stylesheet",
      href: url_label_css,
   })
   .appendTo(head)