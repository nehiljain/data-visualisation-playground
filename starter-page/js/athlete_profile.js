/* this javascript should run after the visualisations are created */


// $(document).ready(function()
// {
// 	alert('Hello World');
// });



$(document).ready(function() {
	console.log('Our JS is ready');
	
	$('.category_tile').click(function() {
		var clickedClass;
		clickedClass = $(this).attr('class').toString().split(" ")[1];
    	console.log(clickedClass);
    	$("div.bar").fadeTo(0, 0.4);
    	$("div."+clickedClass+".bar").fadeTo('slow', 1.0);
    	
	});
});
