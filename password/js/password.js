class password {
	constructor ( id, config )
	{
		if ( !id )
		{
			return ( undefined );
		}
		
		this.id = id;
		this.ruleContainer = [];
		this.validity = false;
		this.config = Object.assign( {
			sizeMin: 8,
			sizeMax: 12,
			class:{
				input:"passInput",
				selector:"passSelector",
				mainRules:"passMainRules",
				rule:"passRule"
			},
			type:{
				mainRules:'ul',
				rule:'li'
			},
			rules: [
				{
					type:"number",
					numberMinOfBlock:1,
					numberMaxOfBlock:0,
					minBlockSize:1,
					maxBlockSize:0,
					regex:/\d+/g
				},
				{
					type:"lower",
					numberMinOfBlock:1,
					numberMaxOfBlock:0,
					minBlockSize:1,
					maxBlockSize:0,
					regex:/[a-z]+/g
				},
				{
					type:"UPPER",
					numberMinOfBlock:1,
					numberMaxOfBlock:0,
					minBlockSize:1,
					maxBlockSize:0,
					regex:/[A-Z]+/g
				},
				{
					type:"Symbols  (@!.?/&~#{[|\\]})",
					numberMinOfBlock:1,
					numberMaxOfBlock:0,
					minBlockSize:1,
					maxBlockSize:0,
					regex:/[@!.?/&~#{[|\]}]+/g
				},
			]}, config );
		this.mainDiv = document.getElementById( this.id );

		if ( !this.mainDiv )
		{
			return ( undefined );
		}

		this.styleDiv = document.createElement( 'style' );
		this.styleDiv.innerHTML = '.'+this.config.class.selector+' ~ input[type=text]{display: none;} \
			.'+this.config.class.selector+':checked ~ input[type=text]{display: inline-block;} \
			.'+this.config.class.selector+' ~ input[type=password]{display: inline-block;} \
			.'+this.config.class.selector+':checked ~ input[type=password]{display: none;}';
		this.mainDiv.append ( this.styleDiv );

		this.inputSelector = document.createElement( 'input' );
		this.inputSelector.type = "checkbox";
		this.inputSelector.checked = true;
		this.inputSelector.classList.add ( this.config.class.selector );
		this.mainDiv.append ( this.inputSelector );

		this.inputPass = document.createElement( 'input' );
		this.inputPass.type = "password";
		this.inputPass.classList.add ( this.config.class.input );
		this.inputPass.onkeyup = (e)=>{this.synchronizeAndVerify(e)};
		this.inputPass.onchange = (e)=>{this.synchronizeAndVerify(e)};
		this.mainDiv.append ( this.inputPass );

		this.inputClear = document.createElement( 'input' );
		this.inputClear.type = "text";
		this.inputClear.classList.add ( this.config.class.input );
		this.inputClear.onkeyup = (e)=>{this.synchronizeAndVerify(e)};
		this.inputClear.onchange = (e)=>{this.synchronizeAndVerify(e)};
		this.mainDiv.append ( this.inputClear );

		let rulesMainContainer = document.createElement( this.config.type.mainRules );
		rulesMainContainer.classList.add ( this.config.class.mainRules );
		rulesMainContainer.style.display = "flex";
		rulesMainContainer.style.flexDirection = "column";
		
		if ( ( this.config.sizeMin > 0 ) ||
			( this.config.sizeMax > 0 ) )
		{ // main password size
			this.ruleContainerSize = document.createElement( this.config.type.rule );
			this.ruleContainerSize.classList.add ( this.config.class.rule );
			this.ruleContainerSize.style.order = 0;
			
			if ( ( this.config.sizeMin > 0 ) &&
				( this.config.sizeMax != this.config.sizeMin ) )
			{
				if ( this.config.sizeMax >= this.config.sizeMin )
				{
					this.ruleContainerSize.innerHTML = "<span>password size must be between "+this.config.sizeMin+" and "+this.config.sizeMax+" caracter</span>";
				}
				else
				{
					this.ruleContainerSize.innerHTML = "<span>password minimum size is "+this.config.sizeMin+"</span>";
				}
			}
			else if ( this.config.sizeMax & this.config.sizeMin )
			{
				this.ruleContainerSize.innerHTML = "<span>password size must be "+this.config.sizeMin+"</span>";
			}
			else if ( this.config.sizeMax >= this.config.sizeMin )
			{
				this.ruleContainerSize.innerHTML += "<span>password size is up to "+this.config.sizeMax+"</span>";
			}

			rulesMainContainer.append ( this.ruleContainerSize );
		}
		
		if ( !this.config.rules )
		{ // if no mre rule
			return;
		}

		for ( let i = 0; i < this.config.rules.length; i++ )
		{ // for each rule we will create 
			this.ruleContainer[ i ] = document.createElement( this.config.type.rule );
			this.ruleContainer[ i ].classList.add ( this.config.class.rule );
			this.ruleContainer[ i ].style.order = Math.floor( Math.random( ) * 65536 );
			
			if ( ( this.config.rules[ i ].numberMinOfBlock > 0 ) &&
				( this.config.rules[ i ].numberMaxOfBlock != this.config.rules[ i ].numberMinOfBlock ) )
			{
				if ( this.config.rules[ i ].numberMaxOfBlock >= this.config.rules[ i ].numberMinOfBlock )
				{
					this.ruleContainer[ i ].innerHTML = "<span>password must contain between "+this.config.rules[ i ].numberMinOfBlock+" and "+this.config.rules[ i ].numberMaxOfBlock+" block of "+this.config.rules[ i ].type+"</sapn>";
				}
				else
				{
					this.ruleContainer[ i ].innerHTML = "<span>password must contain at least "+this.config.rules[ i ].numberMinOfBlock+" bock of "+this.config.rules[ i ].type+"</sapn>";
				}
			}
			else if ( this.config.rules[ i ].numberMaxOfBlock & this.config.rules[ i ].numberMinOfBlock )
			{
				this.ruleContainer[ i ].innerHTML = "<span>password must contain "+this.config.rules[ i ].numberMinOfBlock +" bock of "+this.config.rules[ i ].type+"</sapn>";
			}
			else if ( this.config.rules[ i ].numberMaxOfBlock >= this.config.rules[ i ].numberMinOfBlock )
			{
				this.ruleContainer[ i ].innerHTML += "<span>password can caontain up to "+this.config.rules[ i ].numberMaxOfBlock +" bock of "+this.config.rules[ i ].type+"</sapn>";
			}

			if ( this.config.rules[ i ].numberMinOfBlock || 
				this.config.rules[ i ].numberMaxOfBlock )
			{
				if ( ( this.config.rules[ i ].minBlockSize > 0 ) &&
					( this.config.rules[ i ].maxBlockSize != this.config.rules[ i ].minBlockSize ) )
				{
					if ( this.config.rules[ i ].maxBlockSize >= this.config.rules[ i ].minBlockSize )
					{
						this.ruleContainer[ i ].innerHTML += "<br><span>each bock of number must contain between "+this.config.rules[ i ].minBlockSize+" and "+this.config.rules[ i ].maxBlockSize+" "+this.config.rules[ i ].type+"</span>";
					}
					else
					{
						this.ruleContainer[ i ].innerHTML += "<br><span>each bock of number must contain at least "+this.config.rules[ i ].minBlockSize+" "+this.config.rules[ i ].type+"</span>";
					}
				}
				else if ( this.config.rules[ i ].maxBlockSize & this.config.rules[ i ].minBlockSize )
				{
					this.ruleContainer[ i ].innerHTML += "<br><span>each bock of number must contain "+this.config.rules[ i ].minBlockSize +" "+this.config.rules[ i ].type+"</span>";
				}
				else if ( this.config.rules[ i ].maxBlockSize >= this.config.rules[ i ].minBlockSize )
				{
					this.ruleContainer[ i ].innerHTML += "<br><span>each bock of number must contain up to "+this.config.rules[ i ].maxBlockSize +" "+this.config.rules[ i ].type+"</span>";
				}
			}

			rulesMainContainer.append ( this.ruleContainer[ i ] );
		}

		this.mainDiv.prepend ( rulesMainContainer );
	}

	synchronizeAndVerify ( ev )
	{
		ev.preventDefault( );
		this.inputPass.value=ev.target.value;
		this.verify(ev.target,ev.target.value);
	}

	verify ( el, text )
	{
		let error = false
		let msg = ""
		this.validity = true;
			
		this.ruleContainerSize.style.backgroundColor="";
		this.ruleContainerSize.title = "";

		if ( ( this.config.sizeMin > 0 ) &&
			( text.length < this.config.sizeMin ) )
		{
			this.validity = false;
			error = true;
			msg = "Password too short";
		}
		else if ( ( this.config.sizeMax > 0 ) &&
			( text.length > this.config.sizeMax ) )
		{
			this.validity = false;
			error = true;
			msg = "Password too long";
		}
		
		if ( error )
		{
			if ( this.config.errorFunction )
			{
				this.config.errorFunction( this.ruleContainerSize, msg );
			}
			else
			{
				this.ruleContainerSize.style.backgroundColor="rgba(255,0,0,0.2)";
				this.ruleContainerSize.tytle=msg;
			}
		}
		else if ( this.config.validFunction )
		{
			this.config.validFunction( this.ruleContainerSize );
		}
		else
		{
			this.ruleContainerSize.style.backgroundColor="";
			this.ruleContainerSize.tytle="";
		}

		for ( let i = 0; i < this.ruleContainer.length; i++ )
		{
			error = false;
			msg = "";
			let rep;
			let regex = this.config.rules[ i ].regex;
			let count = 0;

			while ((rep = regex.exec(text)) !== null)
			{
				count++;
				if ( rep[0].length < this.config.rules[ i ].minBlockSize )
				{
					this.validity = false;
					error = true;
					msg += " group of element "+count+" too short.";
				}
				else if ( ( this.config.rules[ i ].maxBlockSize > 0 ) &&
					( rep[0].length < this.config.rules[ i ].maxBlockSize ) )
				{
					this.validity = false;
					error = true;
					msg += " group of element "+count+" too long.";
				}
			}

			if ( count < this.config.rules[ i ].numberMinOfBlock )
			{
				this.validity = false;
				error = true;
				msg += " Need at least "+this.config.rules[ i ].numberMinOfBlock+" group of this, you provide "+count+".";
			}
			else if ( ( this.config.rules[ i ].numberMaxOfBlock > 0 ) &&
				( count > this.config.rules[ i ].numberMaxOfBlock ) )
			{
				this.validity = false;
				error = true;
				msg += " Up to "+this.config.rules[ i ].numberMinOfBlock+" group of this is possible, you provide "+count+".";
			}
			
			if ( error )
			{
				if ( this.config.rules[ i ].errorFunction )
				{
					this.config.rules[ i ].errorFunction( this.ruleContainer[ i ], msg );
				}
				else if ( this.config.errorFunction )
				{
					this.config.errorFunction( this.ruleContainer[ i ], msg );
				}
				else
				{
					this.ruleContainer[ i ].style.backgroundColor="rgba(255,0,0,0.2)";
					this.ruleContainer[ i ].title = msg;
				}
			}
			else if ( this.config.validFunction )
			{
				this.config.validFunction( this.ruleContainer[ i ] );
			}
			else
			{
				this.ruleContainer[ i ].style.backgroundColor="";
				this.ruleContainer[ i ].tytle="";
			}
		}
	}

	get ( )
	{
		return ( this.inputPass.value );
	}

	isValide ( )
	{
		return ( this.validty )
	}
}