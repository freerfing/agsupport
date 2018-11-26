$(".headerMenu").mouseenter(function () {
    $(".submenu").hide();
    $(".headerMenu").removeClass("current");
	$(this).find(".submenu").show();
	$(this).addClass("current");
});
    
$(".headerMenu").mouseleave(function () {
	$(this).find(".submenu").hide();
	$(".headerMenu").removeClass("current");
});

$(".submenu").find("li").click(
	function(){
		addIframe($(this).find("a"));
		return false;
	}
);

$("#more_icon").mouseenter(function () {
	$("#more_syetem").show();
});
    
$("#more_icon").mouseleave(function () {
	$("#more_syetem").hide();
});