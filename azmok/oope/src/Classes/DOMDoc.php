<?php

namespace OOPe\Classes;



use OOPe\Traits\ObjectT;
use OOPe\Classes\DOMElm;

use function Autil\_, Autil\type, Autil\escape, Autil\getOrCreateDOMDoc;


class DOMDoc{
   
   use ObjectT;
   
   protected $document;
   protected $head;
   protected $body;
   
   function __construct(){
      $doc = new \DOMDocument();
      
      # Initializing HTML 
      $head = $doc->createElement('head');
      $body = $doc->createElement('body');
      ## appending to root
      $doc->appendChild($head);
      $doc->appendChild($body);
      
      # Initalizing prop of object
      $this->document = $doc;
      $this->head = $head;
      $this->body = $body;      
      
      return $this;
   }
   
   function init(){
      
      $this->setViewport();
      
      /*-----------  Prism.js: CDN(autoload)  ---------*/
      $prismCss = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism-okaidia.min.css';
      $prismJs1 = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-core.min.js';
      $prismJs2 = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/autoloader/prism-autoloader.min.js';
      /*----  Bootstrup.css ----*/
      $$URL_BOOTSTRUP_CDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
      /*-----------*/

      
      $doc = $this->document;
      # Bootstrup.css
      $this->loadCss($URL_BOOTSTRUP_CDN);
      
      # Prism.js
      $this->loadCss($prismCss);
      $this->loadJs($prismJs1);
      $this->loadJs($prismJs2);
      
      # add paddign to body
      $this->body->setAttribute("style", "padding: 1rem;");
      
      /*----------------------------------------------*/
      
      return $this;
   }
   
   function create($tagName){
      return new DOMElm($tagName, $this);
   }
   
   function render(){
      echo $this->document->saveHTML();
   }
   
   function html(){
      return escape($this->document->saveHTML());
   }
   
   function setViewport(){
      $this
         ->create('meta')
         ->attr('name', 'viewport')
         ->attr('content', 'width=device-with, initial-scale=1')
         ->appendTo('head');
   }
   
   function loadCss($path){
      $this
         ->create('link')
         ->attr('rel', 'stylesheet')
         ->attr('href', $path)
         ->appendTo('head');
   }
   
   function loadJs($path){
      $this
         ->create('script')
         ->attr('src', $path)
         ->appendTo('body');
   }
}






















