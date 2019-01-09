import React, { Component } from 'react';
import Pokemon from '../Pokemon';
import './styles/StarterPokemon.css';

//Import utils js
const Utils = require('../Utils.js').Utils

class StarterPokemon extends Component {  
	constructor(props) {
        super(props);

        //State Object : pokemon - current pokemon of interest
        this.state = {
            pokemon : []
        };

        //The number of randomly selected pokemon to choose from
        this.startingPokemonToChoice = 3;
        this.queriedPokemon = 0;

        this.addPokemonToState = this.addPokemonToState.bind(this);
    }

    /*
     * Adds new pokemon to the list and pushes it to the state object 
     */
    addPokemonToState(data) {
    	const newPokemon = new Pokemon(data);
    	const pokemonList = this.state.pokemon;
    	pokemonList.push(newPokemon);
    	this.setState({pokemon : pokemonList});

    	//Call the loading callback when all pokemon are done loading
    	if(this.state.pokemon.length == this.startingPokemonToChoice) {
    		this.props.loadedPokemonCallback();	
    	}
    }
	/*
	 *	Randomly select a pokemon to return
	 */
	addRandomPokemon (callBack) {
		if (this.queriedPokemon == this.startingPokemonToChoice) { return; } 

		Utils.queryPokemonByID(Utils.randomPokemonID(), callBack);
		this.queriedPokemon++;
	}
	render() {
		//TODO: This is called each time a pokemon is added and re-renders. find a way to call this only once
		//and clean up the pokemonQueried state as the workaround
		this.addRandomPokemon(this.addPokemonToState);
		this.addRandomPokemon(this.addPokemonToState);
		this.addRandomPokemon(this.addPokemonToState);
		return (
			<section className="starter-pokemon"> 
				<p>Choose your first pokemon </p>
				<div className="pokemon-picker">
					{this.state.pokemon[0] ? 
						<img src={this.state.pokemon[0].sprite} 
							 onClick={() => this.props.pokemonSelectedCallback(this.state.pokemon[0])} /> : null}
					{this.state.pokemon[1] ? 
						<img src={this.state.pokemon[1].sprite} 
							 onClick={() => this.props.pokemonSelectedCallback(this.state.pokemon[1])} /> : null}
					{this.state.pokemon[2] ? 
						<img src={this.state.pokemon[2].sprite} 
							 onClick={() => this.props.pokemonSelectedCallback(this.state.pokemon[2])} /> : null}
				</div>	
			</section>
		)
	}
};

export default StarterPokemon;