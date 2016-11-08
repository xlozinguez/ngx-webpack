'use strict';

module.exports = function({ aot }) {
  return {
    vendor: './app/vendor.ts',
    main: aot ? './app/main.aot.ts' : './app/main.ts'
  };
};
