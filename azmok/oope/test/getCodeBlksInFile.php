<?php


require_once $_SERVER['DOCUMENT_ROOT']  ."/__init__.php";
use \OOPe\StringO;
use \OOPe\RegExpO;
use \OOPe\ArrayO;
use \OOPe\AssocArrayO;

use function Autil\_, Autil\type, Autil\inject, Autil\pretty;




#<<< code descripttion1
function getCodeBlocks($path){
   //_( '::: in getCodeBlocks' );
   $cBlocks = [];
   $txt = file_get_contents($path);
   
   ### divide into blocks ==> store in array
   $re_codeBlock = '/^(#<<<)([^\n]+)([\w\W]+?\R(?=\1|\Z))(#<<<)/mg';
   $re = new RegExpO($re_codeBlock);
   $arr = new ArrayO( $re->exec($txt) );
   _( $arr->length );
   $newArr = $arr->map(function($curr, $indx, $arr){
      _( $curr, $indx );
   });
  
}
#<<<



function prependPHPTag($str){
   // return (new StringO("<?php\n\n"))->concat($str)->valueOf();
   return (new StringO("<?php\n\n"))->concat($str)->valueOf();
}

function injectCodeBlocks($filepath=__FILE__, $highlight=true){
   //_( $filepath );
   $style = [
      "class" => "",
      "style" => [
         "background" => "#e9e9ec",
         "padding" => "0rem 1.5rem",
         "border" => "1px solid #cacaca",
      ],
   ];
   $cBblocks = getCodeBlocks($filepath);
   //_( $cBlocks );
   /*
   foreach( $cBlocks as $key=>$code){
      if( $highlight ){
         _( $key );
         _( $code );
         $trimed = trim($code);
         $prepended = prependPHPTag($trimed);
         $lighted = highlight_string($prepended, true);
      }
      inject($lighted, "pre", $style);
      
   }*/
}


injectCodeBlocks();





















