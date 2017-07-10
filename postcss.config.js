module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-nested': {},
    'postcss-hexrgba': {},
    'postcss-cssnext': {
      // this browsers option is pointing to autoprefixer, which is built in to cssnext
      browsers: ['last 2 versions', '> 5%'],
    },
  }
}
