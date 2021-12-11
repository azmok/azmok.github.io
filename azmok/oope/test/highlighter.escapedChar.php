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



$styles = [
   "style" => [
      "background" => "#333",
      "color" => "#fff",
      "padding" => "1rem",
   ],
];
$escaped = [
   "&" => "&amp;",
   "<" => "&lt;",
   ">" => "&gt;",
   "'" => "&apos;",
   '"' => "&quot;",
];
$code = file_get_contents("demo.php");
$code = escape($code);

/*****  comment | string  ****/
#                      _____  _true_   _______false_________________   
$re_comm_or_str = '~(?(?=(?P<blk>/\*)|(?P<line>#|//))([\w\W]*?(?(?=(?P=blk))\*/|$))|(?P<string>&quot;|&apos;).*?(?P=string))~m';
$replacer = function($match){
   _( escape($match[0]) );
   if( match('~^&quot;|&apos;~m', $match[0]) ){
      
      $str = "<span style='color: orange;'>".  $match[0] ."</span>";
   } else {
      $str = "<span style='color: #888;'>".  $match[0] ."</span>";
   }
   
   return $str;
};
$html = replace($re_comm_or_str, $replacer, $code);
inject( $html, "pre", $styles );





























































