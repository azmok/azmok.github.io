<?php


// include("getCodeBlksInFile.php");



require_once $_SERVER['DOCUMENT_ROOT']  ."/__init__.php";
use function Autil\render, Autil\_, Autil\type;

use \OOPe\StringO;
use \OOPe\RegExpO;
use \OOPe\ArrayO;
use \OOPe\AssocArrayO;


require_once "getCodeBlksInFile.php";


#<<< (1) Strings
######(1)  Strings
$str = new StringO("this is");

####  foreach() of 'Object'
foreach( $str as $key=>$val){
   _( $key, $val );
}
/**/
####  arrayAccesss of 'Object'
_( $str ); // "this is"

_( type($str) ); // [Object]
//_( $str[0] );
$str[0] = "@";
_( $str ); // "@his is"
/**/
#<<<




#<<< (2) RegExpO
######(2)  RegExpO
$re = new RegExpO('#is#gi');
_( $re->valueOf() );
_( $re->pattern() );
_( $re->flags() );
$re->setFlags('mui');
#<<<






#<<< (3) ArrayO
######(3)  ArrayO
$arr = new ArrayO( [1,2,3] );
foreach($arr as $key=>$val){
   _( $key, $val);
}

_( $arr ); 
#<<<



render("AssocArrayO", "h4", BS_TITLE);

#<<< (4) AssocArrayO
######(4) AssocArrayO
#### flat assoc
$assoc1 = [
   "id" => "001",
   "name" => "Beji",
];

render("foreach()", "p", BS_TITLE);
## foreach()
foreach($assoc1 as $key=>$val){
   _( "foreach >>>　　", $key, " :: ", $val );
}
#<<<





render("2d assoc", "p", BS_TITLE);

#<<<< 2d assoc
#### 2d assoc
$assoc2d = [
   "name" => "Goku",
   "sizes" => [
      "weight" => "100kg",
      "talls" => "190cm",
   ],
];

$assoc2 = new AssocArrayO( $assoc2d );
_( $assoc2 );
_("");

foreach( $assoc2 as $key=>$val){
   _( "foreach >>>　　", type($key) ." $key","　:　", type($val) ." $val" );
}
#<<<<


/**/

injectCodeBlocks(__FILE__);















