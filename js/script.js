(function($) {

    handlebars_samples = {
        '#sample1' : {
        	'context' : '{title: "My New Post", body: "This is my first post!"}'
        },
        
        '#sample2' : {
        	'context' : '{ title: "All about <p> Tags", body: "<p>This is a post about &lt;p&gt; tags</p>" }'
        }
        
    };

	$(function() {
		
		function renderMain(options) {
			var options  = $.extend({
				'source'      : '#main-content', 
				'context'     : {
					'links' : [ 
						{'href' : '#sample1', 'label' : 'sample 1'},
						{'href' : '#sample2', 'label' : 'sample 2'}
					]
				}, 
				'helpers' 	  : '', 
				'output'      : 'Compile Me!',
				'target'      : '#main'
				}, options || {}
			);	
						
			var source   = $(options.source).html();
			var template = Handlebars.compile(source);
			$(options.target).html('').append(template(options.context));
		}
		
		//main
		renderMain();

		
		$('.sample-link').click(function() {
			var id       = $(this).attr('href');
			var template = $(id).html().trim();
			var context  = handlebars_samples[id]['context'];
			
			$('textarea#source').text(template);
			$('textarea#context').text(context);
			$('#compile').click();
			
			return false;
		});
		
		$('textarea').each(function() {
			$(this).bind('focus', function() { 
				//$(this).val('');
				$(this).unbind('focus');
			});
		});
			
		$('input').click(function() {
		try {

			var source   = $('textarea#source').val();
			var template = Handlebars.compile(source);
			
			eval($('textarea#helpers').val());
			var context =  $('textarea#context').val();
			var html    =  template(eval('(' + context + ')'));
			
			//compile main template
			$('#output-window').val(html);
			$('#output-window-html').text(html).html(html);
		} catch (error) {
			console.log(error)
			console.log($('#errors'))
			$('p#errors span').html(error.toString());
		}
		});
	
	});

})(jQuery);