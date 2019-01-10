import React, { Component } from 'react';
import PokeList from './PokeList';
import Home from './Home';
import DetailView from './DetailView';
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
            loading: true
        };

        //Local cache of known pokemon selected as to increase user speed by not having to make another fetch
        this.storedPokemon = [];

        //Bound APIs to access "this" object
        //TODO: Which of these actually need to bind this? clean up non-needed
        this.addPokemonByID = this.addPokemonByID.bind(this);
        this.addPokemonByObj = this.addPokemonByObj.bind(this);
        this.setViewToList = this.setViewToList.bind(this);
        this.setViewToHome = this.setViewToHome.bind(this);
        this.setViewToDetails = this.setViewToDetails.bind(this);
        this.setViewToBattle = this.setViewToBattle.bind(this);
        this.setViewMode = this.setViewMode.bind(this);
        this.setPokemon = this.setPokemon.bind(this);
        this.getStoredPokemon = this.getStoredPokemon.bind(this);
        this.setPokemonCallback = this.setPokemonCallback.bind(this);
        this.removeLoadingIcon = this.removeLoadingIcon.bind(this);
        this.addAndSetBattlePokemon = this.addAndSetBattlePokemon.bind(this);
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
        this.setViewToDetails();
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
    * Sets the view to List (prevents having to hard code a string litteral in other locations)
    */
    setViewToHome() {
        this.setViewMode("home");
    }

    /*
    * Sets the view to List (prevents having to hard code a string litteral in other locations)
    */
    setViewToList() {
        this.setViewMode("list");
    }

    /*
    * Sets the view to Details (prevents having to hard code a string litteral in other locations)
    */
    setViewToDetails() {
        this.setViewMode("details");
    }

    /*
    * Sets the view to Details (prevents having to hard code a string litteral in other locations)
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
    * Handles the selecting pokemon action which will set the pokemon state as well as switch to the detail view of that pokemon
    */
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

    render() {
        return (
            <section className={this.state.loading ? "App Loading": "App"}>
                {this.state.showing == "startingPokemon" ? <StarterPokemon 
                                                            loadedPokemonCallback={this.removeLoadingIcon}
                                                            pokemonSelectedCallback={this.addAndSetBattlePokemon} 
                                                            backAction={this.setViewToHome}/> : null}
                {this.state.showing == "home" ? <Home 
                                                catchPokemon={this.setViewToBattle} 
                                                pokemonStorage={this.setViewToList}/> : null}
                {this.state.showing == "list" ? <PokeList 
                                                storedPokemon={this.storedPokemon}
                                                selectPokemon={this.addPokemonByID}
                                                backAction={this.setViewToHome} />: null}
                {this.state.showing == "details" ? <DetailView 
                                                    backAction={this.setViewToHome} 
                                                    pokemon={this.state.pokemon} /> : null}
                {this.state.showing == "battle" ? <Battle 
                                                    victoryCallback={this.addPokemonByObj}
                                                    loadedPokemonCallback={this.removeLoadingIcon}
                                                    battlePokemon={this.state.battlePokemon}
                                                    victory={this.addPokemonByObj}
                                                    defeat={this.setViewToHome}/> : null}
            </section>
        );
    }
}


export default App;