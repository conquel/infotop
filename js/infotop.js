/**
 *
 * infotop.js is a tiny, simple and framework-independent notification library 
 * designed to display info messages on top of page
 *
 * By Victor Petrakov
 * E-mail: vpetrakov@mail.ru
 *
 */
 
var infoTopDisplayTimer;
var infoTopFedeinTimer;
var infoTopFadeoutTimer;
var infoTopDefaultTargetId = "infotop";

function infoTop(content, params, callback) {

// Default values
var fadeInDelay = 300;
var displayDelay = 1000;
var fadeOutDelay = 2000;
var width = "320px";
var maxWidth = "90%";
var border = "1px solid #FFB41E";
var background = "#FFE88D";
var color = "#000000";
var id = infoTopDefaultTargetId;

if (typeof params !== 'undefined') {
	if (typeof params.fadeout_delay !== 'undefined' ) {
	fadeOutDelay = params.fadeout_delay;
	}
	if (typeof params.fadein_delay !== 'undefined') {
	fadeInDelay = params.fadein_delay;
	}
	if (typeof params.display_delay !== 'undefined') {
	displayDelay = params.display_delay;
	}
	if (typeof params.width !== 'undefined') {
	width = params.width;
	}
	if (typeof params.max_width !== 'undefined') {
	maxWidth = params.max_width;
	}
	if (typeof params.border !== 'undefined') {
	border = params.border;
	}
	if (typeof params.background !== 'undefined') {
	background = params.background;
	}
	if (typeof params.color !== 'undefined') {
	color = params.color;
	}
	if (typeof params.id !== 'undefined') {
	id = params.id;
	}

} // if params defined

// If info window open, close it
infoTopClose(id);	

var infoFrame = document.getElementById(id);
var info = infoFrame.getElementsByTagName('div')[1];

infoFrame.style.width = width;
infoFrame.style.maxWidth = maxWidth;
infoFrame.style.borderLeft = border;
infoFrame.style.borderRight = border;
infoFrame.style.borderBottom = border;
infoFrame.style.background = background;
infoFrame.style.color = color;
info.style.paddingRight = "15px";

info.innerHTML = content;

if (typeof fadeOutDelay !== 'undefined' && fadeOutDelay > 0) {

		fadeIn(infoFrame, fadeInDelay, function() {
			infoTopDisplayTimer = setTimeout(function() {
			fadeOut(infoFrame, fadeOutDelay);
			}, displayDelay);
				if (typeof callback !== 'undefined') {
				callback();
				return;
					}
		});

	} else {		
		fadeIn(infoFrame, fadeInDelay, function() {
			if (typeof callback !== 'undefined') {
			callback();
			return;
				}
		});
		
	} // else
	
} // infoTop


function infoTopAppend(content, params) {
var id = infoTopDefaultTargetId;

if (typeof params !== 'undefined') {
	if (typeof params.fadeout_delay !== 'undefined') {
	fadeOutDelay = params.fadeout_delay;
	}
	if (typeof params.display_delay !== 'undefined') {
	displayDelay = params.display_delay;
	}
	if (typeof params.id !== 'undefined') {
	id = params.id;
	}

}	

var infoFrame = document.getElementById(id);
var info = infoFrame.getElementsByTagName('div')[1];

info.innerHTML = info.innerHTML + content;

if (typeof fadeOutDelay !== 'undefined' && fadeOutDelay > 0) {
			infoTopDisplayTimer = setTimeout(function() {
			fadeOut(infoFrame, fadeOutDelay);
			}, displayDelay);
		}
			
} // infoTopAppend


function infoTopUpdate(content, params) {
var id = infoTopDefaultTargetId;

if (typeof params !== 'undefined') {
	if (typeof params.fadeout_delay !== 'undefined' ) {
	fadeOutDelay = params.fadeout_delay;
	}
	if (typeof params.display_delay !== 'undefined') {
	displayDelay = params.display_delay;
	}
	if (typeof params.id !== 'undefined') {
	id = params.id;
	}
}	

var infoFrame = document.getElementById(id);
var info = infoFrame.getElementsByTagName('div')[1];

info.innerHTML = content;

if (fadeOutDelay > 0) {
			infoTopDisplayTimer = setTimeout(function() {
			fadeOut(infoFrame, fadeOutDelay);
			}, displayDelay);
		}

} // infoTopUpdate


function infoTopClose(id) {

if (typeof id == 'undefined' || id == '') {
id = infoTopDefaultTargetId;
}

var infoFrame = document.getElementById(id);
var info = infoFrame.getElementsByTagName('div')[1];

clearTimers();	

info.innerHTML = '';
infoFrame.style.display = 'none';
infoFrame.style.visibility = "hidden";
} // infoTopClose


function clearTimers() {
	if(typeof infoTopDisplayTimer !== "undefined"){
	clearTimeout(infoTopDisplayTimer);
	}
	if(typeof infoTopFadeinTimer !== "undefined"){
	clearInterval(infoTopFadeinTimer);
	}
	if(typeof infoTopFadeoutTimer !== "undefined"){
	clearInterval(infoTopFadeoutTimer);
	}
} // clearTimers

// fadeIn and fadeOut functions based on this example: http://stackoverflow.com/a/20533102 
// by http://stackoverflow.com/users/2005867/raptor007
function fadeIn( elem, ms, callback )
{
  if( ! elem )
    return;

  elem.style.opacity = 0;
  elem.style.filter = "alpha(opacity=0)";
  elem.style.display = "inline-block";
  elem.style.visibility = "visible";

  if( ms )
  {
    var opacity = 0;
    var timer = setInterval( function() {
      opacity += 50 / ms;
      if( opacity >= 1 )
      {
        clearInterval(timer);
        opacity = 1;
		if (typeof callback !== 'undefined') {
		callback();
		}
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
	}, 50 );
	infoTopFadeinTimer = timer;
  }
  else
  {
    elem.style.opacity = 1;
    elem.style.filter = "alpha(opacity=1)";
	if (typeof callback !== 'undefined') {
	callback();
	}
  }

} // fadeIn




function fadeOut( elem, ms, callback )
{
  if( ! elem )
    return;

  if( ms )
  {
    var opacity = 1;
    var timer = setInterval( function() {
      opacity -= 50 / ms;
      if( opacity <= 0 )
      {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = "none";
        elem.style.visibility = "hidden";
	if (typeof callback !== 'undefined') {
	callback();
	}
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    
	}, 50 );
	infoTopFadeoutTimer = timer;
  
  }
  else
  {
    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "none";
    elem.style.visibility = "hidden";
	if (typeof callback !== 'undefined') {
	callback();
	}
  }

  } // fadeOut