<?php

namespace OOPe\Traits;



use function Autil\_, Autil\type, Autil\toString, Autil\match, Autil\filter, Autil\map, Autil\object2String, Autil\splitNamespaces, Autil\indexOf, Autil\last, Autil\initial;

/*--------------------------
   <<trait>>
   ObjectT
----------------------------

-----------------------------
 + props() : <Assoc>
 + methods() : <Assoc>
 + getClassName() : <Str>
 + toString() : <Str>
 - __toString() : <Str>
---------------------------*/



trait ObjectT{
   
   private $_value = [];
   
   function valueOf(){
      return $this->_value;
   }
   
   /**
   * 
   * 
   */
   function getClassName(){
      $arr = splitNamespaces(get_class($this));
      $className = last($arr);
      
      return $className;
   }
   function getNamespace(){
      $arr = splitNamespaces(get_class($this));
      $namespace = initial($arr);
      
      return $namespace;
   }
   
   /**
   * 
   * 
   */
   function getProps(){
      $varsAssoc = get_object_vars($this);
      //_( $vars );
      $varNames = array_keys($varsAssoc);

      return $varNames;
   }
   
   /**s
   * 
   * 
   */
   function getMethods(){
      $methodNames = get_class_methods($this);
      $filtered = filter(function($curr){
         return $curr !== "__construct";
      }, $methodNames);
      
      $maped = map(function($curr, $indx){
         return $curr  ."\0";
      }, $filtered);
      return $maped;
   }
   
   /**
    */
   
   
   function  __toString(){
      switch( type($this) ){
         case "Array" || "AssocArray":
            return object2String($this); 
         case "Number" || "Sting" ||  "Regex":
            return (string) $this->valueOf(); 
         case "Function" || "DOMDoc" || "DOMElm":
            return type($this);
         default:
            throw new Exeption("not yet implemented object about '__toString()' method!")
      }
   }
}



















