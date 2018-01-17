import io from 'socket.io-client';

const Singleton = (function () {
  let instance;

  function createInstance() {
    const socket = io.connect();
    return socket;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

export default Singleton;