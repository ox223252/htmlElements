function countrySelector ( id, config, language, selector )
{
	let obj = document.getElementById ( id );

	if ( !obj )
	{
		return;
	}

	selector = selector || id;

	let langArray = [];
	let name = 'name_'+Math.random( )+'_langSelector';

	let str = '<div class="flagSelector_popup">';
	for ( let i = 0; i < config.language.length; i++ )
	{
		langArray.push ( config.language[ i ].lang );
		str += '<div><label for="'+selector+'_'+config.langPart+'_'+config.language[ i ].lang+'"><img width=32 height=21 src="'+config.language[ i ].logo+'"></label></div>';
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
				onclick="countrySlectorChangeFlag( \''+selector+'_header\', \''+config.langPart+'\', '+langArray+' , value );" \
				value="'+config.language[ i ].lang+'"';

			if ( config.language[ i ].lang == language )
			{
				str += ' checked';
			}

			str += '><div class="flagDisplay '+config.langPart+config.language[ i ].lang+'" style="top:0;background-image:url('+config.language[ i ].logo+')"></div>';
		}
		
		header = document.createElement( "style" );
		obj.innerHTML = '<style id="'+selector+'_header" type="text/css">'+headerStr+'</style>';
		obj.innerHTML += str;
	}
	else
	{
		for ( let i = 0; i < config.language.length; i++ )
		{
			str += '<div class="flagDisplay '+config.langPart+config.language[ i ].lang+'" style="top:0;background-image:url('+config.language[ i ].logo+')"></div>';
		}
		
		obj.innerHTML = str;
	}
}

function countrySlectorChangeFlag ( id, part, lang, language )
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