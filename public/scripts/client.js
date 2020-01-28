/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac"
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants"
  },
  created_at: 1461116232227
};

// svg definitions for button use
const svgIcons = {
  flag: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`,
  retweet: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`,
  heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
};

$(document).ready(function() {
  const createTweetElement = function(tweetData) {
    const { flag, retweet, heart } = svgIcons;
    const {
      user: { name, avatars, handle },
      content: { text },
      created_at: createdAt
    } = tweetData;
    const timestamp = new Date(createdAt * 1000);
    const header = `<header>
    <img src="${avatars}" class="tweet-profile-photo" />
    <span class="tweet-author">${name}</span>
    <span class="tweet-username">${handle}</span>
    </header>`;
    const body = `<div class="tweet-body"><p>${text}</p></div>`;
    const footer = `<footer><span class="tweet-timestamp">${Date.parse(
      timestamp
    )}</span><div class="tweet-actions"><button>${flag}</button><button>${retweet}</button><button>${heart}</button></div></footer>`;

    let $tweet = $("<article>").addClass("tweet");
    $tweet.append(header);
    $tweet.append(body);
    $tweet.append(footer);

    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);
  console.log("tweet?", $tweet);
  // $("#tweets-container").append($tweet);
});
