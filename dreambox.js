
function callbackFunction(json) {
	console.log(json);
	window.photos = json.data;
	window.current_photo = 0;
    var photo = photos[current_photo];
    var photo_url = photo.images.standard_resolution.url
    var lightbox = document.getElementById('lightbox');
    lightbox.innerHTML = '<img src="' + photo_url + '" />';
};

document.getElementById('previous-photo').onclick = function(){
    if (window.current_photo == 0) {
    	return false;
    }
    window.current_photo -= 1;
    var photo = photos[current_photo];
    var photo_url = photo.images.standard_resolution.url
    var lightbox = document.getElementById('lightbox');
	lightbox.innerHTML = '<img src="' + photo_url + '" />';
    return false;
};

document.getElementById('next-photo').onclick = function(){
	if (window.current_photo >= window.photos.length - 1){
		return false;
	}
    window.current_photo += 1;
    var photo = photos[current_photo];
    var photo_url = photo.images.standard_resolution.url
    var lightbox = document.getElementById('lightbox');
	lightbox.innerHTML = '<img src="' + photo_url + '" />';
    return false;
};