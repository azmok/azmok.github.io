<?php


//include("getCodeBlksInFile.php");

require_once $_SERVER['DOCUMENT_ROOT']  ."/__init__.php";
use function Autil\_, Autil\type, Autil\inject, Autil\pretty, Autil\match, Autil\replace, Autil\render;
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
   "comm" => [
      "regex" => '~((//|#).*$)|/\*[\w\W]*\*/~m',
      "color" => '#888',
   ],
   "str" => [
      "regex" => '~^(.*)((?P<quot>\'|").*?(?P=quot))(.*)$~m',
      "color" => 'yellow',
   ], 
   "fn" => [
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
$token = new AssocArrayO($token);



//_( $token ); // [AssocArrayO Object]
//_( type($token->comm) ); // [AssocArrayO Object] 
//_( $token->comm->regex );


$template = new StringO("<span style='color: {col};'>{txt}</span>");
$re_comm = '~((//|#).*$)|/\*[\w\W]*\*/~m';


### comment 
$re_comm = new RegExpO( $token->comm->regex );
$replacer = function($match) use($template, $token){
   $str = $match[0];
   //_( escape($str) );
   
   if( match('~#[a-fA-F\d]{3,6}|~',$str) ){
      //_( ":::::COLOR" );
      
      return $str;
   } else {
     // _($token->comm->color );
      $pairs = [
         '{col}' => $token->comm->color,
         '{txt}' => $str
      ];
      $replaced = $template->deTemplate($pairs);
      //_( "@@@@@@@@@@@: ", escape($str) );
      
      return $replaced;
   }
};
//_( $re_comm );
$html = $re_comm->replace($replacer, $code);
render( $html, "pre", $styles );



### string
$re_str = new RegExpO( $token->str->regex );
$replacer = function($match) use($template, $token){
   $str = $match[0];
   //_( escape($str) );
   
   if( !match('~</?.+?>~', $str) ){
      pretty( $match ); 
      $pairs = [
         '{col}' => $token->str->color,
         '{txt}' => $str
      ];
      $replaced = $template->deTemplate($pairs);
      //_( "@@@@@@@@@@@: ", escape($str) );
      
      return $replaced;
   } else {
      return $str;
   }
};

$html = $re_str->replace($replacer, $html);
render( $html, "pre", $styles );


/**/


























































