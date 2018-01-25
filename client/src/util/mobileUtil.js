import MobileDetect from "mobile-detect";

const MobileUtil = (function () {
  let md = new MobileDetect(window.navigator.userAgent);

  return {
    isMobile: function () {
      return !!md.mobile();
    }
  };
})();

export default MobileUtil;