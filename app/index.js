export const app = (function appIife() {
  "use strict";

  const bootstrap = () => {
    console.log("Boot strapping the app");
  };

  return {
    bootstrap: bootstrap
  };
})();
