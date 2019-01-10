import Utils from './Utils'
//Import utils js
const utils = new Utils();

class Pokemon {
    constructor(data) {
        this.setTypes = this.setTypes.bind(this);

        this.id = data.id;
        this.name = data.name;
        this.sprite = data.sprites.front_default;
        this.battleSprite = data.sprites.back_default;
        this.type = [];
        this.weakAgainst = [];
        this.strongAgainst = [];
        for (var x = 0; x < data.types.length; x++) {
            this.type.push(data.types[x].type.name);
            utils.queryTypeByURL(data.types[x].type.url, this.setTypes);
        }
        this.speed = data.stats[0].base_stat;
        this.specialDefense = data.stats[1].base_stat;
        this.specialAttack = data.stats[2].base_stat;
        this.defense = data.stats[3].base_stat;
        this.attack = data.stats[4].base_stat;
        this.totalHP = data.stats[5].base_stat;
        this.currentHP = data.stats[5].base_stat;
        this.weight = data.weight;
        this.height = data.height;
    }

    setTypes(data) {
        var weakAgainstTypes = data.damage_relations.double_damage_from;
        for (var x = 0; x < weakAgainstTypes.length; x++) {
            this.weakAgainst.push(weakAgainstTypes[x].name);
        }

        var strongAgainstTypes = data.damage_relations.double_damage_to;
        for (var x = 0; x < strongAgainstTypes.length; x++) {
            this.strongAgainst.push(strongAgainstTypes[x].name);
        }
    }
}

export default Pokemon;