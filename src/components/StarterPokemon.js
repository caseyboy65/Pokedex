import React, { Component } from 'react';
import Pokemon from '../Pokemon';
import DetailView from './DetailView';
import './styles/StarterPokemon.css';
import Utils from '../Utils'

//Import utils js
const utils = new Utils();

class StarterPokemon extends Component {  
	constructor(props) {
        super(props);

        //State Object : pokemon - current pokemon of interest
        this.state = {
            pokemon : [],
            viewPokemonDetails : false,
            currentSelectedPokemon: {}
        };

        //Bind this to events
        this.addPokemonToState = this.addPokemonToState.bind(this);
        this.selectAndViewPokemon = this.selectAndViewPokemon.bind(this);

        //The number of randomly selected pokemon to choose from
        //TODO: This only work with up to three in terms of css, may need to find a why to make it more dynamic
        this.totalNumberOfPokemon = 3;

        //Select first three pokemon randomly 
        for (var x = 0; x < this.totalNumberOfPokemon; x++) {
        	this.addRandomPokemon(this.addPokemonToState);	
        }
    }

    /*
     * Set the current pokemon to view
     */
    selectAndViewPokemon(pokemon) {
        this.setState({viewPokemonDetails: true, currentSelectedPokemon: pokemon});
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
			<section className="View"> 
                {this.state.viewPokemonDetails == false? 
                    <PokePicker 
                        pokemonList={this.state.pokemon}
                        handleOnClick={this.selectAndViewPokemon}/> : null}
                {this.state.viewPokemonDetails == true ? 
                    <DetailView 
                        backAction={() => this.setState({viewPokemonDetails: false})} 
                        pokemon={this.state.currentSelectedPokemon}
                        chooseAction={() => this.props.pokemonSelectedCallback(this.state.currentSelectedPokemon)} /> : null}
                {this.props.isMusicOn ?
                    <audio
                        src="http://66.90.93.122/ost/pokemon-gameboy-sound-collection/svlclmai/101-opening.mp3"
                        type="audio/mpeg"
                        autoPlay
                        controls/> : null}

			</section>
		)
	}
};

const PokePicker = ({ pokemonList, handleOnClick }) => {
    /*
     * Loop over list of pokemon and create an img component for each
     */
    const getListOfPokemon = () => {
        let returnList = [];
        for (var x = 0; x < pokemonList.length; x++) {
            if (pokemonList[x] != null) {
                returnList.push(<PokeImage 
                                    pokemon={pokemonList[x]}
                                    handleOnClick={handleOnClick} />);
            }
        }
        return returnList;
    }
    return (
        <section className="starter-pokemon">
            <p>Choose your first pokemon </p>
            <div className="pokemon-picker">
                {getListOfPokemon()}     
            </div>
        </section>
    )
};

const PokeImage = ({pokemon, handleOnClick}) => {
    return  <img 
                src={pokemon.sprite} 
                onClick={() => handleOnClick(pokemon)} />
}

export default StarterPokemon;


