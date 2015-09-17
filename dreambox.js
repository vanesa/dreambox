
function callbackFunction(json) {
	console.log(json);
	window.photos = json.data;
	window.photos = [photos[0], photos[1], photos[2]];
	window.current_photo = 0;
	renderPhoto();
};

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

function renderPhoto() {
	var photo = photos[current_photo];
    var photo_url = photo.images.standard_resolution.url;
    var lightbox = document.getElementById('lightbox');
    var lightbox_img = document.getElementById('lightbox-img');
    if (lightbox_img && lightbox_img.classList.contains("fadein")){
    	document.getElementById("lightbox-img").remove();
    	console.log('Removed class');
    }
    lightbox.innerHTML = '<img id="lightbox-img" src="' + photo_url + '" />';
    var lightbox_img = document.getElementById('lightbox-img');
    lightbox_img.setAttribute('class', 'fadein');
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

