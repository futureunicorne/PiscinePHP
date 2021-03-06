
var container = $( "#ft_list" );
$( "#add_todo" ).on( "click", toggle );
$( document ).ready( recoverTodoList );
$( "#cancelinfos" ).on( "click", function() {	
	$( "#inputinfos" ).val( "" );
 	toggle();
	});
$( "#submitinfos" ).on( "click", function() {
	toggle();
	addTodo( $( "#inputinfos" ).val() );
	$( "#inputinfos" ).val( "" );
	});

function toggle() {
	$( "#ft_list" ).toggle();
	$( "#todoinfos" ).toggle();
}

function addTodo( infos ) { 
	if ( !infos ) return;
	prependDiv( infos );
	addCookie( "todolist", infos );
}

function prependDiv( infos ) {
	var new_div = $( "<div></div>" ).addClass( "todo" ).text( infos );	
	new_div.on( "click", function() { custom_remove( new_div ) } );
	container.prepend( new_div );	
}	

function getExpire( exdays ) {
	var d = new Date();
	d.setTime( d.getTime() + ( exdays*24*60*60*1000 ) );
	var expires = "expires=" + d.toUTCString();
	return( expires );
}

function addCookie( cname, infos ) {
	infosstr = getCookie( cname );
	if ( infosstr == "" )
		infosstr = encodeURIComponent( infos );
	else
		infosstr = infosstr + "|" + encodeURIComponent( infos );
		document.cookie = cname + "=" + infosstr + "; " + getExpire( 1 / 24 );
}

function getCookie( cname ) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for( var i = 0; i < ca.length; i++ ) {
    var c = ca[i];
    while ( c.charAt( 0 ) == ' ' ) c = ( c.substring( 1 ) );
    if ( c.indexOf( name ) == 0 ) return c.substring( name.length, c.length );
    }
    return "";
}

function checkCookie() {
    var  todolist = getCookie( "todolist" );
    if ( todolist != "" ) {
		return true;
    }
   	else {
		return false;
    }
}

function getDecodedTab( cname ) {
	tab = getCookie( cname ).split( '|' );
	var i = 0;
	while( tab[i] ) {
		tab[i] = decodeURIComponent( tab[i] );
		i++;
	}
	return( tab );
}

function recoverTodoList() {
	todotab = getDecodedTab( "todolist" );
	var arrayLength = todotab.length;
	for( var i = 0; i < arrayLength; i++ )
		if ( todotab[i] != "" )
			prependDiv( todotab[i] );
}


function custom_remove( el ) {
	if ( !confirm( "Really delete this ?" ) )
		return;
	todolist = getCookie( "" ).split( '|' );
	tab = getDecodedTab( "todolist" );
	var text = el.text();
	var infos = "";
	var index = 0;
	while( tab[index] ) {
		if ( text != tab[index] ) {
		if ( infos != "" )
			infos += "|";
			infos += encodeURIComponent( tab[index] );
		}
		else
			text = "";
		index++;
	}
	document.cookie = "todolist" + "=" + infos + "; " + getExpire( 1 / 24 );
	el.remove();
}
