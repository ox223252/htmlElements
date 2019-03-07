function countrySelector ( id, config, country, selector )
{
	let obj = document.getElementById ( id );

	if ( !obj )
	{
		return;
	}

	selector = selector || id;

	let stateArray = [];
	let name = 'name_'+Math.random( )+'_stateSelector';

	let str = '<div class="flagSelector_popup">';
	for ( let i = 0; i < config.country.length; i++ )
	{
		stateArray.push ( config.country[ i ].state );
		str += '<div '
		if ( config.country[ i ].style )
		{
			str += 'style="'+config.country[ i ].style+'"';
		}
		str += '><label for="'+selector+'_'+config.statePart+'_'+config.country[ i ].state+'"><img width=32 height=21 src="'+config.country[ i ].logo+'"></label></div>';
	}
	str += '</div>';

	stateArray = JSON.stringify ( stateArray ).replace( /"/g, "'" );
	
	let header = document.getElementById( selector+'_header' );
	
	if ( !header )
	{
		let headerStr = '';

		for ( let i = 0; i < config.country.length; i++ )
		{
			if ( config.country[ i ].state != country )
			{
				headerStr += '.'+config.statePart+config.country[ i ].state+'{display:none} ';
			}


			str += '<input \
				id="'+selector+'_'+config.statePart+'_'+config.country[ i ].state+'" \
				type="radio" \
				name="'+name+'" \
				onclick="countrySlectorChangeFlag( \''+selector+'_header\', \''+config.statePart+'\', '+stateArray+' , value );" \
				value="'+config.country[ i ].state+'"';

			if ( config.country[ i ].state == country )
			{
				str += ' checked';
			}

			str += '><div class="flagDisplay '+config.statePart+config.country[ i ].state+'" style="top:0;background-image:url('+config.country[ i ].logo+')"></div>';
		}
		
		header = document.createElement( "style" );
		obj.innerHTML = '<style id="'+selector+'_header" type="text/css">'+headerStr+'</style>';
		obj.innerHTML += str;
	}
	else
	{
		for ( let i = 0; i < config.country.length; i++ )
		{
			str += '<div class="flagDisplay '+config.statePart+config.country[ i ].state+'" style="top:0;background-image:url('+config.country[ i ].logo+')"></div>';
		}
		
		obj.innerHTML = str;
	}
}

function countrySlectorChangeFlag ( id, part, state, country )
{
	let header = '';
	for ( let i = 0; i < state.length; i++ )
	{
		if ( state[ i ] != country )
		{
			header += '.'+part + state[ i ]+'{display:none} ';
		}
	}
	document.getElementById( id ).innerHTML = header;
}

function languageSelector ( id, config, language, selector )
{
	let obj = document.getElementById ( id );

	if ( !obj )
	{
		return;
	}

	selector = selector || id;

	let langArray = [];
	let name = 'name_'+Math.random( )+'_langSelector';

	let str = '<div class="langSelector_popup">';
	for ( let i = 0; i < config.language.length; i++ )
	{
		langArray.push ( config.language[ i ].lang );
		str += '<div '
		if ( config.language[ i ].style )
		{
			str += 'style="'+config.language[ i ].style+'"';
		}
		str += '><label for="'+selector+'_'+config.langPart+'_'+config.language[ i ].lang+'">'+config.language[ i ].text+'</label></div>'
	}
	str += '</div>';

	langArray = JSON.stringify ( langArray ).replace( /"/g, "'" );
	
	let header = document.getElementById( selector+'_header' );
	
	if ( !header )
	{
		let headerStr = '';

		for ( let i = 0; i < config.language.length; i++ )
		{
			if ( config.language[ i ].lang != language )
			{
				headerStr += '.'+config.langPart+config.language[ i ].lang+'{display:none} ';
			}


			str += '<input \
				id="'+selector+'_'+config.langPart+'_'+config.language[ i ].lang+'" \
				type="radio" \
				name="'+name+'" \
				onclick="languageSlectorChangeText( \''+selector+'_header\', \''+config.langPart+'\', '+langArray+' , value );" \
				value="'+config.language[ i ].lang+'"';

			if ( config.language[ i ].lang == language )
			{
				str += ' checked';
			}

			str += '><div class="langDisplay '+config.langPart+config.language[ i ].lang+'" style="top:0;">'+config.language[ i ].text+'</div>';
		}
		
		header = document.createElement( "style" );
		obj.innerHTML = '<style id="'+selector+'_header" type="text/css">'+headerStr+'</style>';
		obj.innerHTML += str;
	}
	else
	{
		for ( let i = 0; i < config.language.length; i++ )
		{
			str += '<div class="langDisplay '+config.langPart+config.language[ i ].lang+'" style="top:0;">'+config.language[ i ].text+'</div>';
		}
		
		obj.innerHTML = str;
	}
}

function languageSlectorChangeText ( id, part, lang, language )
{
	let header = '';
	for ( let i = 0; i < lang.length; i++ )
	{
		if ( lang[ i ] != language )
		{
			header += '.'+part + lang[ i ]+'{display:none} ';
		}
	}
	document.getElementById( id ).innerHTML = header;
}