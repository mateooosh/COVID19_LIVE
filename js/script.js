let countries = [];
let confirmed = 0, deaths = 0, recovered = 0;
let newConfirmed = 0, newDeaths = 0, newRecovered = 0;


let xhr = new XMLHttpRequest();
let xhr2 = new XMLHttpRequest();
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



function prepare(){
	sortowanie();
	let tableRef = document.querySelector('tbody');
	let temp ;
	for(let i=0; i<countries.length; i++){
		confirmed += countries[i].TotalConfirmed;
		deaths += countries[i].TotalDeaths;
		recovered += countries[i].TotalRecovered;
		newConfirmed += countries[i].NewConfirmed;
		newDeaths += countries[i].NewDeaths;
		newRecovered += countries[i].NewRecovered;

		// Insert a row at the end of the table
		let newRow = tableRef.insertRow(-1);
		newRow.insertCell(0).appendChild(document.createTextNode(countries[i].Country));

		// temp = newRow.insertCell(0);
		// $(temp).html(countries[i].flag+countries[i].Country);
		
		temp = newRow.insertCell(1);
		$(temp).html(`${countries[i].TotalConfirmed} <span class='red'> (+${countries[i].NewConfirmed})</span>`);

		temp = newRow.insertCell(2);
		$(temp).html(`${countries[i].TotalDeaths} <span class='red'> (+${countries[i].NewDeaths})</span>`);

		temp = newRow.insertCell(3);
		$(temp).html(`${countries[i].TotalRecovered} <span class='green'> (+${countries[i].NewRecovered})</span>`);
	}

	$(".confirmed").html(confirmed);
	$(".deaths").html(deaths);
	$(".recovered").html(recovered);
	$(".newConfirmed").html(`${newConfirmed} today`);
	$(".newDeaths").html(`${newDeaths} today`);
	$(".newRecovered").html(`${newRecovered} today`);
}

function sortowanie(){
    for(let i=0; i<countries.length; i++){
        for(let j=countries.length-1; j>i; j--){
            if(countries[j].TotalConfirmed>countries[j-1].TotalConfirmed)
                countries[j-1] = [countries[j], countries[j] = countries[j-1]][0];
        }
    }
}