//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
//    @author:      Min Kim (m1nk1m, kim@algonquincollege.com                               //
//    @description: This code is written for teaching purpose with steps to follow.         //
//                  Starter file was provided by the faculty with a basic HTML skeleton.    //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////

// Step 1: define one global variable with key-value pairs, including functions along the way
let tundraApp = {
  gender: '',
  url: 'http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=',
  profiles: [],
  profileIndex: 0,
  favorites: [],
  imgUrl: null,
  dependencies: ['lib/push.js', 'lib/ratchet.min.js', 'lib/zingtouch-1.0.0.min.js'],
  swipeCount: 0,

  // Step 2: define init function to start the program
  init: function () {

    // Step 4: add event listners to tabs with pagination functions defined in the step 3
    document.querySelector('#profTab').addEventListener('click', tundraApp.tabPagination);
    document.querySelector('#favTab').addEventListener('click', tundraApp.tabPagination);


    // Step 6: call the function you defined in Step 5 to fetch profile data
    tundraApp.getProfiles();
    console.log(tundraApp.profiles);

  },

  // Step 3: define a function for pagination
  tabPagination: function (ev) {
    ev.preventDefault();

    let profilePage  = document.querySelector('#profile-page');
    let favoritePage = document.querySelector('#favorite-page');

    if (ev.srcElement.parentElement.innerText === 'Profile' || ev.srcElement.innerText === 'Profile' || ev.srcElement.id === 'profTab') {
        profilePage.className  = 'active-page';
        favoritePage.className = 'inactive-page';
    } else {
        profilePage.className  = 'inactive-page';
        favoritePage.className = 'active-page';
    }
  },

  // Step 5: define a function that fetches data from server and puts its valid response data into an array
  getProfiles: function () {
    fetch(tundraApp.url + tundraApp.gender)
      .then(status)
      .then(json)
      .then(function(data) {
        tundraApp.imgUrl   = decodeURIComponent(data.imgBaseURL);
        tundraApp.profiles = data.profiles;
        
        // Step  : define a function to display profiles and call it
        tundraApp.showProfile();
      })
      .catch(function (err) {
        console.error(err);
      });

  },

  // Step 5: define a function to add gestures to each profile card
  showProfile: function () {
    let profileCard       = document.createElement('div');
    profileCard.className = 'profile-card';

    let profileImg        = document.createElement('img');
    profileImg.className  = 'profile-image';
    profileImg.src        = tundraApp.imgUrl + tundraApp.profiles[tundraApp.profileIndex].avatar;

    let profileName       = document.createElement('span');
    profileName.className = 'profile-name';
    profileName.innerHTML = ''.concat(tundraApp.profiles[tundraApp.profileIndex].first,
                                 ' ', tundraApp.profiles[tundraApp.profileIndex].last);

    profileCard.appendChild(profileImg);
    profileCard.appendChild(profileName);

    let profilePage       = document.querySelector('#profile-page');
    profilePage.appendChild(profileCard);

    // tundraApp.profileIndex++;
    tundraApp.addGesture();
  },

  // Step 6: define a function to add gesture 
  addGesture: function () {
    let profilePage = document.querySelector('#profile-page');
    let activeRegion = new ZingTouch.Region(profilePage);

    let gestureObject = document.querySelector('.profile-card');
    activeRegion.bind(gestureObject, 'pan', function (ev) {
      activeRegion.unregister('pan');

      // Devide by degrees: right or left
      let touchedDegree = ev.detail.data[0];
      console.log(touchedDegree);
      if (touchedDegree.directionFromOrigin > 270 || touchedDegree.directionFromOrigin < 90) {
        // tundraApp.checkSwipeCount();
        console.log('right');
        // add it to local storage
        tundraApp.saveProfile();

      } else {
        // tundraApp.checkSwipeCount();
        console.log('left');
        // delete it
        tundraApp.deleteProfile();
      }
    });
  },

  saveProfile: function () {
    tundraApp.favorites.push(tundraApp.profiles[tundraApp.profileIndex]);
    localStorage.setItem('tundra', JSON.stringify(tundraApp.favorites));

    if (tundraApp.isMoreProfile()) {
      tundraApp.putdownProfile();
      tundraApp.profileIndex++;
      tundraApp.showProfile();
    }
  },

  deleteProfile: function () {
    if (tundraApp.isMoreProfile()) {
      tundraApp.putdownProfile();
      tundraApp.profiles.splice(tundraApp.profileIndex, 1);
      console.log(tundraApp.profiles);
      tundraApp.showProfile();
    }
  },

  putdownProfile: function () {
    let profilePage = document.querySelector('#profile-page');
    profilePage.removeChild(document.querySelector('.profile-card'));
  },

  isMoreProfile: function () {
    if (tundraApp.profiles.length === 1 || tundraApp.profileIndex === tundraApp.profiles.length-1) {
      alert('no more!');
      return false;
    }

    return true;
  }
};

document.addEventListener('DOMContentLoaded', tundraApp.init);


// reference from Introduction to Fetch: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
// great resource to learn more about fetch and previous way to make HTTP calls in comparison.
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}


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