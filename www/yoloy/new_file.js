$(document).ready(function(){
		//当点击（聚合导航）class为an的按钮时，滑出聚合搜索块（class为con2）
	  $(".an").click(function(){
		 // $(".c2-cent").toggle();$(".update").toggle();$(".main-h1").toggle();$(".con").toggle();
	    $(".con2").slideToggle();
		 // $(".con").animate({
		 //       width:'toggle'
		 //     });
	  });
	  // var div=$("div");
	  //     div.animate({height:'300px',opacity:'0.4'},"slow");
	  //     div.animate({width:'300px',opacity:'0.8'},"slow");
	  //     div.animate({height:'100px',opacity:'0.4'},"slow");
	  //     div.animate({width:'100px',opacity:'0.8'},"slow");
	  //   });
	});
	
	function entersearch(event){
	    if (event.keyCode == 13)
	    {
	        text = document.getElementById('text').value;
	        
	        url = 'http://www.baidu.com/s?ie=UTF-8&wd=' + text;
	        
	        window.open(url, '_blank');
	    }
	}
	// 按钮点击触发函数
	// function to(){
	//     var searchValue = document.getElementById("text").value;
	
	//     //window.location.href="http://www.baidu.com/s?ie=UTF-8&wd="+searchValue;
	//    jumpPage(searchValue);
	//    //alert(searchValue);
	// }
		function baidu() {
			text = document.getElementById('text').value;
			
			url = 'http://www.baidu.com/s?ie=UTF-8&wd=' + text;
			
			window.open(url, '_blank');
		}
		function zhihu() {
			text = document.getElementById('text').value;
			
			url = 'https://www.zhihu.com/search?type=content&q=' + text;
			
			window.open(url, '_blank');
		}
		function douban() {
			text = document.getElementById('text').value;
			
			url = 'https://www.douban.com/search?q=' + text;
			
			window.open(url, '_blank');
		}
		function bili() {
			text = document.getElementById('text').value;
			
			url = 'https://search.bilibili.com/all?keyword=' + text;
			
			window.open(url, '_blank');
		}
		function chzh() {
			text = document.getElementById('text').value;
			
			url = 'https://czspp.com/xssearch?q=' + text;
			
			window.open(url, '_blank');
		}
		function xzjs() {
			// text = document.getElementById('text').value;
			
			url = 'https://www.xiaozhongjishu.com/' ;
			
			window.open(url, '_blank');
		}
		function adzh() {
			// text = document.getElementById('text').value;
			
			url = 'https://adzhp.cn/' ;
			
			window.open(url, '_blank');
		}
if( /Android/i.test(navigator.userAgent) ) {
	window.location.href="phone-Page/index-phone.html"
    // document.write("移动")
}else{
	// window.location.href="index.html"
}
 