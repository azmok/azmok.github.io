<?php


require_once $_SERVER['DOCUMENT_ROOT']  ."/__init__.php";

use function Autil\_, Autil\type, Autil\getOrCreateDOMDoc, Autil\unescape;
use OOPe\DOMDoc, OOPe\DOMElm;



$str1 = <<<'DOC'
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan congue nunc, facilisis varius orci commodo eu. Morbi commodo bibendum dui non laoreet. Suspendisse tristique velit volutpat pharetra imperdiet. Praesent eget aliquet sem. Etiam non mi sed enim sodales volutpat nec sit amet eros. Donec interdum, mauris et egestas eleifend, magna odio malesuada lorem, sed sodales mauris lacus tristique turpis. Ut ut malesuada tellus. Fusce ut quam et elit egestas varius quis vitae nisl. Mauris vel urna purus. Quisque a ligula mi. Duis ac metus diam. Praesent nec ullamcorper ante, quis viverra est.
DOC;




$doc = getOrCreateDOMDoc();

$doc->create("h1")
   ->text("This is DOC, DOMElm class demo")
   ->attr("class", "alert alert-info")
   ->appendTo('body'); /**/

$doc->create("DIV")
   ->text($str1)
   ->attr("class", "container text-center")
   ->appendTo('body'); /**/

$doc->create("DIV")
   ->text("　")
   ->attr("class", "container text-center")
   ->appendTo('body'); /**/

$doc->create("DIV")
   ->text($str1)
   ->attr("class", "container text-center")
   ->appendTo('body'); /**/

$doc->render();





   

   


   
















