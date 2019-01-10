import Pokemon from './Pokemon';

//Object to contain all util apis to export
class Utils {
	/* 
	 * Get a random Pokemon ID
	 */
	randomPokemonID = function() {
		//BUG: This will likely remain hard-coded, many (if not all) pokemon after 649 seem to be
		//missing a back_default sprite which make them not appear in the battle screen.
		let numberOfPokemon = 649;
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