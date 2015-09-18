
function callbackFunction(json) {
	console.log(json);
	window.photos = json.data;
	// window.photos = [photos[0], photos[1], photos[2]];
	window.current_photo = 0;
	renderPhoto();
};

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

function updateNav() {
	var previous_button = document.getElementById('previous-button');
	var next_button = document.getElementById('next-button');
	if (current_photo == 0) {
		previous_button.removeAttribute('href');
		var nav_class = document.getElementsByClassName('button left-button')[0];
		nav_class.className = nav_class.className + " inactive";
		return false;
	}
	else {
		previous_button.setAttribute('href', '#');
		var nav_class = document.getElementsByClassName('button left-button')[0];
		nav_class.className = "button left-button";
	}

	if (current_photo >= photos.length -1) {
		next_button.removeAttribute('href');
		var nav_class = document.getElementsByClassName('button right-button')[0];
		nav_class.className = nav_class.className + " inactive"; 
		return false;
	}
	else {
		next_button.setAttribute('href', '#');
		var nav_class = document.getElementsByClassName('button right-button')[0];
		nav_class.className = "button right-button";
	}
};

function renderPhoto() {
	updateNav();
	var photo = photos[current_photo];
    var photo_url = photo.images.standard_resolution.url;
    var photo_title = photo.caption.text;
    var photo_link = photo.link;
    var lightbox = document.getElementById('lightbox');
    var title = document.getElementById('title');
    var lightbox_img = document.getElementById('lightbox-img');
    if (lightbox_img && lightbox_img.classList.contains("fadein")){
    	document.getElementById("lightbox-img").remove();
    }
    lightbox.innerHTML = '<a href="' + photo_link + '" target="_blank"><img id="lightbox-img" src="' + photo_url + '" /></a><div id="photo_title"></div>';
    var title_div = document.getElementById('photo_title');
    title_div.textContent = photo_title; // Prevent XSS
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

