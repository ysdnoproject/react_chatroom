import MobileDetect from "mobile-detect";

const MobileUtil = (function () {
  let md = new MobileDetect(window.navigator.userAgent);
  let isMobile = null;

  return {
    isMobile: function () {
      if (isMobile === null) {
        isMobile = !!md.mobile();
      }

      return isMobile;
    }
  };
})();

export default MobileUtil;