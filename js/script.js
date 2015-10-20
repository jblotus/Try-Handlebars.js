require.config({
	paths: {
		jquery: '../components/jquery/dist/jquery.min',
		hbs402: '../components/handlebars-4.0.2/handlebars',
		hbs303: '../components/handlebars-3.0.3/handlebars',
		hbs200: '../components/handlebars-2.0.0/handlebars',
		hbs130: '../components/handlebars-1.3.0/handlebars',
		mustache213: '../components/mustache-2.1.3/mustache',
		mustache120: '../components/mustache-1.2.0/mustache'
    	},
	shim: {
		hbs130: {
			exports: 'Handlebars'
		}
	}

});

require(["jquery",
	"hbs402",
	"hbs303",
	"hbs200",
	"hbs130",
	"mustache213",
	"mustache120"],
	function($,
		hbs402,
		hbs303,
		hbs200,
		hbs130,
		mustache213,
		mustache120){

	var engine = hbs402;

	engine.registerHelper('getHandlebarsVersion', function() {
		return engine.VERSION;
	});
	
	var handlebars_examples = [
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
			title: 'paths - brackets',
			link: '#paths-4'
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

	var displayExample = function(){
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
			var templateFn, html = "",
				source = $('textarea#source').val(),
				context = eval( '(' + $('textarea#context').val() + ')' );

			//run any helpers code
			eval( $('textarea#helpers').val() );

			if( engine.name === "mustache.js" ){
				html = engine.render( source, context );
			} else {
				templateFn = engine.compile(source);
				html = templateFn(context);
			}
			
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

	var populateExamples = function(){
		var srcExamples = "{{#each this}}<option value=\"{{link}}\">{{title}}</option>{{/each}}";
		var tmplExamples = engine.compile( srcExamples );
		$("#example").html( tmplExamples( handlebars_examples ) );
	};

	var displayHelperTextarea = function( show ){
		$("#helpersWrap").toggleClass('display--none', !show);
	};

	var setEngine = function(){
		engine = eval($(this).val());
	}

	$(function() {
		populateExamples();
		$(document).on('change','#example', displayExample );
		$(document).on('change','#engine', setEngine );
		$(document).on('click', '.compile', compile );
		$('select').trigger('change');
		displayHelperTextarea( true );
	});
});
