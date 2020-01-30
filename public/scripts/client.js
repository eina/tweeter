/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// svg definitions for buttons
const svgIcons = {
  flag:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>',
  retweet:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>',
  heart:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
};

$(document).ready(function() {
  /**
   * Create <article> element to show single tweet
   * and append its contents from the data given
   * @param {object} tweetData
   */
  const createTweetElement = function(tweet) {
    const { flag, retweet, heart } = svgIcons;
    const {
      user: { name, avatars, handle },
      content: { text },
      created_at: createdAt
    } = tweet;
    const timestamp = moment(createdAt).fromNow();

    const header = `<header>
    <img src="${avatars}" class="tweet-profile-photo" />
    <span class="tweet-author">${name}</span>
    <span class="tweet-username">${handle}</span>
    </header>`;
    const $escaped = $("<p>").text(text);
    const $body = $("<div>")
      .addClass("tweet-body")
      .append($escaped);
    const footer = `<footer><span class="tweet-timestamp">${timestamp}</span><div class="tweet-actions"><button>${flag}</button><button>${retweet}</button><button>${heart}</button></div></footer>`;

    let $tweet = $("<article>").addClass("tweet");
    $tweet.append(header, $body, footer);

    return $tweet;
  };
  /**
   * Loops through an array of tweet objects
   * to return an element to be appended
   * @param {array} tweets an array of tweet objects
   */
  const renderTweets = tweets => {
    tweets.forEach(tweetObj => {
      const $tweet = createTweetElement(tweetObj);
      return $("#tweets-container").prepend($tweet);
    });
  };

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" }).then(tweets => {
      return renderTweets(tweets);
    });
  };

  /**
   * Submit tweet handler, with validation
   * @param {object} event
   */
  const submitTweet = function(event) {
    event.preventDefault();
    const query = $(this).serialize();
    const textLength = $(this)
      .children("textarea")
      .val().length;
    const $formError = $("#tweetFormError");

    // validate form submission
    if (textLength === 0) {
      $formError.text("Please write something").slideDown();
    } else if (textLength > 140) {
      $formError.text("Your tweet should be shorter than 140 characters").slideDown();
    } else {
      if ($formError) {
        $formError.slideUp();
      }
      $.ajax("/tweets", { method: "POST", data: query }).then(() => {
        $.ajax("/tweets", { method: "GET" }).then(tweets => {
          // clear text area
          $(this)
            .children("textarea")
            .val("");
          // reset counter to 140
          $(this)
            .children(".counter")
            .text(140);
          // empty container and reload tweets
          $("#tweets-container").empty();
          return renderTweets(tweets);
        });
      });
    }
  };

  // hide compose form on load
  $("#new-tweet").hide();

  // handle form submission
  $("#newTweetForm").submit(submitTweet);

  // show/hide #showToTop button
  $("#scrollToTop").hide();
  $(window).scroll(function() {
    const top = $(window).scrollTop();
    // toggle buttons based on position
    $("#scrollToTop").toggle(top >= 200);
    $("#toggleComposeBtn").toggle(top <= 200);
  });

  // scroll to top handler
  $("#scrollToTop").click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 250, "linear", function() {
      // show compose tweet section
      $("#new-tweet").slideDown();
      $("#newTweetForm textarea").focus();
    });
  });

  // toggle compose button handler
  $("#toggleComposeBtn").click(function(e) {
    e.preventDefault();
    $("#new-tweet").slideToggle(300, function() {
      // use autosize plugin for textarea
      $(this)
        .find("textarea")
        .focus()
        .autosize();
    });
  });

  loadTweets();
});
