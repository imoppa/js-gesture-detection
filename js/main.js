//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
//    @author:      Min Kim (m1nk1m, kim@algonquincollege.com                               //
//    @description: This code is written for teaching purpose with steps to follow.         //
//                  Starter file was provided by the faculty with a basic HTML skeleton.    //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Instruction prepared by Min Kim for Tundra assignment (a MVP copy of Tinder with only swiping, saving, and deleting function)
 *
 *
 * Step 1: Help students to write pseudo-code on their own.
 *
 * Step 2: Break down application logic.
 *          a. init:              tab-event listners, check if local storage already exists, get profile data
 *          b. tabNavigation:     navigate to profile page or favorite page.
 *          c. getProfile:        send a request to the server for profile data
 *          d. showProfile:       display a profile card with html skeletons
 *          e. addGesture:        add swiping gesture with ZingTouch library
 *          f. saveProfile:       save swiped right profile in local storage and replace the current profile with new one
 *          g. checkLocalStorage: check local storage if there is any profile that's already saved
 *          h. isAlreadyExist:    check if the swiped-right profile already exists in the local storage
 *          i. deleteProfile:     delete the profile from a global array
 *          j. putdownProfile:    replace the current profile with new one
 *          k. isMoreProfile:     check if there are more profiles to display
 *          l. showFavorites:     display saved favorite profiles
 *          m. deleteFavorite:    delete the selected profile from the local storage and put it down from HTML DOM
 *
 * Step 3: Explain why modular programming in JavaScript and how it will be related to the next semester courses.
 *
 * Step 4: Help them structure the shell of their functions.
 *
 * Step 5: Check if they are struggling with code and help them trouble-shoot.
 *
 * Step 6: Inspect their code with the emphasis on descriptive variables and indentation.
 *
 * Step 7: Give them some extra challenges if students are quite progressive with this assignment.
 *
 *
 * */




