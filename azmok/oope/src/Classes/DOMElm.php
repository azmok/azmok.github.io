<?php

namespace OOPe\Classes;



use OOPe\Traits\ObjectT;
use OOPe\Classes\DOMDoc;

use function Autil\_, Autil\type;

/*--------------------
      DOMElm
----------------------
 - $doc
 - $elm
 - DOCobj
----------------------


--------------------*/


class DOMElm extends DOMDoc{
   
   use ObjectT;
   
   private $doc;
   private $elm;
   private $DOCobj;
   
   
   /**
    *
    */
   function __construct($tagName, $DOCobj){
      $doc = $DOCobj->document;
      
      $this->doc = $doc;
      $this->elm = $doc->createElement($tagName);
      $this->DOCobj = $DOCobj;
      
      return $this;
   }
   
   /**
    *
    */
   function element(){
      return $this->elm;
   }
   
   function attr(...$args){
      if( empty($args) ){
         return $this->elm->getAttribute();
      } else {
         $name = $args[0];
         $val = $args[1];
         
         $this->elm->setAttribute($name, $val);
         
         return $this;
      }
   }
   
   /**
    *
    */
   function append(){
      $this->doc->appendChild($this->elm);
   }
   
   function appendTo($target){
      if( type($target) === '[String]' ){
         $doc = $this->doc;
         $target = $doc->getElementsByTagName($target)[0];
         
         $target->appendChild($this->elm);
         
        return $this;
        
      } else {
         $parent = $target->element();
         
         $parent->appendChild($this->elm);
      }
      //_( $this->DOCobj->html() );
   }
   
   /**
    *
    */
   function text($str){
      $this->elm->textContent = $str;
      
      return $this;
   }
   
   
}
















