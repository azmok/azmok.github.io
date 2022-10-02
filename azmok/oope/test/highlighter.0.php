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
$code = escape($code);
$token = new AssocArrayO($token);
//inject( $code, "pre", $styles);


/*****  comment  ****
$re_comm = new RegExpO($token->comment->regex);
$html = $re_comm->replace(function ($match) use ($token){
   $color = $token->comment->color;
   $html = "<span style='color: {$color}'>". $match[0] ."</span>";
   _( htmlspecialchars($html) );
   
   return $html;
}, $code);
inject( $html, "pre", $styles );



/*****  string  *****/
$str = <<<DOC
   $a =  "this is 'stfint' ";
   function (){}
   /* line block "comment" */

   
   /* block comment2 ==> 
      block comment line 2
      multi line (3)
   */
   $b = 'string2';
   // line 'coment'
DOC;


$re_str = '/("|\')[\w\W]*?\1/';
$re_comm = '~((//|#).*$)|(/\*[\w\W]*?\*/)~m';

# (?(comment)?(comment)|(string)
#                      _____  _true_   _______false_________________   
//$re_comm_or_str = '~(?(?=/\*)(.*?\*/)|(?P<string>\'|\").*?(?P=string))~m';

#                      _____  _true_   _______false_________________   
$re_comm_or_str = '~(?(?=/\*)([\w\W]*?\*/)|(?P<string>\'|\").*?(?P=string))~m';
preg_match_all($re_comm_or_str, $str, $matches);
pretty( $matches, true );
inject( $html, "pre", $styles );





/*
foreach( comments ){
   if( commnet->match(string) )
}
*/















