// define one global variable with key-value pairs, including functions along the way
let tundraApp = {
  gender: '',
  url: 'http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=',
  profiles: [],
  profileIndex: 0,
  favorites: [],
  imgUrl: null,
  dependencies: ['lib/push.js', 'lib/ratchet.min.js', 'lib/zingtouch-1.0.0.min.js'],
  swipeCount: 0,

  // a. init: tab-event listners, check if local storage already exists, get profile data
  init: function () {

    document.querySelector('#profTab').addEventListener('click', tundraApp.tabPagination);
    document.querySelector('#favTab').addEventListener('click', tundraApp.tabPagination);

    tundraApp.checkLocalStorage('tundra', tundraApp.favorites);
    tundraApp.getProfiles();
  },

  // b. tabNavigation: navigate to profile page or favorite page.
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

        tundraApp.showFavorites();
    }
  },

  // c. getProfile: send a request to the server for profile data
  getProfiles: function () {
    fetch(tundraApp.url + tundraApp.gender)
      .then(status)
      .then(json)
      .then(function(data) {
        tundraApp.imgUrl   = decodeURIComponent(data.imgBaseURL);
        tundraApp.profiles = data.profiles;
        tundraApp.showProfile();
      })
      .catch(function (err) {
        console.error(err);
      });

  },

  // d. showProfile: display a profile card with html skeletons
  showProfile: function () {

    // skeletons for a single profile card
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

    tundraApp.addGesture();
  },

  // e. addGesture: add swiping gesture with ZingTouch library
  addGesture: function () {
    let profilePage   = document.querySelector('#profile-page');
    let activeRegion  = new ZingTouch.Region(profilePage);
    let gestureObject = document.querySelector('.profile-card');
    activeRegion.bind(gestureObject, 'pan', function (ev) {
      activeRegion.unregister('pan');

      // divided by degrees: right or left
      let touchedDegree = ev.detail.data[0];
      if (touchedDegree.directionFromOrigin > 270 || touchedDegree.directionFromOrigin < 90) {

        // swiped right
        tundraApp.saveProfile();
      } else {

        // swiped left
        tundraApp.deleteProfile();
      }
    });
  },

  // f. saveProfile: save swiped right profile in local storage and replace the current profile with new one
  saveProfile: function () {
    console.log(tundraApp.favorites);

    let currentProfile = tundraApp.profiles[tundraApp.profileIndex];

    // verify if the current profile already exists in local storage
    if (!tundraApp.isAlreadyExist(currentProfile)) {
      tundraApp.favorites.push(currentProfile);
      localStorage.setItem('tundra', JSON.stringify(tundraApp.favorites));
    }

    // check if there are more profiles to display before replacing the current profile with new one
    if (tundraApp.isMoreProfile()) {
      tundraApp.putdownProfile();
      tundraApp.profileIndex++;
      tundraApp.showProfile();
    }
  },

  // g. checkLocalStorage: check local storage if there is any profile that's already saved
  checkLocalStorage: function (key) {
    let isExistLocalStorage = localStorage.getItem(key);
    if (isExistLocalStorage) {
      tundraApp.favorites = JSON.parse(isExistLocalStorage);
    }
  },

  // h. isAlreadyExist: check if the swiped-right profile already exists in the local storage
  isAlreadyExist: function(currentProfile) {
    tundraApp.favorites.filter(function (favProfile) {
      if(favProfile.first != currentProfile.first && favProfile.last != currentProfile.last) {
        return true;
      }

      return false;
    });



  },

  // i. deleteProfile: delete the profile from a global array
  deleteProfile: function () {
    if (tundraApp.isMoreProfile()) {
      tundraApp.putdownProfile();
      tundraApp.profiles.splice(tundraApp.profileIndex, 1);
      console.log(tundraApp.profiles);
      tundraApp.showProfile();
    }
  },

  // j. putdownProfile: replace the current profile with new one
  putdownProfile: function () {
    let profilePage = document.querySelector('#profile-page');
    profilePage.removeChild(document.querySelector('.profile-card'));
  },

  // k. isMoreProfile: check if there are more profiles to display
  isMoreProfile: function () {
    if (tundraApp.profiles.length === 1 || tundraApp.profileIndex === tundraApp.profiles.length-1) {
      alert('No More Profile to Show!');
      return false;
    }

    return true;
  },

  // l. showFavorites: display saved favorite profiles
  showFavorites: function () {
    let favoritePage       = document.querySelector('#favorite-page');
    favoritePage.innerHTML = '';

    let favoriteContainer       = document.createElement('ul');
    favoriteContainer.className = 'favorite-container';

    let favorites = tundraApp.favorites;
    if (favorites.length > 0) {
      favorites.forEach(function (profile, index) {
        // skeletons for a single favorite profile
        let li            = document.createElement('li');
        li.className      = 'table-view-cell media';

        let span          = document.createElement('span');
        span.className    = 'media-object pull-left icon icon-trash';
        span.id           = index;
        span.addEventListener('click', tundraApp.deleteFavorite);

        let div           = document.createElement('div');
        div.className     = 'media-body';
        div.style.display = 'flex';
        div.innerHTML     = profile.first + ' ' + profile.last;

        let img           = document.createElement('img');
        img.src           = tundraApp.imgUrl + profile.avatar;
        img.width         = 50;
        img.height        = 50;
        img.style.display = 'inline';

        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(div);

        favoriteContainer.appendChild(li);
        favoritePage.appendChild(favoriteContainer);
      });
    }
  },

  // m. deleteFavorite: delete the selected profile from the local storage and put it down from HTML DOM
  deleteFavorite: function (ev) {
    ev.preventDefault();

    let profile = ev.target.parentNode;
    let profileContainer = profile.parentNode;

    // getting index of the selected profile for removing a HTML node and an element in the Favorite array
    // refered from a StackOverFlow post: http://stackoverflow.com/questions/5913927/get-child-node-index
    let index = Array.prototype.indexOf.call(profileContainer.children, profile);

    tundraApp.favorites.splice(index, 1);
    localStorage.setItem('tundra', JSON.stringify(tundraApp.favorites));

    let favoriteContainer = document.querySelector('.favorite-container');
    favoriteContainer.removeChild(profile);
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

// reference from a post on StackOverFlow: http://stackoverflow.com/questions/5913927/get-child-node-index
// how to find index of a target element with less code
// var child = document.getElementById('my_element');
// var parent = child.parentNode;
// // The equivalent of parent.children.indexOf(child)
// var index = Array.prototype.indexOf.call(parent.children, child);