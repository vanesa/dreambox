
function callbackFunction(json) {
	console.log(json);
	window.photos = json.data;
	window.photos = [photos[0], photos[1], photos[2]];
	window.current_photo = 0;
	renderPhoto();
};

function renderPhoto() {
	var photo = photos[current_photo];
    var photo_url = photo.images.standard_resolution.url;
    var lightbox = document.getElementById('lightbox');
    lightbox.innerHTML = '<img src="' + photo_url + '" />';
}

document.getElementById('previous-button').onclick = function(){
    if (window.current_photo == 0) {
    	return false;
    }
    window.current_photo -= 1;
    renderPhoto();
    return false;
};

document.getElementById('next-button').onclick = function(){
	if (window.current_photo >= window.photos.length - 1){
		return false;
	}
    window.current_photo += 1;
    renderPhoto();
    return false;
};

