'use strict';

module.exports = function({ env }) {
  let isProduction = env === 'production';

  return {
    debug: !isProduction,
    minimize: isProduction,
    htmlLoader: {
      attrs: false,
      removeAttributeQuotes: false,
      caseSensitive: true,
      customAttrSurround: [
        [/#/, /(?:)/],
        [/\*/, /(?:)/],
        [/\[?\(?/, /(?:)/]
      ],
      customAttrAssign: [/\)?\]?=/]
    }
  };
};
