# html Elements
html part of codes

## full example:
An example is available for testing all, and small code for testing each elements.

![map](fullExample/imgs/fullExample.png)

## colour picker:
This small code will display a colour picker (found on [w3c](https://www.w3schools.com/colors/colors_picker.asp) and simplified).

![map](colorPicker/imgs/img_colormap.gif)

maybe you should modify the ```margin-bottom``` property of `selectedhexagon` to perfectly align selector.

## post-it:
This will create a [post-it](http://creative-punch.net/2014/02/create-css3-post-it-note/) like render.

![post-it](post-it/imgs/post-it.png)

## country/language selector:
This will display a flag selector to change display language easily, you can modify it simply by adding new flags or removing existent.

![countrySelector](countrySelector/imgs/countrySelector.html.png)

It was created with the least possible Javascript, and to use HTML5 and CSS3 tricks.

You can create a simple flagPicker like this :

```HTML
<div id="country_1" class="flagSelector" style="width: 32px;height: 21px;border-radius: 10px;"></div>
<section class="lang_uk">
	English
</section>
<script src="js/countrySelector.js"></script>
<script type="text/javascript">
let config_1 = {
		language:[
			{
				lang:'uk',
				logo:'imgs/united-kingdom-flag.svg'
			},
			...
		],
		langPart:"lang_"
	};
	countrySelector ( "country_1", config_1, "uk" );
</script>
```

Or you can create a flag picker with muli point access :

```HTML
<div id="country_1" class="flagSelector" style="width: 32px;height: 21px;border-radius: 10px;"></div>
<section class="lang_uk">
	English
</section>
<div id="country_2" class="flagSelector" style="width: 32px;height: 21px;border-radius: 10px;"></div>
<script type="text/javascript">
	let config_1 = {
		language:[
			{
				lang:'uk',
				logo:'imgs/united-kingdom-flag.svg'
			},
			...
		],
		langPart:"lang_"
	};

	countrySelector ( "country_1", config_2, "uk" );
	countrySelector ( "country_2", config_2, "uk", "country_1" );
</script>
```

for some language you should change some CSS rules :
```javascript
let config = {
	language:[
		{
			lang:'ar',
			text:"العربية",
			style:"text-align:right"
		},
		...
	],
	langPart:"lang_"
};
```

Remember a flag picker is not to choose a language according this rules [en](http://www.flagsarenotlanguages.com/blog/why-flags-do-not-represent-language/), [fr](https://zestedesavoir.com/tutoriels/3039/linternationalisation-et-ses-pieges-creer-un-logiciel-universel/gerer-differentes-langues/).

## nav barre:
This will provide a small navigation barre responsive and customisable

![large nav barre](navBarre/imgs/large.html.png)
![small nav barre](navBarre/imgs/small.html.png)

## smoothScroller:
This part of code will provide a smooth scrollbar on link select, with a displacement in 0.3 second.

## carousel:
This part of code is to create a carousel

![carousel](carousel/imgs/carousel.png)

If you click once on the arrow, the display will be continue, you should click another time on the carousel to stop it.

To change only one image, you shoud click twice.

To modes exists for carousels, the first one only allow to change images one by one:

```HTML
<div id="carouselID" class="carousel">
	<div class="navBarre" onclick="carousel.continus = false;">
		<div class="arrow left"><span class="left" onclick="carousel.previous(this)">&lt;</span></div>
		<div class="arrow right"><span class="right" onclick="carousel.next(this)">&gt;</span></div>
	</div>
</div>
```

The second one allow to create a infinite sliding carousel

```HTML
<div id="carouselID" class="carousel">
	<div class="navBarre" onclick="carousel.continus = false;">
		<div class="arrow left"><span id="carouselLeft" class="left">&lt;</span></div>
		<div class="arrow right"><span id="carouselRight" class="right">&gt;</span></div>
	</div>
</div>
```

```Javascript
document.getElementById( "carouselLeft" ).addEventListener( "click", function( ev )
{
	if ( carousel.previous ( ev.target, true ) )
	{
		ev.stopPropagation ( );
	}
});

document.getElementById( "carouselRight" ).addEventListener( "click", function( ev )
{
	if ( carousel.next ( ev.target, true ) )
	{
		ev.stopPropagation ( );
	}
});
```

## grid:
This part of code provide a mecanism to feed a grid automaticly with content defined staticly without care about alignment.

![large nav barre](grid/imgs/3columns.png)
![small nav barre](grid/imgs/2columns.png)

## dark-light :
This part of code allow two them colors for the page.

The global CSS shouldn't include color rules, they should be add in two external CSS file and sourced in function of the selector.

```HTML
<head>
	<link id="lightCss" rel="stylesheet" href="/css/colorDark.css">
</head>
```

```Javascript
function changeLight ( flag )
{
	if ( flag )
	{ // light mode
		document.getElementById ( 'lightCss' ).href = '/css/colorLight.css';
	}
	else
	{ // dark mode
		document.getElementById ( 'lightCss' ).href = '/css/colorDark.css';
	}
}
```

obviouly you can add CSS in the main page as in exemple:

```HTML
<head>
	<style id="lightCss"></style>
</head>
```

```Javascript
function changeLight ( flag )
{
	if ( flag )
	{ // light mode
		document.getElementById ( 'lightCss' ).innerHTML = '.onlyDark{display:none;}';
	}
	else
	{ // dark mode
		document.getElementById ( 'lightCss' ).innerHTML = 'body{color: #fdf6e3;background-color: #333;}.onlyLight{display:none;}';
	}
}
```