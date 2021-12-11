<?php

namespace OOPe\Traits;



use function Autil\_, Autil\isAssoc, Autil\_forEach, Autil\isArray, Autil\head, Autil\append, Autil\prepend,  Autil\merge, Autil\concat, Autil\joinWith;

/*--------------
   <<trait>>
   ArrayT
----------------
  
----------------
   + length() : <Num>
   + append ( * ) : <Arr>
   + prepend ( * ) : <Arr>
   + indexOf ( <Mixed> ) : <Int>
   
   + concat ( <Arr> ) : <Arr>
   + mnerge ( <Arr> ) : <Arr>
   + joinWith ( <Str>, <Arr> ) : <Str>
   + map ( <Fn> ) : <Arr>
   + filter ( <Fn> ) : <Arr>
   + reduce ( <Fn> ) : <Mixed>
------------------*/
Trait ArrayT{
   
   use ObjectT;
   
   private $_length = 0;
   private $_cursor = 0;
   private $_keysArr = [];
   
   /** 
    *
    */
   function length(){
      return $this->_length;
   }
   
   /** 
    *
    */
   function append($val){
      $arr = $this->_value;
      $this->_value = append($val, $arr);
      
      return $this;
   }
   
   /** 
    *
    */
   function prepend($val){
      $arr = $this->_value;
      $this->_value = prepend($val, $arr);
      
      return $this;
   }
   /** 
    *
    */
   function indexOf($val){
      $arr = $this->_value;
      
      return array_search($val, $arr);
   }
   
   /** 
    *
    */
   // concat :: [] -> ...[] -> []
   function concat(...$arr){
      return new self( concat($this->valueOf(), ...$arr) );
   }
   
   /**
    *
    */
   // merge :: [assoc] -> [assoc]
   function merge($arr){
      return new self( merge($this->_value, $arr) );
   }
   
   // joinWith :: Str -> [] -> Str
   function joinWith($str){
      return joinWith( $str, $this->valueOf() );
   }
   
   /** 
    *
    */
   function map($fn){
      
      $arr = $this->_value;
      $newArr = [];
      
      if( isAssoc($arr) ){
         _forEach(function($key, $val, $indx, $arr) use ($fn, &$newArr){
            $newArr[] = $fn($key, $val, $indx, $arr);
         }, $arr);
      } else {
         _forEach(function($curr, $indx, $arr) use ($fn, &$newArr){
            //_( is_callable($fn) );
            $newArr[] = $fn($curr, $indx, $arr);
         }, $arr);
      }
      //_( $newArr );
      return new self($newArr);
   }
   
   /** 
    *
    */
   function filter($fn){
      $arr = $this->_value;
      $newArr = [];
      
      if( isAssoc($arr) ){
         _forEach(function($key, $val, $indx, $arr) use ($fn, &$newArr){
            $fn($key, $val, $indx, $arr) === true ? $newArr[] = $val : false;
         }, $arr);
      } else {
         _forEach(function($curr, $indx, $arr) use ($fn, &$newArr){
            $fn($curr, $indx, $arr) === true ? $newArr[] = $curr : false;
         }, $arr);
      }
      return new self( $newArr );
   }
   
   /** 
    *
    */
   function reduce($fn, $initVal=[]){
      $arr = $this->_value;
      $acc = $initVal;
      
      _forEach(function($curr, $indx, $arr) use ($fn, &$acc){
         $acc = $fn($acc, $curr, $indx, $arr);
      }, $arr);
      if( isAssoc($acc) || isArray($acc) ){
         return new self( $acc );
      } else {
         return new self( [$acc] );
      }
   }
   /*****  !!! Collision to ObjectT! not to use '__toString' in ArrayO
   function  __toString(){
      return object2String($this); // Array, AssocArray, 
      //return (string) $this->valueOf(); // Number, Sting, Regex
      //return type($this); // Function, DOMDoc, DOMElm, 
   }
   /************************/