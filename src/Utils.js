import Pokemon from './Pokemon';

//Object to contain all util apis to export
class Utils {
	/* 
	 * Get a random Pokemon ID
	 */
	randomPokemonID = function() {
		//TODO: Update this to get from a fetch request, harcoding for now
		let numberOfPokemon = 720;
		return Math.floor(Math.random() * numberOfPokemon) + 1; 
	}

	queryPokemonByID = function(id, callback) {
		//TODO: This is a backup API as the original one was sometimes responding with a permission denied (this one is very slow)
		//fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${id}/`)
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
	      	.then(response => response.json())
	      	.then(data => {
	      		const pokemon = new Pokemon(data);
	      		callback(pokemon);
	      	})
	      	.catch(err => console.log(err));
	}

	queryTypeByURL = function(url, callback) {
		fetch(url)
	      	.then(response => response.json())
	      	.then(data => {
	      		callback(data);
	      	})
	      	.catch(err => console.log(err));
	}
};

export default Utils;