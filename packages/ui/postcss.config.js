module.exports = {
  plugins() {
    return [
      require('postcss-import'),
      // require('postcss-modules'),
      require('postcss-mixins'),
      require('tailwindcss'),
      require('autoprefixer'),
      require('postcss-nested')
    ];
  }
};
