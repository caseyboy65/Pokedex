import React from 'react';
import './styles/Home.css';

const Home = ({catchPokemon, pokemonStorage}) => {
  	return (
  		<section className="Home">
  			<a onClick={catchPokemon}> Catch Pokemon </a>
  			<a onClick={pokemonStorage}> Oak's PC </a>
  		</section>
  	)
};

export default Home;
