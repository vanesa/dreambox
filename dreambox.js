
function callbackFunction(json) {
	console.log(json);
	window.photos = json.data;
	window.current_photo = 0;
    var photo = photos[current_photo];
    var photo_url = photo.images.standard_resolution.url
    console.log(photo_url);
    var lightbox = document.getElementById('lightbox');
    console.log(lightbox);
    lightbox.innerHTML = '<img src="' + photo_url + '" />';

};
