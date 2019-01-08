//import Pokemon from './Pokemon';

//Object to contain all util apis to export
var Utils = {};

/* 
 * Get a random Pokemon ID
 */
Utils.randomPokemonID = function() {
	//TODO: Update this to get from a fetch request, harcoding for now
	let numberOfPokemon = 720;
	return Math.floor(Math.random() * numberOfPokemon) + 1; 
}

Utils.queryPokemonByID = function(id, callback) {
	fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${id}/`)
      	.then(response => response.json())
      	.then(data => {
      		callback(data);
      	})
      	.catch(err => console.log(err));
}

exports.Utils = Utils;