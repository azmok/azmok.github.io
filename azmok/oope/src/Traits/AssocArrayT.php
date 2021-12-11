<?php

namespace OOPe\Traits;



use function Autil\_, Autil\isAssoc, Autil\_forEach, Autil\isArray, Autil\head, Autil\append, Autil\prepend,  Autil\merge, Autil\concat, Autil\joinWith;

/*--------------
   <<trait>>
   ArrayT
----------------
  
----------------
   + length() : <Num>
   + append ( * ) : <Arr>
   + prepend ( * ) : <Arr>
   + indexOf ( <Mixed> ) : <Int>
   
   + concat ( <Arr> ) : <Arr>
   + mnerge ( <Arr> ) : <Arr>
   + joinWith ( <Str>, <Arr> ) : <Str>
   + map ( <Fn> ) : <Arr>
   + filter ( <Fn> ) : <Arr>
   + reduce ( <Fn> ) : <Mixed>
------------------*/
Trait AssocArrayT{
   
   use ArrayT;

   
}