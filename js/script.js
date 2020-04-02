let panstwa = [];
let confirmed = 0, deaths = 0, recovered = 0;
let newConfirmed = 0, newDeaths = 0, newRecovered = 0;


let xhr = new XMLHttpRequest();
let xhr2 = new XMLHttpRequest();
xhr.onload = function() {
	if(xhr.status ===200){
		responseObject = JSON.parse(xhr.responseText);
		
		for(let i=0; i<responseObject.Countries.length-2; i++){
			panstwa.push(responseObject.Countries[i+2]);
			// panstwa[i].flag = '<img width=32 alt="flag" src="img/'+(i+1)+'.png"> ';
			// console.log(panstwa[i].flag);
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
	for(let i=0; i<panstwa.length; i++){
		confirmed+=panstwa[i].TotalConfirmed;
		deaths+=panstwa[i].TotalDeaths;
		recovered+=panstwa[i].TotalRecovered;
		newConfirmed+=panstwa[i].NewConfirmed;
		newDeaths+=panstwa[i].NewDeaths;
		newRecovered+=panstwa[i].NewRecovered;

		// Insert a row at the end of the table
		let newRow = tableRef.insertRow(-1);
		newRow.insertCell(0).appendChild(document.createTextNode(panstwa[i].Country));

		// temp = newRow.insertCell(0);
		// $(temp).html(panstwa[i].flag+panstwa[i].Country);
		
		temp = newRow.insertCell(1);
		$(temp).html(panstwa[i].TotalConfirmed+"<span class='red'> (+"+panstwa[i].NewConfirmed+")</span>");

		temp = newRow.insertCell(2);
		$(temp).html(panstwa[i].TotalDeaths+"<span class='red'> (+"+panstwa[i].NewDeaths+")</span>");

		temp = newRow.insertCell(3);
		$(temp).html(panstwa[i].TotalRecovered+"<span class='green'> (+"+panstwa[i].NewRecovered+")</span>");
	}

	$(".confirmed").html(confirmed);
	$(".deaths").html(deaths);
	$(".recovered").html(recovered);
	$(".newConfirmed").html(newConfirmed+" today");
	$(".newDeaths").html(newDeaths+" today");
	$(".newRecovered").html(newRecovered+" today");
}

function sortowanie(){
    for(let i=0; i<panstwa.length; i++){
        for(let j=panstwa.length-1; j>i; j--){
            if(panstwa[j].TotalConfirmed>panstwa[j-1].TotalConfirmed)
                panstwa[j-1] = [panstwa[j], panstwa[j] = panstwa[j-1]][0];
        }
    }
}