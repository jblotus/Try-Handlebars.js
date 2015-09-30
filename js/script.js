require.config({
    paths: {
        jquery: '../components/jquery/dist/jquery.min'
    }
});

require(["jquery"], function($){

	Handlebars.registerHelper('getHandlebarsVersion', function() {
		return Handlebars.VERSION;
	});
	
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
		}
	];

	var displaySample = function(){
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

		displayHelperTextarea( helpers() ? true : false );
		$('textarea#helpers').val(helpers);
		$('.compile').click();
	};

	var compile = function(){
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
	};

	var populateSamples = function(){
		var srcSamples = "{{#each this}}<option value=\"{{link}}\">{{title}}</option>{{/each}}";
		var tmplSamples = Handlebars.compile( srcSamples );
		$("#samples").html( tmplSamples( handlebars_samples ) );
	};

	var populateVersion = function(){
		var srcVersion = "Handlebars v{{getHandlebarsVersion}}";
		var tmplVersion = Handlebars.compile( srcVersion );
		$("#version").html( tmplVersion() );
	};

	var displayHelperTextarea = function( show ){
		$("#helpersWrap").toggleClass('display--none', !show);
	};

	$(function() {
		populateSamples();
		populateVersion();
		$(document).on('change','select', displaySample );
		$(document).on('click', '.compile', compile );
		$('select').trigger('change');
		displayHelperTextarea( true );
	});
});
