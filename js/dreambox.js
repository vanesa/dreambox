
function callbackFunction(json) {
	console.log(json);

	if (json.meta.code == 200) {
		window.photos = json.data;
		// window.photos = [photos[0], photos[1], photos[2]];
		window.current_photo = 0;
		renderPhoto();
	}
	else {
		var lightbox = document.getElementById('lightbox');
		lightbox.innerHTML = '<img id="lightbox-img" src="images/sorry.png" class="sorry"/>';
	}
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

    var title = photo.caption.text;
    // console.log(title);
	var title_div = document.getElementById('photo_title');

    var blacklist = ["hot", "sex", "click here", "go here", "babes", "sexywoman"];
    
    var blocked = false;

    for (var i = 0; i < blacklist.length - 1; i++) {
    	var re = new RegExp('[^\\w]' + blacklist[i].toLowerCase() + '[^\\w]');
    	if (re.exec(title.toLowerCase())) {
    		// dont render this photo
    		blocked = true;
    	}
    }

	// Remove old fadein class
    var lightbox_img = document.getElementById('lightbox-img');
    if (lightbox_img && lightbox_img.classList.contains("fadein")){
    	document.getElementById("lightbox-img").remove();
    }
    // Add new photo or video to DOM
    var lightbox = document.getElementById('lightbox');
    var link = 'href="' + photo.link + '" target="_blank"';
    var url = photo.type == "video" ? photo.videos.standard_resolution.url : photo.images.standard_resolution.url; // ternary operator
	if (blocked) {
		url = "images/naughty.png";
		link = "";
	}
	if (photo.type == "video") {
	    lightbox.innerHTML = '<a ' + link + '><video id="lightbox-img" src="' + url + '" controls></video></a><div id="photo_title"></div>';
	} else {
	    lightbox.innerHTML = '<a ' + link + '><img id="lightbox-img" src="' + url + '" /></a><div id="photo_title"></div>';
	}
	// Update caption separately using textContent to prevent XSS (Cross Site Scripting)
	var title_div = document.getElementById('photo_title');
    title_div.textContent = title;
		
};

function prepareButtons() {
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
}

// function loadPhotos() {
// 	var newElement = document.createElement("script");
// 	newElement.setAttribute("src", "https://api.instagram.com/v1/tags/dream/media/recent?client_id=e77ecf67bd0443a4af523e63004712d5&callback=callbackFunction");
// 	document.body.appendChild(newElement);
// }

// loadPhotos();
prepareButtons();
