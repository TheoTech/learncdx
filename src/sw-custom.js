/* global workbox */

// playback mp4s from cache
// The contents of this file are appended to the service worker generated by the CRA Weback configuration.
// Because we handle media assets in a special way, we need to intercept those files and
// serve them from the assets cache. See cra-append-sw for more information.

// from https://developers.google.com/web/tools/workbox/guides/advanced-recipes
// see also https://googlechrome.github.io/samples/service-worker/prefetch-video/

// TODO import cacheName and assetRouteRegExp from curriculum index.json
import sessions from './Sessions/index.json';
const { assetBaseUrls, assetCacheName, precachePublicAssets } = sessions;

// Also precache assets in the public folder which are needed, but not
// included in the CRA-generated preacache-manifest.
// TODO generate the revisions automatically so we don't have to specify them.
// TODO how about the localization files?
const publicAssetsToCache = [].concat(precachePublicAssets || []).map(pa => {
  pa.url = `%PUBLIC_URL%${pa.url}`;
  return pa;
});
workbox.precaching.precacheAndRoute(publicAssetsToCache, {});

// Now setup our use of the cache for media assets.
const cacheName = assetCacheName; // TODO what if it's not specified?

// Register routes for all assets we want to serve from cache.
assetBaseUrls.forEach(assetBaseUrl => {
  const assetRouteRegExp = new RegExp(
    assetBaseUrl + '(.(?!skipServiceWorker=true$))+$'
  );

  const assetCacheFirst = new workbox.strategies.CacheFirst({
    cacheName,
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin()
    ]
  });

  // to match videos hosted on another origin, we need to match the beginning of the url
  // see https://developers.google.com/web/tools/workbox/modules/workbox-routing
  workbox.routing.registerRoute(assetRouteRegExp, async ({ event }) => {
    try {
      return await assetCacheFirst.handle({ event });
    } catch (error) {
      console.log(error);
      return caches.match('');
    }
  });
});