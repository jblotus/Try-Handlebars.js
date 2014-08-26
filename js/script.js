(function($) {
	
     var handlebars_samples = [
    	{
    		title : 'getting started',    		
    		links : [
    			{ href : '#getting-started-1', label:  'Sample 1' },    			
    			{ href : '#getting-started-2', label:  'Sample 2' }
    		]
    	},
    	
		{
    		title : 'block expressions',    		
    		links : [
    			{ href : '#block-expressions-1', label:  'Sample 3' }
    		]
    	},
		
		{
    		title : 'built in block helpers',    		
    		links : [
    			{ href : '#built-in-block-helpers-1', label:  'each' },
    			{ href : '#built-in-block-helpers-2', label:  'if (empty context)' },
    			{ href : '#built-in-block-helpers-3', label:  'if (truthy context)' },
    			{ href : '#built-in-block-helpers-4', label:  'if/else' },
    			{ href : '#built-in-block-helpers-5', label:  'unless (falsy)' },
    			{ href : '#built-in-block-helpers-6', label:  'unless (truthy)' }
    		]
    	},
    	
    	{
    		title : 'paths',    		
    		links : [
    			{ href : '#paths-1', label:  'simple/mustache' },
    			{ href : '#paths-2', label:  'nested' },
    			{ href : '#paths-3', label:  '../' }
    		]
    	},
    	
    	{
    		title : 'helpers',    		
    		links : [
    			{ href : '#helpers-1', label:  'example 1' },
    			{ href : '#helpers-2', label:  'example 2 (this context)' }
    		]
    	}
    ];

	$(function() {
  
    Handlebars.registerHelper('getHandlebarsVersion', function() {
      return Handlebars.VERSION;
    });
		
		function renderMain(context) {
			var options  = {
				'source'      : '#main-content', 
				'context'     : {
					source   : '{{foo}}',
					context  : '{ "foo" : "bar" }',
					samples  : handlebars_samples
				}, 
				'helpers' 	  : '', 
				'output'      : 'Compile Me!',
				'target'      : '#main'
			}
			
			options.context = $.extend(options.context, context || {});			
			
			var source   = $(options.source).html();
			var template = Handlebars.compile(source);
			$(options.target).html('').append(template(options.context));
		}
		
		//main
		renderMain();
		
		$('.sample-link').live('click', function() {
			var id       = $(this).attr('href');
			var template = $.trim($(id).html());
			var context  = function() {
				var context =  $.trim($(id + '-context').html());				
				return context ? context : '{}';
			}
			var helpers  = function() {
				var helpers =  $.trim($(id + '-helpers').html());
				return helpers ? helpers : null;
			}
			$('textarea#source').text(template);
			$('textarea#context').text(context);
			
			renderMain({
				'source'  : template,
				'context' : context,
				'helpers' : helpers
				});
			$('.compile').click();
			
			return false;
		});

					
		$('.compile').live('click', function() {
			
			try {
				var source   = $('textarea#source').val();
				var template = Handlebars.compile(source);
				
				//run any helpers code
				var helpers = eval($('textarea#helpers').val());
				var context =  $('textarea#context').val();
				var html    =  template(eval('(' + context + ')'));
				
				//compile main template
				$('#output-window').val(html);
				$('#output-window-html').text(html).html(html);
				$('p#errors span').empty();
			} catch (error) {
				$('#output-window').val('');
				$('#output-window-html').empty();
				$('p#errors span').html('Error(s): '+ error.toString());
			}
		});
	
	});

})(jQuery);