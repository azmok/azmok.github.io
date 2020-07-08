;(function( window ){
   
   'use strict';

   //####  add Imgae progress method
   Image.prototype.completedPercentage = 0;
   
   Image.prototype.load = function(url){
        var thisImg = this;
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open('GET', url,true);
        xmlHTTP.responseType = 'arraybuffer';
        xmlHTTP.onload = function(e) {
            var blob = new Blob([this.response]);
            thisImg.src = window.URL.createObjectURL(blob);
        };
        xmlHTTP.onprogress = function(e) {
            thisImg.completedPercentage = parseInt(e.loaded / e.total);
        };
        xmlHTTP.onloadstart = function() {
            thisImg.completedPercentage = 0;
        };
        xmlHTTP.send();
   };
   
   
   let timerId = 0,
   imgArr = [],
   allLoaded = true;
   
   const bar = $$('#bar'),
   barInner = $$('#bar-inner'),
   garally = $$('#garally-container'),
   completedText = $$("#completedText"),
   barH = parseInt(
      getComputedStyle(bar).getPropertyValue("height")
   );
      
   
   
   //_( `noeloadingBarH:: ${noeloadingBarH}` )
   const completedTextAnimation = () => {
      completedText.classList.add("completed");
      setTimeout(()=>{
         completedText.classList.remove("completed");
      }, 2000);
   },
   displayLoadingBar = () => {
      bar.classList.add("visible");
   },
   hideLoadingBar = () => {
      setTimeout(()=> {
         bar.classList.remove("visible");
      }, 2000);
   },
   displayLoadCompleted = function(imgArr){
      // calcu of total loading progress
      const total = imgArr.reduce((acc, curr, i) => {
         if( curr === null){
            return acc;
         } else {
            return acc + curr.completedPercentage;
         }
      }, 0),
      progress = total / imgArr.length,
      progressH = `${progress * barH}px`;
      
      //### LoadingBar
      displayLoadingBar();
      
      //_( progressH )
      barInner.setCss({
         height: progressH
      });
      
      
      if( progress === 1 ){
         clearInterval(timerId);
         completedTextAnimation();
         //### LoadingBar
         hideLoadingBar();
         
         allLoaded = true;
      }
   },
   fetchImage = function(url){
      let xhr = new XMLHttpRequest();
      
      xhr.addEventListener("readystatechange", (e)=>{
         if( xhr.readyState === 4  &&  xhr.status === 200 ){
            
            const res = xhr.response,
            json = JSON.parse( res );
            
            json.forEach((obj, i) => {
               //const src = obj.urls.raw,
               const src = obj.urls.regular,
               img = new Image();
               
               // set src attribute 
               img.load(src);
               img.src = src;
               imgArr[i] = img;
               
               garally.appendChild(img);
            });
            
            // loading progress calcu of one 
            timerId = setInterval( () => {
               displayLoadCompleted( imgArr );
            }, 200);
         }
         
      });
      
      xhr.open("GET", url, true);
      xhr.send();
   };
   
   
   //#####  'fetchImage(url)' when encountering scroll end and all images loaded
   window.on("scroll", function(e){
      const bRect = body.getBoundingClientRect(),
      windowBtm = window.innerHeight,  // y-axis from client's top-left corner: not changing
      bodyBtm = bRect.bottom,          // y-axis form client's top-left corner:: changing 
                                       // accrding to scrolling
                                       
      btmsDistance = bodyBtm - windowBtm;
                                       // === 0 === (bodyBtm - windowBtm) === scrollEnd
                                       
      if ( bodyBtm <= windowBtm  &&  allLoaded ){
         const curUrl = location.href, 
         parentPath = curUrl.substring( 0, curUrl.lastIndexOf("/") ),
         ACCESS_KEY = "YOUR_ACCESS_KEY_ON_UNSPLASH.COM",
         // replace ↑those with your access_key of dev app on unsplash.com
         
         targetUrl = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=5`;
         
         allLoaded = false;
         fetchImage( targetUrl );
      }
   });
})( window );