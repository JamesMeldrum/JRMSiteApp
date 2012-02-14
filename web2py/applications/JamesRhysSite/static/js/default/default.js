$(document).ready(function(){
	slothinit(); // Sloth
//	alert("Derp");
	handleTabClick();
	handleIconMouseOver();
	handleEmailClick();
});

// Globals
var rollback_interval = 0

function handleEmailClick(){
	$('div.JR_media_item#email').bind('click',rolloutEmail);
}

function rolloutEmail(){
	$('div.JR_media_item#email').unbind('click',rolloutEmail);
	$('div.JR_media_item_emailrollout').css('display','block')
	$('div.JR_media_item_emailrollout').animate({
		opacity:1.0
	},1000)
	
	rollback_interval = window.setInterval("rollbackEmail()",5000)
}

function rollbackEmail(){
	
	$('div.JR_media_item_emailrollout').animate({
		opacity:0.0
	},1000,function(){
		$('div.JR_media_item_emailrollout').css('display','none')
		$('div.JR_media_item#email').bind('click',rolloutEmail);
		window.clearInterval(rollback_interval)
	})
}

function handleIconMouseOver(){
	// When user mouses over the icon, 
	$('div.JR_media_item').mouseenter(mousedOver);
	$('div.JR_media_item').mouseleave(mousedOut);
}

function mousedOver(){
	var icon_id = $(this).attr('id');
	
	$('div.JR_media_item_icon#'+icon_id).animate({
		opacity:1.0
	},200);
	$('div.JR_media_item_text#'+icon_id).animate({
		opacity:0.0
	},200, function(){
	});
	
}

function mousedOut(){
	var icon_id = $(this).attr('id');
	$('div.JR_media_item_icon#'+icon_id).animate({
		opacity:0.0
	},200);
	$('div.JR_media_item_text#'+icon_id).animate({
		opacity:1.0
	},200);
}

function handleTabClick(){
	$('div.JR_footer_button').click(function(event){
		var selected_tab = $(this).attr('id')
		scroll_to_selected(event,selected_tab);
		adjust_selected_style(event,selected_tab);
	});
}

function scroll_to_selected(event,selected_tab){
	var selected_tab_start =document.getElementById(selected_tab).offsetTop;
	$('body,html').animate({
		scrollTop:selected_tab_start
	},800);
}

function adjust_selected_style(event,selected_tab){
	$('div.JR_footer_button#'+selected_tab).parent().children().each(function(){
		if( $(this).hasClass('JR_footer_button_active')){
			$(this).removeClass('JR_footer_button_active');
		}
		if( $(this).attr('id') == selected_tab){
			$(this).addClass('JR_footer_button_active');
		}
	});
}
