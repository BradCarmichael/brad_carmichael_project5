

$(function() {
		//smooth scroll begins
		$('a').smoothScroll();
		speed: 900

		$("#submitButton").on("click", function(){	
		});
	});

// Object
var recipeApp = {};
recipeApp.apiKey = '90d74d57ba178995545d7d19416b7a1c';
recipeApp.apiId = '7ddd3ed7';
recipeApp.apiUrl = 'http://api.yummly.com/v1/api/recipes';

// Method  / Function 
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
			// How long the recipe takes to make
			maxTotalTimeInSeconds: 5400,
			q: country,
			allowedIngredient: protein,
		} 
	}).then(function(recipeData){
		console.log("recipe", recipeData);
		// .matches is associated with the data that comes back
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
		// .matches is associated with the data that comes back
		recipeApp.displayRecipe(recipeData.matches);
	});
};

// Display Recipe
// Method / Function
recipeApp.displayRecipe = function(data) {
	// Clears out search and reloads page with new search query
	$('#recipePage').empty();
	// Generates a random recipe based on the users input
	var random = Math.floor(Math.random() * data.length);
	
			var recipeContainer = $('<div>').addClass('recipeBox');
			var recipeName = $('<h2>').text(data[random].recipeName);
			// Using a regular expression to make the photo size larger
			var urlImage = data[random].smallImageUrls[0].replace(/s90/g, 's500');
			// Takes urlImage and adds it to recipeImage using the attribute method  
			var recipeImage = $('<img>').attr('src', urlImage)
			var recipeDurationSeconds = data[random].totalTimeInSeconds;
			// Displays the total time in minutes
			var recipeDuration = "Ready in " + (recipeDurationSeconds / 60) + " Minutes"; 
			// Allows us to have a link to the recipe on the Yummly website
            var recipeID = "https://www.yummly.com/recipe/" + data[random].id; 
            var recipeLink = $('<a target="_blank">').attr('href', recipeID).append('<button a href="' + recipeID + '" class="recipeButton">View recipe</button>');
         	// Using .append to add elements to other elements before adding them to the page
			recipeContainer.append(recipeName, recipeDuration, recipeImage, recipeLink);
			// adding the contents of recipeContainer to the recipePage ID.
			$('#recipePage').append(recipeContainer);	
			console.log(recipeContainer);	
			// smooth scroll
			$.smoothScroll({
				scrollTarget: "#recipePage"
			});	
};

// Initialize 
recipeApp.init = function() {	
	$('form').on('submit', function(e){
		e.preventDefault();
		var veggieOption = [];
		var country = $('input[name=country]:checked').val();
		var protein = $('input[name=protein]:checked').val();
			recipeApp.getRecipes(country, protein);
		
		// Allows us to choose a vegetarian option
		// name ==== "value" /  input fields
		if(protein === "vegetarian") {
			recipeApp.getVegRecipes(country);
		}
		else {
			recipeApp.getRecipes(country, protein);
		}
		// Displays retake quiz button and footer
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
	// Call our .init so the browser
	// is ready before our application starts.
	recipeApp.init();
});












