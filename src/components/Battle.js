import React, { Component } from 'react';
import Pokemon from '../Pokemon';
import './styles/Battle.css';
import Utils from '../Utils'
//Import utils js
const utils = new Utils();

class Battle extends Component { 
	constructor(props) {
        super(props);

        //State Object : pokemon - current pokemon of interest
        this.state = {
            battlePokemon: this.props.battlePokemon,
            enemyPokemon: {},
            startBattle: false,
            playerAttack: false
        };

        //Bind this to functions
        this.setEnemyPokemon = this.setEnemyPokemon.bind(this);
        this.playerAttack = this.playerAttack.bind(this);

        this.getARandomPokemon();
    }

    /*
     * set the enemy pokemon state object
     */
    setEnemyPokemon(pokemon) {
    	this.setState({enemyPokemon: pokemon});
    	this.props.loadedPokemonCallback();
    }

    playerAttack(){
    	this.setState({playerAttack: !this.state.playerAttack})
    }

    /*
     * Get a random pokemon to battle
     */
    getARandomPokemon(callBack) {
    	utils.queryPokemonByID(utils.randomPokemonID(), this.setEnemyPokemon);
    }
	
	render() {
		
		return (
			<section className={this.state.startBattle ? "battle-pokemon loading" : "battle-pokemon"}>
				<p>Time to battle!</p>
				<div className="arena">
					<img className={this.state.playerAttack ? "player-pokemon attack" : "player-pokemon"}
						 src={this.state.battlePokemon.battleSprite} />
					<img className={this.state.playerAttack ? "enemy-pokemon reaction" : "enemy-pokemon"} src={this.state.enemyPokemon.sprite} />
					<div className="menu">
						<a onClick={this.playerAttack} className="attack"> Attack </a>
					</div>
				</div>
				<audio
					src="http://66.90.93.122/ost/pokemon-gameboy-sound-collection/ravcdrgo/107-battle%20%28vs%20wild%20pokemon%29.mp3"
					type="audio/mpeg"
					autoPlay
					controls />
			</section>
		)
	}
};

export default Battle;