<?php


require_once "../src/core.php";

use function Autil\_, Autil\match;



$str = "hi, this is";
_( match("/hi/", $str) );