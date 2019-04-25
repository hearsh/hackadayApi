/*
Generates a tooltip for each users of every project on the page
Dynamically creates a view for the same.
*/
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

/*
Gets recommendations if any.
If there exist some recomendations it displays them for the user.
*/
const GetRecommendation = async () => {
	let recommenderDiv = document.getElementById('recommender');
	let projectDiv = document.getElementById('projects-recommended');
	if(projectDiv) {
		ClearDiv(projectDiv);
		projectDiv.remove();
	}
	let userDiv = document.getElementById('users-recommended');
	if(userDiv) {
		ClearDiv(userDiv);
		userDiv.remove();
	}
	let url = `/getRecommendation`;
	fetch(url, {
	  method: "GET",
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		if(data.projectData) {
			let projectDiv = document.createElement("div");
			projectDiv.style = 'text-align: left; padding: 10px';
			projectDiv.innerHTML = '<b>Projects</b>';
			projectDiv.id = 'projects-recommended';
			let ul = document.createElement("ul");
			for(key in data.projectData) {
				let listItem = document.createElement("li");
				listItem.innerHTML = `<a href='${data.projectData[key].link}' style='color:#fff;'>${data.projectData[key].name}</a>`;
				ul.appendChild(listItem);
			}
			if(ul.firstChild) {
				projectDiv.appendChild(ul);
				recommenderDiv.appendChild(projectDiv);
			}
		}
		if(data.usersData) {
			let userDiv = document.createElement("div");
			userDiv.style = 'text-align: left; padding: 10px';
			userDiv.innerHTML = '<b>Users</b>';
			userDiv.id = 'users-recommended';
			let ul = document.createElement("ul");
			for(key in data.usersData) {
				let listItem = document.createElement("li");
				listItem.innerHTML = `<a href='${data.usersData[key].link}' style='color:#fff;' target='blank'>${data.usersData[key].name}</a>`;
				ul.appendChild(listItem);
			}
			if(ul.firstChild) {
				userDiv.appendChild(ul);
				recommenderDiv.appendChild(userDiv);
			}
		}
	});
}

/*
Generates a loading screen
*/
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

/*
Clears all child elements from a div.
*/
const ClearDiv = (div) => {
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
	return true
}

/*
Checks if the hash route contains a page number.
Fetches data based on the page number.
*/
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

/*
Changes the hash route of the page.
fires the GetUrl() after.
*/
const Change = (id) => {
	window.location.hash = `${id}`;
	GetUrl();
}

/*
Checks if the hash route has been changed.
Fires the tooltip if the page is loaded.
*/
let hash = window.location.hash;
if(hash.indexOf('#') !== -1) {
	let index = hash.indexOf('#');
	let page = hash.slice(index + 1);
	if(!isNaN(page)) {
		GetUrl();
	}
} else {
	if(document.readyState === "complete" || 
		(document.readyState !== "loading" && !document.documentElement.doScroll)){
	 	GenerateToltip();
	} else {
	  document.addEventListener("DOMContentLoaded", GenerateToltip);
	}
}