import React, { Component } from 'react';
import './styles/PokeList.css';
import Pokemon from '../Pokemon';
import DetailView from './DetailView';


class PokeList extends Component {
    constructor(props) {
        super(props);
        //State Object : pokemon - current pokemon of interest
        this.state = {
            viewPokemonDetails : false,
            currentSelectedPokemon: {}
        };

        this.selectAndViewPokemon = this.selectAndViewPokemon.bind(this);
        this.selectPokemonForBattle = this.selectPokemonForBattle.bind(this);
    }

    /*
     *Select and view pokemon details
     */
    selectAndViewPokemon(pokemon) {
        this.setState({viewPokemonDetails: true, currentSelectedPokemon: pokemon})
    }

    /*
     *  Choose pokemon to fight and go back to storageview 
     */
    selectPokemonForBattle(pokemon) {
        this.props.selectPokemon(pokemon);
        this.setState({viewPokemonDetails: false});
    }

    render() {
        return (
            <section className="View">
                {this.state.viewPokemonDetails == false ? 
                    <StorageView 
                        backAction={this.props.backAction}
                        storedPokemon={this.props.storedPokemon}
                        viewPokemon={this.selectAndViewPokemon}
                        battlePokemon={this.props.battlePokemon}/> : null}
                {this.state.viewPokemonDetails == true ? 
                    <DetailView 
                        backAction={() => this.setState({viewPokemonDetails: false})} 
                        pokemon={this.state.currentSelectedPokemon}
                        chooseAction={() => this.selectPokemonForBattle(this.state.currentSelectedPokemon)} /> : null}
            </section>
        )    
    }
    
};

const StorageView = ({ backAction, storedPokemon, viewPokemon, battlePokemon }) => {
    /*
     *  Creates a list of <PokeCell> components with the list of stored pokemon
     */
    const getListOfPokemon = () =>  {
        let returnList = [];
        for (var x = 0; x < storedPokemon.length; x++) {
            if (storedPokemon[x] != null) {
                returnList.push(<PokeCell 
                    pokemon={storedPokemon[x]}
                    handleOnClick={viewPokemon}
                    isBattlePokemon={storedPokemon[x] == battlePokemon}/>);
            }
        }
        return returnList;
    }

    return (
        <section className="oaks-pc">
            <button onClick={backAction}> Back </button>
            <div className="poke-list">
                {getListOfPokemon()}
            </div>
            <p> Current Fighting Pokemon : {battlePokemon.name} </p>
        </section>
    );
};

const PokeCell = ({ pokemon, handleOnClick, isBattlePokemon }) => {
    const getImgClass = (isBattlePokemon) => {
        var className = "poke-cell";
        if (isBattlePokemon) {
            className += " fighting-pokemon"
        }

        return className;
    }
    return <img src={pokemon.sprite} onClick={() => handleOnClick(pokemon)} className={getImgClass(isBattlePokemon)} />
};


export default PokeList;