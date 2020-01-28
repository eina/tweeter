$(document).ready(function() {
  const charCounter = function() {
    const tweetLength = $(this).val().length;
    const $counter = $(this).siblings(".counter");
    $counter.text(140 - tweetLength);
    $counter.toggleClass("counter-red", tweetLength >= 140);
  };

  $("#compose-textarea").keyup(charCounter);
  $("#compose-textarea").change(charCounter);
});
