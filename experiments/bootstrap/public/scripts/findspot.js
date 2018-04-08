$(function() {
	$('#loginButton').click(function() {
		if ($('#login').css('display') == 'none') {
			$('#login').css('display', 'block');
		} else {
			$('#login').css('display', 'none');
		}
	});
});
