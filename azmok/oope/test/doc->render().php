<?php


require_once $_SERVER['DOCUMENT_ROOT']  ."/__init__.php";

use function Autil\_, Autil\type, Autil\getOrCreateDOMDOC;
use OOPe\DOMDoc, OOPe\DOMElm;




$str = <<<'DOC'

<?php

require "demo.php";

echo "hi";
$a = "Woo!";
DOC;


# check if '$doc' was previously defined or not 
$doc = getOrCreateDOMDOC();

# create code block
$pre = $doc
   ->create("pre")
   ->appendTo('body');

$code = $doc
   ->create("code")
   ->text($str)
   ->attr("class", "language-php")
   ->appendTo($pre);


$doc->render();









   
















