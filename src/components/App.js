import React, { Component } from 'react';
import PokeList from './PokeList';
import DetailView from './DetailView';
import Pokemon from '../Pokemon';
import './styles/App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {}
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(id) {
    //console.log(`http://pokeapi.salestock.net/api/v2/pokemon/${id}/`);
      fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${id}/`)
          .then(response => response.json())
          .then(data => {
              const pokemon = new Pokemon(data);

              this.setState({ pokemon });
              console.log(pokemon);
          })
          .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <PokeList handleOnClick={this.handleOnClick} />
        <DetailView pokemon={this.state.pokemon} />
      </div>
    );
  }
}


export default App;