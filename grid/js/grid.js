function drowGrid ( event, force )
{
	// event not used
	// force to force grid redrow

	let grids = document.getElementsByClassName( "grid" );

	for ( let i = 0; i < grids.length; i++ )
	{
		let width = grids[ i ].getAttribute( "data-grid-width" );
		let raw = grids[ i ].getElementsByClassName( "grid-raw" );
		let column = Math.floor ( grids[ i ].clientWidth / width );
		let divs = grids[ i ].getElementsByClassName( "grid-column" );

		// if not the correct number of column
		if ( ( divs.length != column ) ||
			( force = true ) );
		{
			// put all data in a div to save normal order
			// if its not already done
			if ( raw.length == 0 )
			{
				let node = document.createElement( "div" );
				node.classList.add( "grid-raw" );
			
				let els = grids[ i ].getElementsByClassName( "grid-content" );

				for ( let j = 0; els.length > 0; j++ )
				{
					node.appendChild( els[ 0 ] );
				}
				grids[ i ].appendChild( node );
				raw = grids[ i ].getElementsByClassName( "grid-raw" );
			}

			// clone elements
			let nodes = raw[ 0 ].cloneNode( true );
			// hidde backup
			raw[ 0 ].style.display = "none";

			// get content of clone
			let els = nodes.getElementsByClassName( "grid-content" );

			// remove olds columns
			for ( let j = ( divs.length - 1 ); j >= 0; j-- )
			{
				grids[ i ].removeChild( divs[ j ] );
			}
			
			// create new columns
			for ( let j = 0; j < column; j++ )
			{
				let node = document.createElement( "div" );
				node.style.maxWidth = width+"px";
				node.id = "div_"+j;
				node.classList.add( "grid-column" );
				grids[ i ].insertBefore( node, grids[ i ].childNodes[ j ] );
			}

			// put conned contents in columns
			for ( let j = 0; els.length > 0; j++ )
			{
				let next = 0;
				for ( let k = 1; k < column; k++ )
				{
					if ( grids[ i ].children[ k ].clientHeight < grids[ i ].children[ next ].clientHeight )
					{
						next = k;
					}
				}
				grids[ i ].children[ next ].appendChild( els[ 0 ] );
			}
		}
	}

	let anchor = location.href.substring(location.href.indexOf("#")+1);

	if ( anchor )
	{
		let el = document.getElementById( anchor );
		if ( el )
		{
			window.scrollTo( 0, el.offsetTop );
		}
	}
}

function changeWidth ( value )
{
	let grids = document.getElementsByClassName( "grid" );

	for ( let i = 0; i < grids.length; i++ )
	{
		let width = grids[ i ].setAttribute( "data-grid-width", value );
	}

	drowGrid( null, true );
}

window.onload = drowGrid;
window.onresize = drowGrid;