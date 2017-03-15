/**
 * Created by Min on 2017-03-14.
 */

// Step 1: define one global variable with key-value pairs, including functions along the way

let tundraApp = {
  gender: '',
  url: 'http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=',
  profiles: [],
  profileIndex: 0,
  imgUrl: null,
  dependencies: ['lib/push.js', 'lib/ratchet.min.js', 'lib/zingtouch-1.0.0.min.js'],
  loadCount: 0,

  // Step 2: define init function to start the program
  init: function () {
  // Step 2-1: add event listners to tabs
  document.querySelector('#profTab').addEventListener('click', function (ev) {
    console.log(ev);
  });

  document.querySelector('#favTab').addEventListener('click', function (ev) {
    console.log(ev);
  });

  // Step 3-1: call the function you defined in Step 3

  },

  // Step 3: define a function that fetches data from server and puts its valid response data into an array
  getProfiles: function () {

  },

  // Step 4: define a function to display the profiles in the HTML Document
  // Step 5: define a function to add gestures to each profile card
  // Step 6:
};

document.addEventListener('DOMContentLoaded', tundraApp.init);


// init: function () {
//   // let pushScript = document.createElement('script');
//   // pushScript.setAttribute('src', this.pushSrc);
//   //
//   // let ratScript = document.createElement('script');
//   // ratScript.setAttribute('src', this.ratSrc);
//   //
//   // let zingScript = document.createElement('script');
//   // zingScript.setAttribute('src', this.zingSrc);
//   tundraApp.loadScripts();
// },
// loadScripts: function() {
//   tundraApp.dependencies.forEach(function (depedency) {
//
//     let script = document.createElement('script');
//     script.setAttribute('src', depedency);
//     document.body.appendChild(script);
//     script.addEventListener('load', function () {
//       tundraApp.loadCount++;
//     });
//   });
// }