

	$(function() {

		//smooth scroll begins
		$('a').smoothScroll();
		speed: 900

		$("#submitButton").on("click", function(){
			$.smoothScroll({
				scrollTarget: "#recipePage"
			});
		});
	});


var recipeApp = {};
recipeApp.apiKey = '90d74d57ba178995545d7d19416b7a1c';
recipeApp.apiId = '7ddd3ed7';
recipeApp.apiUrl = 'http://api.yummly.com/v1/api/recipes';

recipeApp.getRecipes = function(country, protein) {
	$.ajax({
		url: recipeApp.apiUrl,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			_app_key: recipeApp.apiKey,
			_app_id: recipeApp.apiId,
			requirePictures: true,
			maxResult: 75,
			maxTotalTimeInSeconds: 5400,
			q: country,
			allowedIngredient: protein,
		} 
	}).then(function(recipeData){
		console.log("recipe", recipeData);
		recipeApp.displayRecipe(recipeData.matches);
	});
};

// allows us to have a vegetarian option
recipeApp.getVegRecipes = function(country) {
	$.ajax({
		url: recipeApp.apiUrl,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			_app_key: recipeApp.apiKey,
			_app_id: recipeApp.apiId,
			requirePictures: true,
			maxResult: 75,
			maxTotalTimeInSeconds: 5400,
			q: country,
			allowedDiet: '386^Vegan', 		 
		} 
	}).then(function(recipeData){
		console.log("recipe", recipeData);

		recipeApp.displayRecipe(recipeData.matches);
	});
};

recipeApp.displayRecipe = function(data) {
	$('#recipePage').empty();
	var random = Math.floor(Math.random() * data.length);
	
			var recipeContainer = $('<div>').addClass('recipeBox');
			var recipeName = $('<h2>').text(data[random].recipeName);
			var urlImage = data[random].smallImageUrls[0].replace(/s90/g, 's500');
			// will take urlImage and add it to recipeImage.  
			var recipeImage = $('<img>').attr('src', urlImage)
			var recipeDurationSeconds = data[random].totalTimeInSeconds;
			var recipeDuration = "Ready in " + (recipeDurationSeconds / 60) + " Minutes"; 
            var recipeID = "https://www.yummly.com/recipe/" + data[random].id; 
            var recipeLink = $('<a target="_blank">').attr('href', recipeID).append('<button a href="' + recipeID + '" class="recipeButton">View recipe</button>');
         	
			recipeContainer.append(recipeName, recipeDuration, recipeImage, recipeLink);
			$('#recipePage').append(recipeContainer);	
			console.log(recipeContainer);		
};

recipeApp.init = function() {	
	$('form').on('submit', function(e){
		e.preventDefault();
		var veggieOption = [];
		var country = $('input[name=country]:checked').val();
		var protein = $('input[name=protein]:checked').val();
			recipeApp.getRecipes(country, protein);
		// this alows us to choose a vegatarian option
		if(protein === "vegetarian") {
			// console.log("its veggie");
			recipeApp.getVegRecipes(country);
		}
		else {
			recipeApp.getRecipes(country, protein);
		}
			//shows retake quiz button and footer
		$("button.reset").removeClass("hidden");
		$(".footer").removeClass("hidden");
	});	

	// Refreshes page when button is clicked
	$(".reset").on("click", function(){
		location.reload();
		$("body").scrollTop(0);
	});
};

$(function() {
	// We call our .init because we want the browser
	// to be ready before our application starts.
	recipeApp.init();
});


// =========================================================
// +++++++++ DO NOT TOUCH BELOW for LCBO API +++++++++++++++++++++++++++
// =========================================================

// 	$(function() {

// 		//smooth scroll begins
// 		$('a').smoothScroll();
// 		speed: 900

// 		$("#submitButton").on("click", function(){
// 			$.smoothScroll({
// 				scrollTarget: "#recipePage"
// 			});
// 		});
// 	});

// var recipeApp = {};
// recipeApp.apiKey = '90d74d57ba178995545d7d19416b7a1c';
// recipeApp.apiId = '7ddd3ed7';
// recipeApp.apiUrl = 'http://api.yummly.com/v1/api/recipes';

// recipeApp.getRecipes = function(country, protein) {
// 	$.ajax({
// 		url: recipeApp.apiUrl,
// 		method: 'GET',
// 		dataType: 'jsonp',
// 		data: {
// 			_app_key: recipeApp.apiKey,
// 			_app_id: recipeApp.apiId,
// 			requirePictures: true,
// 			maxResult: 75,
// 			maxTotalTimeInSeconds: 5400,
// 			q: country,
// 			allowedIngredient: protein,
// 		} 
// 	}).then(function(recipeData){
// 		console.log("recipe", recipeData);
// 		recipeApp.displayRecipe(recipeData.matches);
// 	});
// };

