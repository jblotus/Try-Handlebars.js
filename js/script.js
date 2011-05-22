(function($) {
	
	 var sample_contexts = {
		 '#getting-started-1'   : { title: "My New Post", body: "This is my first post!"},
		 '#getting-started-2'   : { title: "All about <p> Tags", body: "<p>This is a post about &lt;p&gt; tags</p>" },
		 '#block-expressions-1' : {
			  people : [
			    { firstName: "Yehuda", lastName: "Katz" },
				{ firstName: "Carl", lastName: "Lerche" },
				{ firstName: "Alan", lastName: "Johnson" }
			  ]
			},
		 '#built-in-block-helpers-1' : {
			  people: [
			    "Yehuda Katz",
			    "Alan Johnson",
			    "Charles Jolley"
			  ]
			},
		 '#built-in-block-helpers-2' : {},
		 '#built-in-block-helpers-3' : { author: true,  firstName: 'eric', lastName: 'blair' },
		 '#built-in-block-helpers-4' : {},
		 '#built-in-block-helpers-5' : {},
		 '#built-in-block-helpers-6' : { license: 'true' },
		 '#paths-1' : { name: 'John Denver' },
		 '#paths-2' : {
			  title: "My First Blog Post!",
			  author: {
			    id: 47,
			    name: "Yehuda Katz"
			  },
			  body: "My first post. Wheeeee!"
			}
		};	 
	 
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
    			{ href : '#paths-2', label:  'nested' }
    		]
    	},
    ];

	$(function() {
		
		function renderMain(context) {
			var options  = {
				'source'      : '#main-content', 
				'context'     : {
					'source'   : '{{foo}}',
					'context'  : "{{ 'foo' : 'bar' }}",					
					'samples'  : handlebars_samples,
				}, 
				'helpers' 	  : '', 
				'output'      : 'Compile Me!',
				'target'      : '#main'
			}
			
			options.context = $.extend(options.context, context || {});
			
			//convert context.context into a json string
			options.context.context = JSON.stringify(options.context.context);
			
			var source   = $(options.source).html();
			var template = Handlebars.compile(source);
			$(options.target).html('').append(template(options.context));
		}
		
		//main
		renderMain();
		
		$('.sample-link').live('click', function() {
			var id       = $(this).attr('href');
			var template = $(id).html().trim();
			var context  = sample_contexts[id];
			var helpers  = function() {
				return $(id + '-helper').html();
			}
			
			$('textarea#source').text(template);
			$('textarea#context').text(context);
			
			renderMain({
				'source'  : template,
				'context' : context,
				'helpers' : helpers
				});
			$('#compile').click();
			
			return false;
		});

					
		$('#compile').live('click', function() {
			
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
			} catch (error) {
				$('p#errors span').html(error.toString());
			}
		});
	
	});

})(jQuery);