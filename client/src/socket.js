import io from 'socket.io-client';

const Singleton = (function () {
  let instance;

  function createInstance() {
    const socket = io();
    return socket;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
    closeConnection: function () {
      if (instance) {
        instance.removeAllListeners();
        instance.close();
      }
    }
  };
})();

export default Singleton;