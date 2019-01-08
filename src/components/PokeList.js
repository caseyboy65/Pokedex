import React, { Component } from 'react';
import PokeCell from './PokeCell';
import { pokeClasses } from '../pokeClasses';
import './styles/PokeList.css';
import Pokemon from '../Pokemon';

const PokeList = ({selectPokemon, backAction}) => {
    const cells = pokeClasses.map(pokeClass => {
        return (
            <div>
                <PokeCell 
                    key={pokeClass.id} 
                    pokeClass={pokeClass}
                    handleOnClick={selectPokemon} 
                />
            </div>
        );
    });
    return (
        <section className="oaks-pc">
            <a onClick={backAction}> Back </a>
            <div className="poke-list">
                {cells}
            </div>
        </section>
    )
};


export default PokeList;