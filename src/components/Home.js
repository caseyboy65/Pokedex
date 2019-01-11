import React from 'react';
import './styles/Home.css';

const Home = ({catchPokemon, pokemonStorage}) => {
  	return (
  		<section className="Home">
  			<button onClick={catchPokemon}> Catch Pokemon </button>
  			<button onClick={pokemonStorage}> Oak's PC </button>
  		</section>
  	)
};

export default Home;
