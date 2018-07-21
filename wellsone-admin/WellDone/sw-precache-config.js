/**
 * Created by skurt on 21/11/16.
 */
module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.eot',
    'dist/**.svg',
    'dist/**.woff2',
    'dist/**.ttf',
    'dist/**.woff',
    'dist/**.ico',
    'dist/assets/images/**.jpg',
    'dist/assets/images/**.svg',
    'dist/assets/images/**.png'
  ],
   runtimeCaching: [
     {
       urlPattern: /\/articles\//,
       handler: 'networkFirst',
       options: {
         cache: {
           maxEntries: 20,
           name: 'articles-cache'
         }
       }
     },
     {
       urlPattern: /\/favorites\//,
       handler: 'networkFirst',
       options: {
         cache: {
           maxEntries: 20,
           name: 'favorites-cache'
         }
       }
     },
     {
       urlPattern: /\/underlined\//,
       handler: 'networkFirst',
       options: {
         cache: {
           maxEntries: 20,
           name: 'underlined-cache'
         }
       }
     }
   ]
};
