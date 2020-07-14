let countries = [];

let xhr = new XMLHttpRequest();
xhr.onload = function() {
	if(xhr.status ===200){
		responseObject = JSON.parse(xhr.responseText);
		
		for(let i=0; i<responseObject.Countries.length-2; i++){
			countries.push(responseObject.Countries[i+2]);
		}
	}
	prepare();
};

xhr.open("GET", 'https://api.covid19api.com/summary', true);
xhr.send(null);



let prepare = () => {
	sort();
	let tableRef = document.querySelector('tbody');
	let temp ;
	for(let i=0; i<countries.length; i++){

		// Insert a row at the end of the table
		let newRow = tableRef.insertRow(-1);
		newRow.insertCell(0).appendChild(document.createTextNode(countries[i].Country));
		
		temp = newRow.insertCell(1);
		$(temp).html(`${countries[i].TotalConfirmed} <span class='red'> (+${countries[i].NewConfirmed})</span>`);

		temp = newRow.insertCell(2);
		$(temp).html(`${countries[i].TotalDeaths} <span class='red'> (+${countries[i].NewDeaths})</span>`);

		temp = newRow.insertCell(3);
		$(temp).html(`${countries[i].TotalRecovered} <span class='green'> (+${countries[i].NewRecovered})</span>`);
	}
}

let sort = () => {
    for(let i=0; i<countries.length; i++){
        for(let j=countries.length-1; j>i; j--){
            if(countries[j].TotalConfirmed>countries[j-1].TotalConfirmed)
                countries[j-1] = [countries[j], countries[j] = countries[j-1]][0];
        }
    }
}