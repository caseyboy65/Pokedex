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
            playerAttack: false,
            freezeMenu: false,
            victory: false,
            defeat: false,
            battleMessage: "Wait something is moving!"
        };

        //Bind this to functions
        this.setEnemyPokemon = this.setEnemyPokemon.bind(this);
        this.playerAttack = this.playerAttack.bind(this);
        this.enemyAttack = this.enemyAttack.bind(this);
        this.victory = this.victory.bind(this);

        this.getARandomPokemon();
    }

    victory() {
    	var cleanUpPlayerPokemon = this.state.battlePokemon;
    	cleanUpPlayerPokemon.currentHP = cleanUpPlayerPokemon.totalHP;
    	var cleanUpEnemyPokemon = this.state.enemyPokemon;
    	cleanUpEnemyPokemon.currentHP = cleanUpEnemyPokemon.totalHP;

    	this.props.victory(cleanUpEnemyPokemon);
    }

    /*
     * set the enemy pokemon state object
     */
    setEnemyPokemon(pokemon) {
    	this.setState({ enemyPokemon: pokemon,
    					battleMessage: "A wild " + (pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)) + " appears!"});
    	this.props.loadedPokemonCallback();
    }

    playerAttack(){
    	//Set state to free menu and start attack animation
    	this.setState({playerAttack: true, freezeMenu: true})
    	
    	//Calculate damage to enemy pokemon
    	var totalDamage = this.getDamageCalc(this.state.battlePokemon, this.state.enemyPokemon);
    	var tempEnemyPokemon = this.state.enemyPokemon;
    	tempEnemyPokemon.currentHP = tempEnemyPokemon.currentHP - totalDamage;

    	//If enemey pokemon runs out of health player wins
    	if (tempEnemyPokemon.currentHP <= 0) {
    		tempEnemyPokemon.currentHP = 0;
    		this.setState({battleMessage: "Victory"});
    		setTimeout(this.victory, 1000);
    		return;
    	}

    	//Update the health of the enemy pokemon
    	this.setState({enemyPokemon: tempEnemyPokemon});

    	setTimeout(this.enemyAttack, 1000);
    }

    enemyAttack() {
    	//Set state to free menu and start attack animation
    	this.setState({playerAttack: false, freezeMenu: false});
    }

    getDamageCalc(attack, defender) {
    	//Power is calcuated from the poke-move for how strong is the move
    	//TODO: Hardcoded power attack, update this if moves are introduced
    	var power = 10;
    	//Effectiveness is calcuated from what type of move is attack what type of pokemon
    	//Fire attack water would be 1/2 effective i.e. effectivness = .5
    	//Water attack fire would be double effective i.e. effectivness = 2
    	//when two types have no bonus of others effectivness is negated i.e. effectivness = 1
    	//TODO: Hardcoded effectiveness. Effectivenessis based on poke-types, such as fire attack water for 1/2 damage
    	var effectiveness = 1;

    	//calcuate the total damage
    	return Math.round((power * (attack.attack / defender.defense)) * effectiveness);
    }

    /*
     * Get a random pokemon to battle
     */
    getARandomPokemon(callBack) {
    	utils.queryPokemonByID(utils.randomPokemonID(), this.setEnemyPokemon);
    }

    /*
     *	Get the health style by updating the width of the element by the percentage of health is has
     */
    getHealthStyle(pokemon) {
    	if (pokemon.currentHP == null) {
    		return {width: '100%'};
    	}
    	var width = (pokemon.currentHP / pokemon.totalHP) * 100;
    	debugger;
    	width = width.toString() + "%"
    	var typeObj = {width: width} 
    	return typeObj;
    }
	
	render() {	
		return (
			<section className={this.state.startBattle ? "battle-pokemon loading" : "battle-pokemon"}>
				<p>{this.state.battleMessage}</p>
				<div className="arena">
					<div className={this.state.playerAttack ? "player-pokemon attack" : "player-pokemon"}>
						<div className="hp">
							<div className="text"> HP: {this.state.battlePokemon.currentHP} / {this.state.battlePokemon.totalHP}</div>
							<div className="percentage" />
						</div>
						<img src={this.state.battlePokemon.battleSprite} />
					</div>
					<div className={this.state.playerAttack ? "enemy-pokemon reaction" : "enemy-pokemon"}>
						<div className="hp">
							<div className="text"> HP: {this.state.enemyPokemon.currentHP} / {this.state.enemyPokemon.totalHP}</div>
							<div className="percentage" style={this.getHealthStyle(this.state.enemyPokemon)} />
						</div>
						<img src={this.state.enemyPokemon.sprite} />
					</div>
					<div className="menu">
						<button disabled={this.state.freezeMenu} onClick={this.playerAttack} className="attack"> Attack </button>
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