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
			var allCategories = myReduce(obj.response, 'genre');
			populate(obj.response);
			createCheckbox(allCategories);
			$('input').change(allCategories, changeCheck); // eventuali argomenti da passare a una callback (changeCheck) di un metodo jQuery (change) vengono convertiti in oggetti
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
function createCheckbox(categories) {
	$('header').after(`<div id="checkbox"></div>`);

	for (var i = 0; i < categories.length; i++) {
		$('#checkbox').append(`
		<div class="genre">
        	<input type="checkbox" id="gen${i}" value="${categories[i]}">
        	<label for="gen${i}">${capitalize(categories[i])}</label>
    	</div>`);
	}
}

// Visualizzazione degli oggetti in base al 'genre' selezionato
function changeCheck(obj) {
	var countUnchecked = 0;
	for (var i = 0; i < obj.data.length; i++) {
		var thisCategory = $(`#gen${i}`);
		if (!thisCategory.prop('checked')) {
			$('.cd.' + thisCategory.val()).hide();
			countUnchecked++;
		} else {
			$('.cd.' + thisCategory.val()).show();
		}
	}

	if (countUnchecked == 0 || countUnchecked == obj.data.length) {
		$('.cd').show();
	}

	// Variante con le condizioni sullo stato della proprietà 'checked'
	// var allChecked = $('input').not(':checked').length;
	// var allUnchecked = !$('input').is(':checked');

	// if (allChecked == 0 || allUnchecked) {
	// 	$('.cd').show();
	// }
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



