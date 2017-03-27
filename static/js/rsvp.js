(function($) {

  skel
    .breakpoints({
      xlarge: '(max-width: 1680px)',
      large:  '(max-width: 1280px)',
      medium: '(max-width: 980px)',
      small:  '(max-width: 736px)',
      xsmall: '(max-width: 480px)'
    });

  $(function() {
    var $firstAndLastName = $('.input-group input');
    var $lastName = $('.input-group.input-group__last-name input');

    // send the click event down to the input element
    $('.placeholder').on('click', function() {
      $(this).next('input').focus();
    });

    $firstAndLastName.on('input', function() {
      var $this = $(this);
      var placeholder = $this.prev('div.placeholder');
      var $parent = $this.parent();
      $this.val().length > 0 ? placeholder.addClass('above') : placeholder.removeClass('above');
      validated($this) ? $parent.addClass('valid') : $parent.removeClass('valid');
    });

    $lastName.on('input', function() {
      var shouldSubmit = validated($(this)) && validated($('.input-group__first-name input'))
      shouldSubmit ? $('.form').attr('id', 'submittable') : $('.form').attr('id', '');
    })


    $('.input-group__submit input, .submitted-circle').on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      if($this.closest('.form').is('#submittable')) {
        $('.submitted-circle').toggleClass('submitted'); 
        var firstName = $('.input-group__first-name input').val();
        var lastName = $('.input-group__last-name input').val();
        var sealing = $('#radio-sealing-1').is(':checked');
        var luncheon = $('#radio-luncheon-1').is(':checked');
        var data = { first_name: firstName,
                     last_name: lastName,
                     sealing: sealing,
                     luncheon: luncheon };
        $.ajax({
          method: 'POST',
          contentType: 'application/json',
          url: 'https://protected-cliffs-72161.herokuapp.com/api/rsvps',
          data: JSON.stringify(data),
        })
        .done(function(data, statusText, xhr) {
          window.setTimeout(function() {
            $('.confirmed').addClass('show');
          }, 1000)
        })
        .fail(function() {
          alert("Oops! Looks like there was a problem. Just text James at 801-634-1437 and confirm! He built this dumb form, so it's his fault :)")
        });
      }
    })

    // hokey username and password validation
    var validated = ($elem) => {
      return $elem.val().length >= 3;
    }
  });

})(jQuery);
