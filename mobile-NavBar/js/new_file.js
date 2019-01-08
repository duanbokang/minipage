var myNavBar = {
	init: function() {
		var that = this;
		var btnWidth = $(".mbtn").width();
		$(".mbtn").css("left","-" +(btnWidth + 5) + "px");
		$(".mobile-nav").on("click", function() {
			var isSelect = $(this).prop("data-show");
			console.log(isSelect)
			if(!isSelect) {
				that.show();
				return;
			}
			that.hide();
			return;
		});
		$(".hide-bar").on("click",function(event){
			event.stopPropagation();
			console.log(111);
			$('.hidebar').slideToggle(100);
		})
	},
	hide:function(ele){
		$(".mobile-nav").animate({
			"right": "-100%",
		},300);
		$(".bgwrap").animate({
			"left":"0%",
		},300)
		$(".mobile-nav").prop("data-show",false)
	},
	show:function(){
		$(".mobile-nav").animate({
			"right": "-30%",
		},300);
		$(".bgwrap").animate({
			"left":"-100%",
		},300)
		$(".mobile-nav").prop("data-show",true)
	}
}


$(function() {
	myNavBar.init();
})