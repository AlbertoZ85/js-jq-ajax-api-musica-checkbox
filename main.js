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
			createCheckbox(obj.response);
			$('input').change(changeCheck);
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
function createCheckbox(data) {
	$('header').after(`<div id="checkbox"></div>`);
	var allCategory = myReduce(data, 'genre');

	for (var i = 0; i < allCategory.length; i++) {
		$('#checkbox').append(`
		<div class="genre">
        	<input type="checkbox" id="gen${i}" value="${allCategory[i]}">
        	<label for="gen${i}">${capitalize(allCategory[i])}</label>
    	</div>`);
	}
}

// Visualizzazione degli oggetti in base al 'genre' selezionato
function changeCheck() {
	var countUnchecked = 0;
	for (var i = 0; i < 4; i++) {
		var thisCategory = $(`#gen${i}`);
		if (!thisCategory.prop('checked')) {
			$('.cd.' + thisCategory.val()).hide();
			countUnchecked++;
		} else {
			$('.cd.' + thisCategory.val()).show();
		}
	}

	if (countUnchecked == 0 || countUnchecked == 4) {
		$('.cd').show();
	}
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



