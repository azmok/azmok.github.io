<?php

namespace OOPe;



require_once $_SERVER['DOCUMENT_ROOT']  ."/.packages/Autil/__init__.php";

use function Autil\_;



class Template{
   private $_template = "";
   private $_vars = [];
   
   function __construct($template="", $vars=[]){
      $this->_template = $template;
      $this->_vars = $vars;
      $this->_value = $this->substitute();
   }
  
   function template(){
      return $this->_template;
   }
  
   function vars(){
      return $this->_vars;
   }
  
   function set($template, $vars){
      # set _template
      $this->_template = $template;
     
      # ser _vars
      $this->_vars = $vars;
     
      # set substituted value
      $this->_value = $this->substitute();
   }
   
   function get(){
      return  $this->_value;
   }
  
  
  
   private function substitute(){
      if( $this->template()  &&
          $this->vars() ){

         return strtr(
            $this->template(),
            $this->vars()
         );
      } else {
         return "";
      }
   }
  
}