// // this is the object that allows us to have a vegetarian option
// recipeApp.getVegRecipes = function(country) {
// 	$.ajax({
// 		url: recipeApp.apiUrl,
// 		method: 'GET',
// 		dataType: 'jsonp',
// 		data: {
// 			_app_key: recipeApp.apiKey,
// 			_app_id: recipeApp.apiId,
// 			requirePictures: true,
// 			maxResult: 75,
// 			maxTotalTimeInSeconds: 5400,
// 			q: country,
// 			allowedDiet: '386^Vegan', 		 
// 		} 
// 	}).then(function(recipeData){
// 		console.log("recipe", recipeData);

// 		recipeApp.displayRecipe(recipeData.matches);
// 	});
// };

// // Drinks

// recipeApp.drinksKey = 'MDoyNmNlZGM2OC01Y2IzLTExZTYtYjFlMC0wN2E0ZGMzNWI4YjY6b3VqV01CV3N1QUkyODFSbDlWY2cxTmNpWWQxMHFleDNlbTI1';
// recipeApp.drinksApiUrl = 'https://lcboapi.com/products';
			
// 		recipeApp.getDrinks = function(drink){
// 			 $.ajax({
// 			url: recipeApp.drinksApiUrl,
// 			method: 'GET',
// 			dataType: 'json',
// 			data: {
// 				// Currently searching for beer, will change according to user input
// 				product: drink,
// 				// Filtering the results per page below
// 				per_page: '100',
// 				// Being appended to the url
// 				access_key: recipeApp.drinksKey
// 			}
// 		}).then(function(drinksData){
// 			console.log("drinks", drinksData);
// 			recipeApp.displayDrink(drinksData.products)
// 		})
// 	};
// // };

// recipeApp.displayRecipe = function(data) {
// 	$('#recipePage').empty();
// 	var random = Math.floor(Math.random() * data.length);
	
// 			var recipeContainer = $('<div>').addClass('recipeBox');
// 			var recipeName = $('<h2>').text(data[random].recipeName);
// 			var urlImage = data[random].smallImageUrls[0].replace(/s90/g, 's500');
// 			// will take urlImage and add it to recipeImage.  
// 			var recipeImage = $('<img>').attr('src', urlImage)
// 			var recipeDurationSeconds = data[random].totalTimeInSeconds;
// 			var recipeDuration = "Ready in " + (recipeDurationSeconds / 60) + " Minutes"; 
//             var recipeID = "https://www.yummly.com/recipe/" + data[random].id; 
//             var recipeLink = $('<a target="_blank">').attr('href', recipeID).append('<button a href="' + recipeID + '" class="recipeButton">View recipe</button>');
         	
// 			recipeContainer.append(recipeName, recipeDuration, recipeImage, recipeLink);
// 			$('#recipePage').append(recipeContainer);	
// 			console.log(recipeContainer);		
// };

// // new drinks
// recipeApp.displayDrink = function(dataDrink) {
// 	$('#drinkPage').empty();
// 	// var randomDrink = Math.floor(Math.random() * dataDrink.length);

// 			var drinkContainer = $('<div>').addClass('drinkBox');
// 			var drinkName = $('<h2>').text(dataDrink.name);
// 			var urlImage = dataDrink.image_url;
// 			// will take urlImage and add it to recipeImage.  
// 			var drinkImage = $('<img>').attr('src', urlImage)
           
// 			drinkContainer.append(drinkName, drinkImage);
// 			$('#drinkPage').append(drinkContainer);	
// 			console.log(drinkContainer);		
// };

// recipeApp.init = function() {
	
// 	$('form').on('submit', function(e){

// 		e.preventDefault();
// 		var veggieOption = [];
// 		var country = $('input[name=country]:checked').val();
// 		var protein = $('input[name=protein]:checked').val();
// 			recipeApp.getRecipes(country, protein);

// 		// dirinks new
// 		var drink = $('input[name=drink]:checked').val();
// 			recipeApp.getDrinks(drink);


// 		// this alows us to choose a vegatarian option
// 		if(protein === "vegetarian") {
// 			// console.log("its veggie");
// 			recipeApp.getVegRecipes(country);
// 		}
// 		else {
// 			recipeApp.getRecipes(country, protein);
// 		}
// 			//shows retake quiz button
// 		$("button.reset").removeClass("hidden");
// 	});	

// 	// Refreshes page when button is clicked
// 	$(".reset").on("click", function(){
// 		location.reload();
// 		$("body").scrollTop(0);
// 	});

// };

// $(function() {
// 	// We call our .init because we want the browser
// 	// to be ready before our application starts.
// 	recipeApp.init();
// });











