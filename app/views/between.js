export default Ember.View.extend({
	didInsertElement: function () {
		$('html, body').animate({
			scrollTop: $('#tussenuren').offset().top
		}, 500);
	}
});