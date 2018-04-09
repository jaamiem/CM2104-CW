$(function() {
	$('#closeSearch').click(function() {
		$('#resultsPane').css('display', 'none');
	});
	
	$('#login').css('display', 'none');
	$('#buttonContainer').append("<a href='#' id='loginButton' class='btn accBtn active'>Login</a>");
	
	$('#loginButton').click(function() {
		if ($('#login').css('display') == 'none') {
			$('#login').css('display', 'block');
		} else {
			$('#login').css('display', 'none');
		}
	});
});

