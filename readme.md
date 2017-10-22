# React Template Hot

A React app boilerplate featuring React 16, Webpack 3 (with babel), react-hot-loader, css-hot-loader, and PostCSS!

Getting started:
1. `git clone https://github.com/zackcreach/react-template-hot.git`
2. `npm i`
3. `npm run develop`

`npm start` will launch a server in your default browser. Change/add anything in ./assets and watch it update! The webpack config runs any js through babel (with babel-preset-env) and any css through postcss plugins (configurable in postcss.config.js). Browsersync server serves all files through ./public.

Included npm scripts `start` and `build` will ready your app for production (works perfectly in Zeit Now) when the time comes to deploy.