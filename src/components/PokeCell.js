import React from 'react';
import './styles/PokeCell.css';


const PokeCell = ({ pokemon, handleOnClick }) => {
  return <img src={pokemon.sprite} onClick={() => handleOnClick(pokemon.id)} className="poke-cell" />
};

export default PokeCell;