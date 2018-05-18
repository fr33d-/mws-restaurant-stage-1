console.log('sw file ')

self.addEventListener('fetch', function(event) {
	console.log(event.request);
	console.log('event')
});