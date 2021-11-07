$(".toggle").hover(function(){
    $('.overlay').css({"visibility": "visible","opacity":"1"});
    }, function(){
    $('.overlay').css({"visibility": "hidden","opacity":"0"});
  });

// $(".product").hover(function(){
//     $(this).parent().css("overflow", "visible");
//     }, function(){
//     $(this).parent().css("overflow", "hidden");
//   });

var btnNext=$('.buttons b.right'),
    btnLeft=$('.buttons b.left'),
    slides=$('.slides ul li'),
    currentSlideIndex=0,
    slidesLength=slides.length,
    status='rest'
    
    function Next() {
    	if(status=='run'){return false;}
        status='run'
        var count=0;
        var elementCurrent=slides[currentSlideIndex];
        //Tim phan tu tiep theo
        if(currentSlideIndex<slidesLength-1)
            currentSlideIndex++;
        else
            currentSlideIndex=0;
        var elementNext=slides[currentSlideIndex]
        elementCurrent.addEventListener("webkitAnimationEnd",function () {
            this.classList.remove('active');
            this.classList.remove('nextDisappear');
            count++;
            if (count==2) {status='rest';}
        })
        elementNext.addEventListener("webkitAnimationEnd",function () {
            this.classList.remove('nextAppear');
            this.classList.add('active');
            count++;
            if (count==2) {status='rest';}
        })
        elementCurrent.classList.add('nextDisappear')
        elementNext.classList.add('nextAppear')
    }
    btnNext.click(Next)
    function Back() {
    	if(status=='run'){return false;}
        status='run'
        var count=0;
        var elementCurrent=slides[currentSlideIndex]
        if(currentSlideIndex>0)
            currentSlideIndex--;
        else
            currentSlideIndex=slidesLength-1;
        var elementNext=slides[currentSlideIndex]
        elementCurrent.addEventListener("webkitAnimationEnd",function () {
            this.classList.remove('active');
            this.classList.remove('prevDisappear');
            count++;
            if (count==2) {status='rest';}
        })
        elementNext.addEventListener("webkitAnimationEnd",function () {
            this.classList.remove('prevAppear');
            this.classList.add('active');
            count++;
            if (count==2) {status='rest';}
        })
        elementCurrent.classList.add('prevDisappear')
        elementNext.classList.add('prevAppear')
    }
    btnLeft.click(Back)
setInterval(Next,5000)