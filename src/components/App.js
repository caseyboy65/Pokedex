import React, { Component } from 'react';
import PokeList from './PokeList';
import DetailView from './DetailView';
import Pokemon from '../Pokemon';
import './styles/App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
      showing: "list",
      loading: false
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.setViewToList = this.setViewToList.bind(this);
    this.setViewMode = this.setViewMode.bind(this);
  }

  setViewMode(view) {
    this.setState({
      showing: view
    })
  }

  setViewToList() {
    this.setViewMode("list");
  }

  handleOnClick(id) {
      this.setState({loading: true});
      //console.log(`http://pokeapi.salestock.net/api/v2/pokemon/${id}/`);
      fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${id}/`)
          .then(response => response.json())
          .then(data => {
              const pokemon = new Pokemon(data);

              this.setState({ pokemon, showing: "details", loading: false });
              console.log(pokemon);
          })
          .catch(err => console.log(err));
  }
  // TODO: Conditionalizing detailview for now as it throws errors when trying to render with no actual data
  render() {
    return (
      <div className={this.state.loading ? "App Loading": "App"}>
        {this.state.showing == "list" ? <PokeList handleOnClick={this.handleOnClick} />: null}
        {this.state.showing == "details" ? <DetailView backAction={this.setViewToList} pokemon={this.state.pokemon} /> : null}
      </div>
    );
  }
}


export default App;