// Attraverso una chiamata AJAX all’API di Boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di Handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus: Creare un select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nel select vedremo i corrispondenti cd.

$(document).ready(function () {
	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: 'GET',
		success: function (obj) {
			lowerCaseAttr(obj.response, 'genre');
			populate(obj.response);
			createOptions(obj.response);
			$('#genre').change(filterCategory);
		},
		error: function () {
			alert('È avvenuto un errore.');
		}
	});
});

// *** FUNCTIONS *** //
// Cambio in minuscolo dei 'genre' degli oggetti
function lowerCaseAttr(arr, attr) {
	for (var i = 0; i < arr.length; i++) {
		arr[i][attr] = arr[i][attr].toLowerCase();
	}
}

// Creazione dinamica di tutto il contenuto del DOM tramite Handlebars
function populate(data) {
	var source = $('#dom').html();
	var template = Handlebars.compile(source);

	for (var i = 0; i < data.length; i++) {
		var html = template(data[i]);
		$('.cds-container').append(html);
	}
}

// Creazione dinamica delle option del select
function createOptions(data) {
	$('header').after(`<select id="genre"></select>`);
	var allCategory = myReduce(data, 'genre');
	allCategory.unshift('all');

	for (var i = 0; i < allCategory.length; i++) {
		$('#genre').append(`<option value="${allCategory[i]}">${capitalize(allCategory[i])}</option>`);
	}
}

// Visualizzazione degli oggetti in base al 'genre' selezionato
function filterCategory() {
	var category = $('#genre').val();
	$('.cd').hide();
	category != 'all' ? $('.cd.' + category).show() : $('.cd').show();
}

// Creazione di un array di elementi senza ripetizioni
function myReduce(arr, attr) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		if (!result.includes(arr[i][attr])) {
			result.push(arr[i][attr]);
		}
	}
	return result;
}

// Primo carattere di una stringa in maiuscolo
function capitalize(str) {
	var firstChar = str.charAt(0).toUpperCase();
	return firstChar + str.slice(1).toLowerCase();
}



