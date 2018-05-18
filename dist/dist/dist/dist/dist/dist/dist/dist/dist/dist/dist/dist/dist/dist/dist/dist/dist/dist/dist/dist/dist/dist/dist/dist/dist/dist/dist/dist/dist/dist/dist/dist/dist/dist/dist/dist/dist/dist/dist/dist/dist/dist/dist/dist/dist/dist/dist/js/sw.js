// console.log('sw file 2')

self.addEventListener('fetch', function(event) {
	console.log(event.request);

	// event.respondWith(
	// 	new Response('Hello world')
	// );

	event.respondWith(
		fetch(event.request).then( function(response) {
			if (response.status == 404) {
				return new Response("Sorry, we don't have what your are looking for ");
			}
			return response;
		}).catch(function() {
			return new Response("Oh no, something when very wrong. Maybe you are offline :( ")
		})
	);

});