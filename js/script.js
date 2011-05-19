(function($) {

	$(function() {
		
		$('textarea').each(function() {
			$(this).bind('focus', function() { 
				//$(this).val('');
				$(this).unbind('focus');
			});
		});
			
		$('input').click(function() {
		try {

			var source = $('textarea#source').val();
			var template = Handlebars.compile(source);
			
			eval($('textarea#helpers').val());
			var context =  $('textarea#context').val();
			var html    =  template(eval('(' + context + ')'));
			
			$('textarea#output').html(html);
			} catch (error) {
				console.log(error);
			}
		});
	
	});

})(jQuery);