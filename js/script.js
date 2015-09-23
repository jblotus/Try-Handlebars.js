require.config({
    paths: {
        jquery: '../components/jquery/dist/jquery.min'
    }
});

require(["jquery"], function($){
	
     var handlebars_samples = [
    	{
    		title : 'handlebar expression',    		
    		link : '#getting-started-1'
    	},
    	{
    		title : 'expression with raw html',    		
    		link : '#getting-started-2'
    	},
	{
    		title : 'block expressions',    		
    		link : '#block-expressions-1'
    	},
	{
    		title : 'each block helper',    		
    		link : '#built-in-block-helpers-1' //'#block-expressions-1'
    	},
	{
    		title : 'if block helper (empty context)',    		
    		link : '#built-in-block-helpers-2'
    	},
	{
    		title : 'if block helper (truthy context)',    		
    		link : '#built-in-block-helpers-3'
    	},
	{
    		title : 'if/else',    		
    		link : '#built-in-block-helpers-4' //'#block-expressions-4'
    	},
	{
		title: 'unless (falsy)',
		link: '#built-in-block-helpers-5'
	},
	{
		title: 'unless (truthy)',
		link: '#built-in-block-helpers-6'
	},
	{
		title: 'paths - simple/mustache',
		link: '#paths-1'
	},
	{
		title: 'paths - nested',
		link: '#paths-2'
	},
	{
		title: 'paths - ../',
		link: '#paths-3'
	},
	{
		title: 'helpers',
		link: '#helpers-1'
	},
	{
		title: 'helpers (this context)',
		link: '#helpers-2'
	},
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

		$(document).on('change','select', function(){
			var id = $(this).val();
			var template = $.trim($(id).html());
			
			var context  = function() {
				var context =  $.trim($(id + '-context').html());				
				return context ? context : '{}';
			}
			var helpers  = function() {
				var helpers =  $.trim($(id + '-helpers').html());
				return helpers ? helpers : null;
			}
			$('textarea#source').val(template);
			$('textarea#context').val(context);
			$('textarea#helpers').parent().toggleClass('display--none', helpers() ? false : true);
			$('textarea#helpers').val(helpers);
			$('.compile').click();
			
		});

					
		$(document).on('click', '.compile', function() {
			
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
				$('p.errors span').empty();
			} catch (error) {
				$('#output-window').val('');
				$('#output-window-html').empty();
				$('p.errors span').html('Error(s): '+ error.toString());
			}
		});
	
	});
});
