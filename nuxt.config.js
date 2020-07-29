const fs = require('fs');
const path = require('path');

var files = fs.readdirSync('./assets/content/blog');
function createRoutesArray() {
  files.forEach(function (file) {
    var name = file.substr(0, file.lastIndexOf('.'));
    var route = '/blog/' + name;
    routesArray.push(route);
  });
}

function returnRoutes() {
  dir.readFiles(
    './assets/content/blog',
    {
      match: /.md$/,
      shortName: true,
      exclude: /^\./,
    },
    function (err, content, next) {
      if (err) throw err;
      // console.log('content:', content);
      next();
    },
    function (err, files) {
      if (err) throw err;
      // fileNamesArray = [];
      files.forEach(function (file) {
        var name = file.substr(0, file.lastIndexOf('.'));
        var path = '/blog/' + name;
        return path;
      });
    },
  );
}

function getSlugs(post, index) {
  let slug = post.substr(0, post.lastIndexOf('.'));
  return `/blog/${slug}`;
}

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit'],
  markdownit: {
    injected: true,
  },
  /*
   ** Build configuration
   */
  generate: {
    routes: function () {
      return files.map(getSlugs);
    },
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
