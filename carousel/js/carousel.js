function carouselJs ( id, src, nbFrames, option = {} )
{
	let carousel = document.getElementById( id );

	if ( !carousel )
	{
		return;
	}

	if ( !option.width &&
		!option.height ||
		isNaN( option.width ) &&
		isNaN( option.height ) )
	{
		carousel.style.width = "100%";
		option.width = carousel.clientWidth;
		option.height = option.width / 3 * 900 / 1600;
		carousel.style.width = option.width+"px";
		carousel.style.height = option.height+"px";
	}
	else if ( !option.height ||
		isNaN( option.height ) )
	{
		option.height = option.width / 3 * 900 / 1600;
		carousel.style.width = option.width+"px";
		carousel.style.height = option.height+"px";
	}
	else if ( !option.width ||
		isNaN( option.width ) )
	{
		option.width = option.height * 3 * 1600 / 900;
		carousel.style.width = option.width+"px";
		carousel.style.height = option.height+"px";
	}

	this.index = 0;
	this.annimated = false
	this.src = [].concat( src );
	this.nbFrames = nbFrames || 100;
	this.timer = null;
	this.continus = true;

	let player = document.createElement( "div" );
	player.classList.add( "carousel_player" );
	carousel.prepend ( player );

	let nav = document.createElement( "div" );
	nav.classList.add( "carousel_navBarre" );
	nav.onclick = ()=>{this.continus = false;}

	// add left arrow and interractions
	let div_left = document.createElement( "div" );
	div_left.classList.add( "carousel_left" );
	let span_left = document.createElement( "span" );
	span_left.id = option.leftId;
	span_left.classList.add( "carousel_left" );
	span_left.innerHTML += option.leftText || '&lt;';
	span_left.onclick = (function( continus, context ){
			return ( ev )=>	{ ev.stopPropagation();context.previous ( ev.target, continus || false ); }
	})(option.leftContinus, this);
	div_left.append( span_left );

	// add right arrow and interractions
	let div_right = document.createElement( "div" );
	div_right.classList.add( "carousel_right" );
	let span_right = document.createElement( "span" );
	span_right.id = option.leftId;
	span_right.classList.add( "carousel_right" );
	span_right.innerHTML += option.leftText || '&gt;';
	span_right.onclick = (function( continus, context ){
			return ( ev )=>	{ ev.stopPropagation();context.next ( ev.target, continus || false ); }
	})(option.rightContinus, this);
	div_right.append( span_right );

	let div_1 = document.createElement( "div" );
	div_1.append( div_left );
	div_1.append( div_right );
	nav.append( div_1 );
	
	carousel.append ( nav );

	for ( let i = 0; i < 3; i++ )
	{
		let img = document.createElement( "img" );
		img.src = this.src[ i % this.src.length ];
		player.append ( img );
	}

	this.previous = function ( el, continus = false, cId = id )
	{
		if ( this.annimated )
		{
			this.continus = false;
			return ( false );
		}
		else
		{
			this.annimated = true;
		}


		// get player element
		let player = document.getElementById( cId ).getElementsByClassName ( "carousel_player" )[ 0 ];

		var numFrame = 0;
		this.continus = continus;
		this.timer = setInterval ( move, 10, {env:this} );

		if ( el )
		{
			el.style.cursor="wait";
		}

		// to store new image
		let img = null;

		function move ( obj )
		{
			if ( numFrame == 0 )
			{
				// get previous index in circular buffer
				obj.env.index = ( obj.env.src.length + obj.env.index - 1 ) % obj.env.src.length;

				// create new image
				img = document.createElement( "img" );
				img.src = obj.env.src[ obj.env.index ];
				img.style.marginLeft = -player.getElementsByTagName( "img" )[ 0 ].width  + "px";

				player.prepend ( img );
			}

			img.style.marginLeft = ( numFrame - obj.env.nbFrames ) * ( img.width / obj.env.nbFrames ) + "px";

			numFrame = ( numFrame + 1 ) % obj.env.nbFrames;

			if ( numFrame == 0 )
			{
				img.style.marginLeft = "";

				let imgs = player.getElementsByTagName ( "img" );

				player.removeChild ( imgs[ imgs.length - 1 ] );
				if ( el )
				{
					el.style.cursor="";
				}

				if ( obj.env.continus == false )
				{
					// stop mvt
					clearInterval ( obj.env.timer );
					obj.env.timer = null;
					obj.env.annimated = false;
				}
			}
		}

		return ( true );
	}

	this.next = function ( el, continus = false, cId = id )
	{
		if ( this.annimated )
		{
			this.continus = false;
			return ( false );
		}
		else
		{
			this.annimated = true;
		}

		// get player element
		let player = document.getElementById( cId ).getElementsByClassName ( "carousel_player" )[ 0 ];

		// to store player image array
		let imgs = null;

		let numFrame = 0;
		this.timer = setInterval ( move, 10, {env:this} );
		this.continus = continus;

		function move ( obj )
		{
			if ( numFrame == 0 )
			{
				// store image
				imgs = player.getElementsByTagName ( "img" );

				// get next local index and global index in circular buffer
				let lI = ( obj.env.index + imgs.length ) % obj.env.src.length;
				obj.env.index = ( obj.env.index + 1 ) % obj.env.src.length;
				
				// create new image
				let img = document.createElement( "img" );
				img.src = obj.env.src[ lI ];

				player.append ( img );
			}

			imgs[ 0 ].style.marginLeft = -( numFrame ) * ( imgs[ 0 ].width / obj.env.nbFrames ) + "px";

			numFrame = ( numFrame + 1 ) % obj.env.nbFrames;

			if ( numFrame == 0 )
			{
				player.removeChild( imgs[ 0 ] );

				if ( !obj.env.continus )
				{
					// stop mvt
					clearInterval ( obj.env.timer );
					obj.env.timer = null;
					obj.env.annimated = false;
				}
			}
		}

		return ( true );
	}
}