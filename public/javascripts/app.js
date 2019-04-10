const GenerateToltip = () => {
	let url = `/users`;
	fetch(url, {
	  method: "GET",
	})
	.then(response => response.json())
	.then(userData => {
		let userDivs = document.getElementsByClassName('user-info');
		for(let i = 0; i < userDivs.length; i++) {
			let id = userDivs[i].id;
			let div = document.createElement("div");
			div.className = "tooltip";
			let imgDiv = document.createElement("div");
			imgDiv.className = "tooltip-img";
			let textDiv = document.createElement("div");
			textDiv.className = "tooltip-txt";
			let paraName = document.createElement("P");
			let textName = document.createTextNode(`Name: ${userData.userData[id].username}`);
			paraName.appendChild(textName);
			let paraLocation = document.createElement("P");
			let textLocation = document.createTextNode(`Location: ${userData.userData[id].location}`); 
			paraLocation.appendChild(textLocation);
			let paraAbout = document.createElement("P");
			paraAbout.innerHTML = `About: ${userData.userData[id].about_me}`;
			let imgTag = document.createElement("IMG");
			imgTag.src = `${userData.userData[id].image_url}`;
			imgDiv.appendChild(imgTag);
			textDiv.appendChild(paraName);
			textDiv.appendChild(paraLocation);
			textDiv.appendChild(paraAbout);
			div.appendChild(imgDiv);
			div.appendChild(textDiv);
			userDivs[i].appendChild(div);
		}
	});
}


if(document.readyState === "complete" || 
	(document.readyState !== "loading" && !document.documentElement.doScroll)){
 	GenerateToltip();
} else {
  document.addEventListener("DOMContentLoaded", GenerateToltip);
}
