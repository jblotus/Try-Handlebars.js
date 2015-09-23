$(function() {
	var CLASS_ACTIVE = 'menu-actions--active',
		MAX_RESULTS = 6,
		$input = $('#search'),
		$menu = $('#searchResults'),
		TEMPLATE = [
			'<li class="menu-actions-item">',
				'<a href="__URL__">',
					'<span class="result-title">__TITLE__</span>',
					'<span class="result-breadcrumb">__CATEGORY__</span>',
				'</a>',
			'</li>',
		].join('');

	function renderListItem( result ) {
		return TEMPLATE
			.replace('__URL__', result.url)
			.replace('__TITLE__', result.title)
			.replace('__CATEGORY__', result.category)
	}

	window.Autocomplete = {
		displayResults: function( data ) {
			if ( data.length < 1 ) return;

			$menu.removeClass(CLASS_ACTIVE);
			$menu.empty();

			$.each(data, function(i, result) {
				if ( i <= MAX_RESULTS ) {
					$menu.append( $(renderListItem(result)) );
				}
			});

			$menu.css('width', $input.css('width'));
			$menu.addClass(CLASS_ACTIVE);
		},
		dismiss: function(e) {
			if ( (!$menu.is(e.target) && !$menu.has(e.target).length) ||  (e.which === C.Keyboard.ESCAPE) ) {
				$menu.removeClass(CLASS_ACTIVE);
				$menu.empty();
			}
		}
	}

});
