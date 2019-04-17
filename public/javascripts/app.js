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
	GetRecommendation();
}

const GetRecommendation = () => {
	let url = `/getRecommendation`;
	fetch(url, {
	  method: "GET",
	})
	.then(response => response.json())
	.then(userData => {
		console.log(userData);
	});
}

const CreateLoadingScreen = (project) => {
	let Parentdiv = document.createElement("div");
	Parentdiv.className = "loader";
	let div = document.createElement("div");
	div.className = "lds-dual-ring";
	let paraName = document.createElement("P");
	paraName.style = 'text-align:center';
	let textName = document.createTextNode(`Fetching projects`);
	paraName.appendChild(textName);
	Parentdiv.appendChild(div);
	Parentdiv.appendChild(paraName);
	project.appendChild(Parentdiv);
}

const ClearDiv = (div) => {
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
	return true
}

const GetUrl = () => {
	let hash = window.location.hash;
	if(hash.indexOf('#') !== -1) {
		let index = hash.indexOf('#');
		let page = hash.slice(index + 1);
		if(!isNaN(page)) {
			let project = document.getElementById('project');
	  	if(ClearDiv(project)) {
	  		CreateLoadingScreen(project);
	  	}
			let data = {
				'id': page,
			}
			let url = `getPage`
			fetch(url, {
		    method: "POST",
		    mode: "cors",
		    cache: "no-cache",
		    credentials: "same-origin",
		    headers: {
		      "Content-Type": "application/json",
		    },
		    redirect: "follow",
		    referrer: "no-referrer",
		    body: JSON.stringify(data), 
		  })
		  .then(response => response.text())
		  .then(pageData => {
		  	if(ClearDiv(project)) {
		  		project.innerHTML = pageData;
					GenerateToltip();
		  	}
		  });
		}
	}
}

const Change = (id) => {
	window.location.hash = `${id}`;
	GetUrl();
}

let hash = window.location.hash;
if(hash.indexOf('#') !== -1) {
	let index = hash.indexOf('#');
	let page = hash.slice(index + 1);
	if(!isNaN(page)) {
		GetUrl();
	}
}

if(document.readyState === "complete" || 
	(document.readyState !== "loading" && !document.documentElement.doScroll)){
 	GenerateToltip();
} else {
  document.addEventListener("DOMContentLoaded", GenerateToltip);
}