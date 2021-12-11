<?php

namespace OOPe\Classes;



function exho(...$args){
   foreach($args as $arg){
      echo "{$arg}<br>";
   }
}

function EachVal($arr){
   foreach( $arr as $key=>$val){
      echo "::{$key}:: {$val}<br>";
   }
}
function reverseSlash($str){
   # forward -> back
   if( strpos($str, '/') !== false ){
      return preg_replace('~/~', '\\', $str);
      
   # back -> forward
   } elseif( strpos($str, '\\') !== false ){
      return preg_replace('~\\\~', '/', $str);
   }
}


$autoload = [
   'psr-4' => [
      'OOPe' => 'src',
   ],
];

//exho( $autoload['psr-4']['\\OOPe'] ); // src





spl_autoload_register(function($name) use ($autoload){
   # classes
   if( preg_match('/classes/i', $name) ){
   
      ####  namespace2Path  ####
      $psr4 = $autoload['psr-4'];
      $namespace = array_keys($psr4)[0];
      $dirname = $psr4[$namespace];
      
      exho( $namespace, $dirname);
      $pathLike = str_replace($namespace, $dirname, $name) . ".php";
      
      exho( $path );
      
      
      ####  reverseSlash  ####
      $path = reverseSlash($pathLike);
      exho( $path );
      
      
   # traits
   } elseif( preg_match('/traits/', $name) ){
      echo "traits autoloader. now implementing...";
   }
});


new Log();

/**/






















