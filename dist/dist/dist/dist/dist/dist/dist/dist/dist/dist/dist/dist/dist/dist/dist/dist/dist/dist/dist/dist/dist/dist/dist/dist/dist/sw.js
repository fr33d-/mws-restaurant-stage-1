self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('restaurant-caches').then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/restaurants.html',
				'js/restaurant_info.js',
				'data/restaurants.json',
				'js/dbhelper.js',
				'js/main.js',
				'css/styles.css',
				'img/1.jpg',
				'img/2@2x.jpg',
				'img/2.jpg',
				'img/3@2x.jpg',
				'img/3.jpg',
				'img/4@2x.jpg',
				'img/4.jpg',
				'img/5@2x.jpg',
				'img/5.jpg',
				'img/6@2x.jpg',
				'img/6.jpg',
				'img/7@2x.jpg',
				'img/7.jpg',
				'img/8@2x.jpg',
				'img/8.jpg',
				'img/9@2x.jpg',
				'img/9.jpg',
				'img/1@2x.jpg',
				'img/10.jpg',
				'img/10@2x.jpg',
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
	// console.log(event.request);
	event.respondWith(

		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request);
		})


		// fetch(event.request).then( function(response) {
		// 	if (response.status == 404) {
		// 		return fetch('/img/404.png');
		// 	}
		// 	return response;
		// }).catch(function() {
		// 	return fetch('/img/error.png');
		// })
	);

});