import React from 'react';
import './styles/DetailView.css';

const DetailView = ({ backAction, pokemon, chooseAction }) => {
	const getTypes = (types) => {
		if (types.length == 1) {
			return types[0];
		} else {
			let returnValue = types[0];
			for(var x = 1; x <types.length; x++) {
				returnValue += " / " + types[x];
			}
			return returnValue;
		}
	}
	const {id, name, sprite, type, attack, defense, specialAttack, specialDefense, totalHP, speed, weakAgainst, strongAgainst} = pokemon;
	return (
		<section className="detail-view">
			<button onClick={backAction}> Back </button	>
			<button onClick={() => chooseAction(pokemon)}> Choose </button	>
		  	<img src={sprite} className='sprite-image' alt="sprite" />
		  	<div className='data-wrapper'>
		    	<h1 className='data-name'> Name: {name}</h1>
		    	<p className="data-char">Type: {getTypes(type)}</p>
		     	<p className="data-char">Stats: <br />
		     							Attack: {attack} <br />
		     							Special Attack : {specialAttack} <br />
		     							Defense: {defense}<br />
		     							Special Defense : {specialDefense} <br />
		     							Speed : {speed} <br />
		     							HP : {totalHP} <br />
		     							Weak Against : {getTypes(weakAgainst)} <br />
		     							Strong Agasint : {getTypes(strongAgainst)} </p>
		  	</div>
		</section>
	)
}

export default DetailView;