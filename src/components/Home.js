import React from 'react';
import './styles/Home.css';


const Home = ({catchPokemon, pokemonStorage}) => {
	/*
	 *	Randomly select a pokemon to return
	 */
	const getARandomPokemon = () => {
		//TODO: Update this to get from a fetch request, harcoding for now
		let numberOfPokemon = 720;
		let selectedPokemon = Math.floor(Math.random() * numberOfPokemon) + 1; 
		catchPokemon(selectedPokemon);
	}
  	return (
  		<div className="Home">
  			<a onClick={getARandomPokemon}> Catch Pokemon </a>
  			<a onClick={pokemonStorage}> Oak's PC </a>
  		</div>
  	)
};

export default Home;
