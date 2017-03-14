/**
 * Created by Min on 2017-03-14.
 */

let tundraApp = {
  gender: '',
  url: 'http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=',
  profiles: [],
  profileIndex: 0,
  imgUrl: null,
  pushSrc: 'lib/push.js',
  ratSrc: 'ratchet.min.js',
  zingSrc: 'zingtouch-1.0.0.min.js',
  loadCount: 0,
  init: function () {
    let pushScript = document.createElement('script');
    pushScript.setAttribute('src', this.pushSrc);

    let ratScript = document.createElement('script');
    ratScript.setAttribute('src', this.ratSrc);

    let zingScript = document.createElement('script');
    zingScript.setAttribute('src', this.zingSrc);
  }

};