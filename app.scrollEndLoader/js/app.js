;(function( window ){
   
   'use strict';

   const ImageNewProps = {
      completedPercentage: 0,
      load: function(url){
         const xhr = new XMLHttpRequest();
         
         xhr.addEventListener("progress", (e) => {
            this.completedPercentage = parseInt(e.loaded / e.total);
         });
        
         xhr.open('GET', url, true);
         xhr.send();
      },
   }
   // assign new properties
   Object.assign( Image.prototype, ImageNewProps)
   
   
   let timerId = 0,
	counter = 0,
   allLoaded = true;
   
   const imgArr = [],
   bar = $$('#bar'),
   barInner = $$('#bar-inner'),
   garally = $$('#garally-container'),
   completedText = $$("#completedText"),
   barH = parseInt(
      window.getComputedStyle(bar).getPropertyValue("height")
   ),
   completedTextAnimation = () => {
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
   createImageElement = (obj, i) => {
      const src = obj.urls.regular,
      appName = "myTestApp",
      cardHTML  = `Photo by <a href="https://unsplash.com/@${ obj.user.username }?utm_source=${ appName }&utm_medium=referral">${ obj.user.name }</a> on <a href="https://unsplash.com/?utm_source=${ appName }&utm_medium=referral">Unsplash</a>`,
      cardElm = create("DIV", cardHTML)
         .attr({
            "class": "attribution-card"
         }),
      wrapper = create("DIV", "")
         .attr({
            "class": "img-wrapper"
         }),
      img = new Image();
      
      // scale loading completion
      img.load(src);
      
      // set src attribute 
      img.src = src;
      imgArr[i] = img;
      
      // DOM 
      wrapper.appendChild(img);
      wrapper.appendChild(cardElm);
      garally.appendChild(wrapper);
   },
   fetchImage = function(url){
      let xhr = new XMLHttpRequest();
      
      xhr.addEventListener("readystatechange", (e)=>{
         //_( xhr.readyState, xhr.status )
         if( xhr.readyState === 4  &&  xhr.status === 200 ){
            
            const json = xhr.response;
            
            json.forEach((obj, i) => {
               
               /////   create IMG element and Unsplash Atteibution Card
               createImageElement(obj, i);
               
               /////////////////   END   ///////////////////////////////
               
            });
            
            // loading progress calcu of one 
            timerId = setInterval( () => {
               displayLoadCompleted( imgArr );
            }, 200);
            /**/
         }
         
      });
      
      xhr.responseType = "json";
      xhr.open("GET", url, true);
      xhr.send();
   };
   
   
   //#####  'fetchImage(url)' when encountering scrollEnd and all images loaded
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
         ACCESS_KEY = "0ab7cceda744fc1d6d13d1a9466e2db03d7c99e4393e1907327df50d08038894",
         // replace ↑those with your access_key of dev app on unsplash.com
        
         targetUrl = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=5`;
         
         
         allLoaded = false;
         fetchImage( targetUrl );
      }
   });
})( window );