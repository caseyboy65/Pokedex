import React, { Component } from 'react';
import PokeCell from './PokeCell';
import { pokeClasses } from '../pokeClasses';
import './styles/PokeList.css';
import Pokemon from '../Pokemon';

class PokeList extends Component {
  constructor() {
    super();
    this.state = {
      listOffset: 0,
      listOfPokemon: []
    };

    //this.handleOnClick = this.handleOnClick.bind(this);
  }

  setListOfPokemon() {
    console.log(`http://pokeapi.salestock.net/api/v2/pokemon/?offset=${this.state.listOffset}/`);
      fetch(`http://pokeapi.salestock.net/api/v2/pokemon/?offset${this.state.listOffset}/`)
          .then(response => response.json())
          .then(data => {
          	debugger;
          		let pokeList = [];
          		for(var x=0; x < data.results.length; x++) {
          			let pokemon = new Pokemon(data.results[x]);
          			pokeList.push(pokemon);	
          		}
              	

              	//this.setState({ pokemon });
              	console.log(pokeList);
          })
          .catch(err => console.log(err));
  }

  render() {
  	//this.setListOfPokemon();
    const cells = pokeClasses.map(pokeClass => {
	    return (
	      <PokeCell 
	        key={pokeClass.id} 
	        pokeClass={pokeClass}
	        handleOnClick={this.props.handleOnClick} 
	      />
	    );
	});
  	return (
	    <section className="poke-list">
	    	{cells}
	    </section>
  	);
  }
}


export default PokeList;