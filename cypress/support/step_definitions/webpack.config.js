const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.feature'],  // .feature dosyalarını tanıması için gerekli
  },
  module: {
    rules: [
      {
        test: /\.feature$/,  // .feature uzantısını işlemek için
        use: [
          {
            loader: '@badeball/cypress-cucumber-preprocessor/loader',
          },
        ],
      },
    ],
  },
};
