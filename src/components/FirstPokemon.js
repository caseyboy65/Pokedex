import React, { Component } from 'react';
import Pokemon from '../Pokemon';
//import './styles/PokeCell.css';

//Import utils js
const Utils = require('../Utils.js').Utils

class FirstPokemon extends Component {  
	constructor(props) {
        super(props);

        //State Object : pokemon - current pokemon of interest
        this.state = {
            pokemon: {}
        };

        this.firstPokemonCallback = this.firstPokemonCallback.bind(this);
    }

    firstPokemonCallback(data) {
    	const firstPokemon = new Pokemon(data);
    	this.setState({pokemon : firstPokemon});
    	this.props.loadedPokemonCallback();
    }
	/*
	 *	Randomly select a pokemon to return
	 */
	addRandomPokemon (callBack) {
		Utils.queryPokemonByID(Utils.randomPokemonID(), callBack);
	}
	render() {
		this.addRandomPokemon(this.firstPokemonCallback);
		return (
			<section> 
				<a onClick={() => this.props.pokemonSelectedCallback(this.state.pokemon)}> Select Pokemon </a>
				<p>Say hello to your first pokemon for your adventure : {this.state.pokemon.name}</p>
			</section>
		)
	}
};

export default FirstPokemon;