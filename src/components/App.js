import React, { Component } from 'react';
import PokeList from './PokeList';
import Home from './Home';
import DetailView from './DetailView';
import Pokemon from '../Pokemon';
import './styles/App.css';


class App extends Component {
  constructor() {
      super();
      //State Object : pokemon - current pokemon of interest
      //               showing - current view that is being displayed
      //               loading - show loading indicator while making a fetch request
      this.state = {
        pokemon: {},
        showing: "home",
        loading: false
      };
      //Local cache of known pokemon selected as to increase user speed by not having to make another fetch
      this.storedPokemon = [];

      //Bound APIs to access "this" object
      this.handleSelectPokemon = this.handleSelectPokemon.bind(this);
      this.setViewToList = this.setViewToList.bind(this);
      this.setViewToHome = this.setViewToHome.bind(this);
      this.setViewToDetails = this.setViewToDetails.bind(this);
      this.setViewMode = this.setViewMode.bind(this);
      this.setPokemon = this.setPokemon.bind(this);
      this.getStoredPokemon = this.getStoredPokemon.bind(this);
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
   * Handles the selecting pokemon action which will set the pokemon state as well as switch to the detail view of that pokemon
   */
  handleSelectPokemon(id) {
      //IF local cache exist use that and set pokemon state ELSE fetch data and set pokemon state
      if (this.getStoredPokemon(id) != null) {
          this.setPokemon(this.getStoredPokemon(id));
      } else {
          this.setState({loading: true});
          fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${id}/`)
              .then(response => response.json())
              .then(data => {
                  const pokemon = new Pokemon(data);
                  this.setPokemon(pokemon);
              })
              .catch(err => console.log(err));
      }
  }
    render() {
        return (
            <section className={this.state.loading ? "App Loading": "App"}>
                {this.state.showing == "home" ? <Home 
                                                catchPokemon={this.handleSelectPokemon} 
                                                pokemonStorage={this.setViewToList}/> : null}
                {this.state.showing == "list" ? <PokeList 
                                                storedPokemon={this.storedPokemon}
                                                selectPokemon={this.handleSelectPokemon}
                                                backAction={this.setViewToHome} />: null}
                {this.state.showing == "details" ? <DetailView 
                                                    backAction={this.setViewToHome} 
                                                    pokemon={this.state.pokemon} /> : null}
            </section>
        );
    }
}


export default App;