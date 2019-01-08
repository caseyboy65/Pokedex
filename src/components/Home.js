import React from 'react';
import './styles/Home.css';

const Home = ({catchPokemon, pokemonStorage}) => {
	//Import utils js
	const Utils = require('../Utils.js').Utils
	/*
	 *	Randomly select a pokemon to return
	 */
	const getARandomPokemon = () => {
		catchPokemon(Utils.randomPokemonID());
	}
  	return (
  		<section className="Home">
  			<a onClick={getARandomPokemon}> Catch Pokemon </a>
  			<a onClick={pokemonStorage}> Oak's PC </a>
  		</section>
  	)
};

export default Home;
