// console.log('sw file 2')

self.addEventListener('fetch', function(event) {
	console.log(event.request);
	console.log('event')
});