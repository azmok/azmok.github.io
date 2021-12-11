<?php


//include("getCodeBlksInFile.php");

require_once $_SERVER['DOCUMENT_ROOT']  ."/.packages/OOPe/__init__.php";
use function Autil\_, Autil\type, Autil\inject, Autil\pretty, Autil\match, Autil\replace;
use \OOPe\StringO;
use \OOPe\RegExpO;
use \OOPe\ArrayO;
use \OOPe\AssocArrayO;

function escape ($str){
   return htmlspecialchars($str);
}
function unescape ($str){
   return htmlspecialchars_decode($str);
}



$token = [
   "comment" => [
      "regex" => '/((#|\/\/).*$)|(\/\*[\w\W]*?\*\/)/m',
      "color" => '#888',
   ],
   "string" => [
      "regex" => '/(\'|\").*\1/m',
      "color" => 'yellow',
   ], 
   "function" => [
      "regex" => '//',
      "color" => 'deepskyblue',
   ],
];
$styles = [
   "style" => [
      "background" => "#333",
      "color" => "#fff",
      "padding" => "1rem",
   ],
];

$code = file_get_contents("demo.php");
//$code = escape($code);
$token = new AssocArrayO($token);
//inject( $code, "pre", $styles);


/*****  comment | string  ****/
#                      ______cond__________________   _______true__________  _______false   
$re_comm_or_str = '~(?(?=(?P<blk>/\*)|(?P<line>#|//))([\w\W]*?(?(?=(?P=blk))\*/|$))|(?P<string>\'|\").*?(?P=string))~m';
$replacer = function($match){
   _( escape($match[0]) );
   if( match('~/\*|#|//~', $match[0]) &&
      !match('~\'|"~', $match[0])  ){
      
      $str = "<span style='color: #999;'>".  $match[0] ."</span>";
   } else {
      $str = "<span style='color: orange;'>".  $match[0] ."</span>";
   }
   
   return $str;
};
$html = replace($re_comm_or_str, $replacer, $code);
inject( $html, "pre", $styles );






























































