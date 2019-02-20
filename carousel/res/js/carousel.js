function carouselJs ( id, src, nbFrames )
{
	this.index = 0;
	this.annimated = false
	this.src = [].concat( src );
	this.nbFrames = nbFrames || 100;
	this.timer = null;
	this.continus = true;

	let player = document.createElement( "div" );
	player.classList.add( "player" );
	document.getElementById( id ).prepend ( player );

	console.log( this.nbFrames );

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
			return ( false );
		}
		else
		{
			this.annimated = true;
		}


		// get player element
		let player = document.getElementById( cId ).getElementsByClassName ( "player" )[ 0 ];

		var numFrame = 0;
		this.timer = setInterval ( move, 1, {env:this, player:player} );
		this.continus = continus;

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

	this.next = function ( el, continus = false, cId = id )
	{
		if ( this.annimated )
		{
			return ( false );
		}
		else
		{
			this.annimated = true;
		}

		// get player element
		let player = document.getElementById( cId ).getElementsByClassName ( "player" )[ 0 ];

		// to store player image array
		let imgs = null;

		let numFrame = 0;
		this.timer = setInterval ( move, 1, {env:this, player:player} );
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