class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.sprite = data.sprites.front_default;
    this.battleSprite = data.sprites.back_default;
    this.type = [];
    for (var x = 0; x < data.types.length; x++) {
    	this.type.push(data.types[x].type.name);
    }
    this.speed = data.stats[0].base_stat;
    this.specialDefense = data.stats[1].base_stat;
    this.specialAttack = data.stats[2].base_stat;
    this.defense = data.stats[3].base_stat;
    this.attack = data.stats[4].base_stat;
    this.hp = data.stats[5].base_stat;
    this.weight = data.weight
    this.height = data.height
  }
}

export default Pokemon;