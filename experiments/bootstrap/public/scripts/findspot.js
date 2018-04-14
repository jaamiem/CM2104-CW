$(function() {
	$('#closeSearch').click(function() {
		$('#resultsPane').css('display', 'none');
	});
	
	// Add elements to the menu (these are not displayed with JS disabled)
	$('#login').css('display', 'none');
	$('#loginButtonContainer').append("<a href='#' id='loginButton' class='btn accBtn active'>Login</a>");
	$('#burgerContainer').append("<a href='#' class='btn accBtn active'>&equiv;</a>");
	
	$('#loginButton').click(function() {
		if ($('#login').css('display') == 'none') {
			$('#login').css('display', 'block');
		} else {
			$('#login').css('display', 'none');
		}
	});
});

