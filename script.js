$(document).ready(function() {

	$('.rec').click(function() {
		$('.rec').css('transform', 'rotateY(3600deg) rotateX(-90deg)');
		
		setTimeout(function() {
			$('.rec').css('transform', 'rotateY(3600deg) rotateX(-90deg) translateY(-5000px)');
			$('.card-row').css('display', 'block');
			setTimeout(function() {
				$('.card-row').addClass('card-zoom');
				setTimeout(function() {
					$('.rec-container').hide();
				}, 300);
			}, 1425);
		}, 5500);		
	}); // end .rec.click

	randomFaces();	

	function randomFaces () {
		var images = ['ace_sprite', 'jack_sprite', 'diamonds_sprite', 'joker_sprite', 'king_sprite', 'queen_sprite', 'ace_sprite', 'jack_sprite', 'diamonds_sprite', 'joker_sprite', 'king_sprite', 'queen_sprite'];
		var cards = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

		function getRandomIntInclusive(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		} // generates a random number inclusive of max value

		for (var i = 0; i < cards.length; i++) {
			var randomImage = getRandomIntInclusive(0, images.length-1);
			$('#' + cards[i]).css('background-image', 'url(img/' + images[randomImage] + '.png)'); // assign colour to card
			images.splice(randomImage, 1); // remove colour from array
		}

	} // randomly assign images to back face of cards


	var bgValue = undefined; // storage var for background-image prop value of first card clicked
	var firstID = undefined; // storage var for id value of first card clicked
	var removed = []; // storage arr for matched cards

	$('.card').click(function() {

		$('.card').css('pointer-events', 'none'); // disable clicks on cards	
		$(this).addClass('flipped'); // flip card	

		// if 2nd card clicked, check if its background-image prop value matches first card's bgValue 
		// & make sure that it is a different card via ID comparison.
		// if 1st card clicked, store its background-image prop value in bgValue		
		if (bgValue !== undefined && $(this).find('.back-face').attr('id') !== firstID) {
			// if cards match, remove from play
			// else flip them back over
			if (bgValue === $(this).find('.back-face').css('background-image')) {
				setTimeout(function() {
					$('.flipped').fadeOut(850);
				}, 600);
				
				setTimeout(function() {
					$('.flipped').find('.back-face').each(function(index, element) {
						removed.push(element.id);
					}); // push IDs for both matched cards to removed array
					
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
			bgValue = $(this).find('.back-face').css('background-image');
			firstID = $(this).find('.back-face').attr('id');
			setTimeout(function() {
				$('.card').css('pointer-events', 'auto'); 
			}, 500); // restore clickable state to cards after 0.5s (in line w/ transition duration)
		}

	}); // end card.click

	function modalToggle () {
		if ($('#overlay').css('visibility') === 'hidden') {
			$('#overlay').css('visibility', 'visible').css('background', 'rgba(0, 0, 0, 0.5)');
			$('.modal-window').addClass('modal-active');
		} else {
			$('#overlay').css('visibility', 'hidden').css('background', 'rgba(0, 0, 0, 0)');
			$('.modal-window').removeClass('modal-active');
		}
	} // end modalToggle

	$('#close-modal').click(modalToggle);

	$('#play-yes').click(function() {
		modalToggle();
		randomFaces();
		bgValue = undefined;
		firstID = undefined;
		removed = [];
		$('.card').fadeIn(750);
	});

	$('#modal-dismiss').click(modalToggle);
	$('#play-no').click(modalToggle);

	$('.bird-card').click(function() {
		$('.bird-card').css('transform', 'rotateY(3600deg)');
		$('.bird-card').css('transition-timing-function', 'cubic-bezier(.53,-0.36,.17,1.4)');
		setTimeout(function() {
			$('.bird-card').css('transform', 'rotateY(0deg)');
			$('.bird-card').css('transition-timing-function', 'cubic-bezier(.08,.16,.74,1.16)');
		}, 3000);
	}); // end .bird-card.click

}); // end .ready