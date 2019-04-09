let showUserTip = (id) => {
	let data = {
		'id': id,
	};
	let url = `/users`;
	fetch(url, {
    method: "POST", 
    mode: "cors", 
    cache: "default",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
  	console.log(data);
  });
}