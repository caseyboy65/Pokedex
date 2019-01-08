import React, { Component } from 'react';
import PokeCell from './PokeCell';
import './styles/PokeList.css';
import Pokemon from '../Pokemon';

const PokeList = ({selectPokemon, backAction, storedPokemon}) => {
    /*
     *  Creates a list of <PokeCell> components with the list of stored pokemon
     */
    const getListOfPokemon = () => {
        let returnList = [];
        for (var x = 0; x < storedPokemon.length; x++) {
            if (storedPokemon[x] != null) {
                returnList.push(<PokeCell 
                    pokemon={storedPokemon[x]}
                    handleOnClick={selectPokemon} 
                />);
            }
        }
        return returnList;
    }
    return (
        <section className="oaks-pc">
            <a onClick={backAction}> Back </a>
            <div className="poke-list">
                {getListOfPokemon()}
            </div>
        </section>
    )
};


export default PokeList;