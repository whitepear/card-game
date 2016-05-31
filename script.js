//  INCLUDE CHECK FOR ID TO PREVENT USER CLICKING SAME CARD TWICE TO "MATCH"

$(document).ready(function() {

	randomFaces();	

	function randomFaces () {
		var colours = ['pink', 'yellow', 'blue', 'green', 'lime', 'orange', 'pink', 'yellow', 'blue', 'green', 'lime', 'orange'];
		var cards = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

		function getRandomIntInclusive(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		} // generates a random number inclusive of max value

		for (var i = 0; i < cards.length; i++) {
			var randomColour = getRandomIntInclusive(0, colours.length-1);
			$('#' + cards[i]).css('background', colours[randomColour]); // assign colour to card
			colours.splice(randomColour, 1); // remove colour from array
		}

	} // randomly assign colours to back face of cards


	var bgValue = undefined; // storage var for background prop value of first card clicked
	var firstID = undefined; // storage var for id value of first card clicked
	var removed = []; // storage arr for matched cards

	$('.card').click(function() {

		$('.card').css('pointer-events', 'none'); // disable clicks on cards	
		$(this).addClass('flipped'); // flip card	

		// if 2nd card clicked, check if its background prop value matches first card's bgValue
		// if 1st card clicked, store its background prop value in bgValue		
		if (bgValue !== undefined && $(this).find('.back-face').attr('id') !== firstID) {
			// if cards match, remove from play
			// else flip them back over
			if (bgValue === $(this).find('.back-face').css('background-color')) {
				setTimeout(function() {
					$('.flipped').fadeOut(850);
				}, 600);
				
				setTimeout(function() {
					$('.flipped').find('.back-face').each(function(index, element) {
						removed.push(element.id);
					}); // push IDs for both matched cards to removed array
					console.log(removed); // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST 
					$('.flipped').removeClass('flipped');
					$('.card').css('pointer-events', 'auto');

					if (removed.length === 12) {
						modalToggle();
					}
				}, 1550);			
			} else {
				setTimeout(function() {
					$('.flipped').removeClass('flipped');
					$('.card').css('pointer-events', 'auto'); 
				}, 900);
			}
			
			bgValue = undefined;
		} else {
			bgValue = $(this).find('.back-face').css('background-color');
			firstID = $(this).find('.back-face').attr('id');
			setTimeout(function() {
				$('.card').css('pointer-events', 'auto'); 
			}, 500); // restore clickable state to cards after 0.5s (in line w/ transition duration)
		}

	}); // end card.click

	function modalToggle () {
		if ($('#overlay').css('visibility') === 'hidden') {
			$('#overlay').css('visibility', 'visible').css('background', 'rgba(0, 0, 0, 0.5)');
			$('.modal-content').addClass('modal-active');
		} else {
			$('#overlay').css('visibility', 'hidden').css('background', 'rgba(0, 0, 0, 0)');
			$('.modal-content').removeClass('modal-active');
		}
	} // end modalToggle

	$('#close-modal').click(modalToggle);

}); // end .ready