import React, { Component } from 'react';
import PokeList from './PokeList';
import Home from './Home';
import StarterPokemon from './StarterPokemon';
import Battle from './Battle';
import Pokemon from '../Pokemon';
import Utils from '../Utils'
import './styles/App.css';

//Import utils js
const utils = new Utils();

class App extends Component {   
  constructor() {
        super();

        //State Object : pokemon - current pokemon of interest
        //               showing - current view that is being displayed
        //               loading - show loading indicator while making a fetch request
        this.state = {
            pokemon: {},
            battlePokemon: {},
            showing: "startingPokemon",
            loading: true,
            isMusicOn: false
        };

        //Local cache of known pokemon selected as to increase user speed by not having to make another fetch
        this.storedPokemon = [];

        //Bound APIs to access "this" object
        //TODO: Which of these actually need to bind this? clean up non-needed
        this.addPokemonByID = this.addPokemonByID.bind(this);
        this.addPokemonByObj = this.addPokemonByObj.bind(this);
        this.setViewToList = this.setViewToList.bind(this);
        this.setViewToHome = this.setViewToHome.bind(this);
        this.setViewToBattle = this.setViewToBattle.bind(this);
        this.setViewMode = this.setViewMode.bind(this);
        this.setPokemon = this.setPokemon.bind(this);
        this.getStoredPokemon = this.getStoredPokemon.bind(this);
        this.setPokemonCallback = this.setPokemonCallback.bind(this);
        this.removeLoadingIcon = this.removeLoadingIcon.bind(this);
        this.addAndSetBattlePokemon = this.addAndSetBattlePokemon.bind(this);
        this.setBattlePokemon = this.setBattlePokemon.bind(this);
        this.toggleMusic = this.toggleMusic.bind(this);
  }

    /*
    * Get stored pokemon by ID from local cache, returns null if doesn't exist in local cache
    */
    getStoredPokemon(id) {
        if (this.storedPokemon[id]) {
            return this.storedPokemon[id]
        } else {
            return null;
        }
    }

    /*
    * Set the state object of pokemon as well as storing the obect in local cache object 
    */
    setPokemon(pokemon) {
        this.setState({ pokemon: pokemon, loading: false });
        this.setViewToHome();
        this.storedPokemon[pokemon.id] = pokemon;
    }

    /*
    * Set the state to be viewed
    */
    setViewMode(view) {
        this.setState({
            showing: view
        })
    }

    /*
    * Sets the view to List
    */
    setViewToHome() {
        this.setViewMode("home");
    }

    /*
    * Sets the view to List
    */
    setViewToList() {
        this.setViewMode("list");
    }

    /*
    * Sets the view to Battle screen
    */
    setViewToBattle() {
        //TODO: Should all setViews handle the loading and pass callback to 
        //finish loading when switching view?
        this.setState({loading: true})
        this.setViewMode("battle");
    }

    
    setPokemonCallback(data) {
        this.removeLoadingIcon();
        const pokemon = new Pokemon(data);
        this.setPokemon(pokemon);
    }

    /*
     * Remove the loading icon from the app
     */
    removeLoadingIcon() {
        this.setState({loading: false})
    }

    /*
    * Handles adding of pokemon to the players list. will query web service if it does not already exist in memory
    */
    //TODO: Remove switching view context here, addPokemon should only add pokemon and not do unexpected behavior
    //TODO: This might be worth movig to its own class object similar to the Pokemon object, something like an inventory manager
    addPokemonByID(id) {
        this.setState({loading: true})
        //IF local cache exist use that and set pokemon state ELSE fetch data and set pokemon state
        if (this.getStoredPokemon(id) != null) {
            this.setPokemon(this.getStoredPokemon(id));
        } else {
            utils.queryPokemonByID(id, this.setPokemonCallback);
        }
    }

    /*
    * Handles the selecting pokemon action which will set the pokemon state as well as switch to the detail view of that pokemon
    */
    addPokemonByObj(pokemonObj) {
        this.setState({loading: true})
        this.setPokemon(pokemonObj);
    }

    /*
     * Set pokemon to be your pokemon to fight with
     */
    setBattlePokemon(pokemonObj) {
        this.setState({battlePokemon: pokemonObj});
    }

    /*
     * Add pokemon to roaster and set it to your battle pokemon
     */
    addAndSetBattlePokemon(pokemonObj) {
        this.addPokemonByObj(pokemonObj);
        this.setBattlePokemon(pokemonObj);
    }

    /*
     * Toggle music on and off for the app
     */
    toggleMusic() {
        this.setState({isMusicOn: !this.state.isMusicOn});
    }

    render() {
        return (
            <section className={this.state.loading ? "App Loading": "App"}>
                <a onClick={this.toggleMusic} className={this.state.isMusicOn ? "play-music on" : "play-music"}> Play Music </a>
                {this.state.showing == "startingPokemon" ? <StarterPokemon 
                                                            loadedPokemonCallback={this.removeLoadingIcon}
                                                            pokemonSelectedCallback={this.addAndSetBattlePokemon} 
                                                            backAction={this.setViewToHome}
                                                            isMusicOn={this.state.isMusicOn}/> : null}
                {this.state.showing == "home" ? <Home 
                                                catchPokemon={this.setViewToBattle} 
                                                pokemonStorage={this.setViewToList}/> : null}
                {this.state.showing == "list" ? <PokeList 
                                                storedPokemon={this.storedPokemon}
                                                selectPokemon={this.setBattlePokemon}
                                                backAction={this.setViewToHome} 
                                                battlePokemon={this.state.battlePokemon}/>: null}
                {this.state.showing == "battle" ? <Battle 
                                                    victoryCallback={this.addPokemonByObj}
                                                    loadedPokemonCallback={this.removeLoadingIcon}
                                                    battlePokemon={this.state.battlePokemon}
                                                    victory={this.addPokemonByObj}
                                                    defeat={this.setViewToHome}
                                                    isMusicOn={this.state.isMusicOn}/> : null}
            </section>
        );
    }
}


export default App;