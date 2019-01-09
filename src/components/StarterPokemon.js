import React, { Component } from 'react';
import Pokemon from '../Pokemon';
import './styles/StarterPokemon.css';
import Utils from '../Utils'

//Import utils js
const utils = new Utils();

class StarterPokemon extends Component {  
	constructor(props) {
        super(props);

        //State Object : pokemon - current pokemon of interest
        this.state = {
            pokemon : []
        };

        //Bind this to events
        this.addPokemonToState = this.addPokemonToState.bind(this);

        //The number of randomly selected pokemon to choose from
        //TODO: This only work with up to three. anymore will not be displayed as its hardcoded
        this.totalNumberOfPokemon = 3;

        //Select first three pokemon randomly 
        for (var x = 0; x < this.totalNumberOfPokemon; x++) {
        	this.addRandomPokemon(this.addPokemonToState);	
        }
    }

    /*
     * Adds new pokemon to the list and pushes it to the state object 
     */
    addPokemonToState(newPokemon) {
    	const pokemonList = this.state.pokemon;
    	pokemonList.push(newPokemon);
    	this.setState({pokemon : pokemonList});

    	//Call the loading callback when all pokemon are done loading
    	if(this.state.pokemon.length == this.totalNumberOfPokemon) {
    		this.props.loadedPokemonCallback();	
    	}
    }

	/*
	 *	Randomly select a pokemon to return
	 */
	addRandomPokemon (callBack) {
		utils.queryPokemonByID(utils.randomPokemonID(), callBack);
	}
	
	//TODO: Maybe find a way to dynamically create images
	render() {	
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
                <audio
                    src="http://66.90.93.122/ost/pokemon-gameboy-sound-collection/svlclmai/101-opening.mp3"
                    type="audio/mpeg"
                    autoPlay
                    controls
                />              
			</section>
		)
	}
};

export default StarterPokemon;


//https://www.prmhub.com/downloads/mp3s/01_-_Mighty_Morphin_Power_Rangers/11.Ron.Wasserman.Go,Go.Power.Rangers.TV-[RAW][8EB406D7].mp3