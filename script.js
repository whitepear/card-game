$('#randomizer').click(function() {
	var colours = ['red', 'yellow', 'blue', 'green', 'lime', 'orange', 'red', 'yellow', 'blue', 'green', 'lime', 'orange'];
	var cards = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

	function getRandomIntInclusive(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} // generates a random number inclusive of max value

	for (var i = 0; i < cards.length; i++) {
		var randomColour = getRandomIntInclusive(0, colours.length-1);
		$('#' + cards[i]).css('background', colours[randomColour]); // assign colour to card
		colours.splice(randomColour, 1); // remove colour from array
	}

}); // randomly assign colours to back face of cards