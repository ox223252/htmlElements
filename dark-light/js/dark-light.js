function createSwitchs ( className, callback, checked = false )
{
	Array.from( document.getElementsByClassName( className ) ).forEach( (el) => {
		let str = '<label class="switch"><input id="lightSelector" type="checkbox" onchange="';
		if ( checked )
		{
			str += 'checked ';
		}

		str += '((flag,group)=>{Array.from(document.getElementsByClassName( \''+className+'\' )).forEach((el)=>{el.getElementsByTagName(\'input\')[0].checked = flag});('+callback+')(flag,\''+className+'\')})(this.checked,\''+className+'\');';

		str+= '" /><span class="slider round"></span></label>';

		el.innerHTML = str;
	});
}

function createDLSwitchStyle ( className, lightStyle, darkStyle, light = true )
{
	let styleDiv = document.createElement('style');
	styleDiv.id = className+'_head';
	document.head.appendChild( styleDiv );

	Array.from( document.getElementsByClassName( className ) ).forEach( (el) => {
		console.log( el )
		let str = '<label class="switch"><input id="lightSelector" type="checkbox" ';
		if ( light )
		{
			str += 'checked ';
		}
		str += 'onchange="'
		str += '((flag,group)=>{Array.from(document.getElementsByClassName( \''+className+'\' )).forEach((el)=>{el.getElementsByTagName(\'input\')[0].checked = flag});document.getElementById ( \''+className+'_head\' ).innerHTML = (flag)?\''+lightStyle+'\':\''+darkStyle+'\';})(this.checked,\''+className+'\');';
		str+= '" /><span class="slider round"></span></label>';

		el.innerHTML = str;
	});

	document.getElementById ( className+'_head' ).innerHTML = (light)?lightStyle:darkStyle;
}
