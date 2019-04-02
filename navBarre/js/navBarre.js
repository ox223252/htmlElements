function initMenuBarre ( id, config )
{
	let menu = '';
	menu += '<span id="'+id+'_expand" class="navBarreExpander">&#9776;</span>';
	menu += '<div id="'+id+'_links" class="navBarreLinks">';

	for ( i = 0; i < config.length; i++ )
	{
		menu += '<input type="checkbox" name="'+id+'_input[]"/>'+config[ i ].el;
	}

	document.getElementById( id ).innerHTML = menu;

	let expander = document.getElementById( id+'_expand' );
	let links = document.getElementById( id+'_links' );
	
	expander.style.order = 1;
	expander.addEventListener ( 'click', (ev) => {
		console.log ( "coucou" );
		Array.from( ev.target.parentNode.getElementsByTagName( 'input' ) ).forEach( (el) => {
			el.checked = !el.checked;
		});
	});

	
	if ( isTrunced( links ) )
	{
		expander.style.display = "";
	}
	else
	{
		expander.style.display = "none";
	}

	window.addEventListener ( "resize", (e) => {
		if ( isTrunced( links ) )
		{
			expander.style.display = "";
		}
		else
		{
			expander.style.display = "none";
		}
	})



	function isTrunced ( e )
	{
		return e.offsetWidth < e.scrollWidth;
	}
}