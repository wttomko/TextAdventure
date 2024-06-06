const prompt = require("prompt-sync")({ sigint: true });

class Armour{
    constructor(name, weight, defense){
        this.name=name;
        this.weight=weight;
        this.def=defense;
    }
}

class Weapon {
    constructor(name, weight, atk){
        this.name=name;
        this.weight=weight;
        this.atk=atk;
    }
}

class Player {
    constructor(name, newClass){

        if (newClass==='Warrior'){
            this.name=name;
            this.class=newClass;
            this.lvl=1
            this.xp=0
            this.maxxp=20;
            this.points=5;

            this.hp=20;
            this.maxhp=20;
            this.end=10;
            this.maxend=10;
            this.mag=2;
            this.maxmag=2;

            this.str=0;
            this.dex=0;
            this.int=0;
            this.spd=6;

            this.weapon=new Weapon('Long Sword', 5, 6);
            this.armour=new Armour('Chain Mail', 5, 5);

            this.inv=[];
            this.moves=[];

            this.moves.push(moves[0], moves[1]);
            this.inv.push('Small Potion');

        } else if (newClass==='Rouge') {
            this.name=name;
            this.class=newClass;
            this.lvl=1
            this.xp=0
            this.maxxp=20;
            this.points=5;

            this.hp=15;
            this.maxhp=15;
            this.end=15;
            this.maxend=15;
            this.mag=2;
            this.maxmag=2;

            this.str=0;
            this.dex=0;
            this.int=0;
            this.spd=6;

            this.weapon=new Weapon('Twin Daggars', 3, 4);
            this.armour=new Armour('Leather Armour', 4, 4);

            this.inv=[];
            this.moves=[];

            this.moves.push(moves[2], moves[3]);
            this.inv.push('Small Potion');

        } else if (newClass==='Wizard') {
            this.name=name;
            this.class=newClass;
            this.lvl=1
            this.xp=0
            this.maxxp=20;
            this.points=5;

            this.hp=15;
            this.maxhp=15;
            this.end=2;
            this.maxend=2;
            this.mag=10;
            this.maxmag=10;

            this.str=0;
            this.dex=0;
            this.int=2;
            this.spd=4;

            this.weapon=new Weapon('Twin Daggars', 3, 4);
            this.armour=new Armour('Leather Armour', 4, 4);

            this.inv=[];
            this.moves=[];

            this.moves.push(moves[2], moves[3]);
            this.inv.push('Small Potion');

        }
    }   

    bar(num, maxNum){
        let bar;
        let status=(Math.round((num / maxNum) * 100))
        if (status > 89 && status != 100){
            bar=`|         |`;
        } else if (status > 79 && status <= 89){
            bar='|        |';
        } else if (status > 69 && status <= 79){
            bar='|       |';
        } else if (status > 59 && status <= 69){
            bar='|      |';
        } else if (status > 49 && status <= 59){
            bar='|     |';
        } else if (status > 39 && status <= 49){
            bar='|    |';
        } else if (status > 29 && status <= 39){
            bar='|   |';
        } else if (status > 19 && status <= 29){
            bar='|  |';
        } else if (status > 9 && status <= 19){
            bar='| |';
        } else if (status < 9 && status > 0){
            bar='| |';
        } else if (status===100){
            bar=`|          |`;
        } else if (status===0){
            bar=''
        }
        return bar
    }

    displayStats(){
        
        console.clear();
        console.log(`
Player Stats------------------
Name: ${this.name}
Class: ${this.class}
Level: \x1b[31m${this.lvl}\x1b[0m
EXP: \x1b[31m${this.xp < 10 ? '0' + this.xp : this.xp}\x1b[0m/\x1b[31m${this.maxxp}\x1b[0m \x1b[45m${this.bar(this.xp, this.maxxp)}\x1b[0m
------------------------------
VIT: \x1b[31m${this.hp < 10 ? '0' + this.hp : this.hp}\x1b[0m/\x1b[31m${this.maxhp}\x1b[0m \x1b[42m${this.bar(this.hp, this.maxhp)}\x1b[0m

END: \x1b[31m${this.end < 10 ? '0' + this.end : this.end}\x1b[0m/\x1b[31m${this.maxend < 10 ? '0' + this.maxend : this.maxend}\x1b[0m \x1b[43m${this.bar(this.end, this.maxend)}\x1b[0m

MAG: \x1b[31m${this.mag < 10 ? '0' + this.mag : this.mag}\x1b[0m/\x1b[31m${this.maxmag < 10 ? '0' + this.maxmag : this.maxmag}\x1b[0m \x1b[46m${this.bar(this.mag, this.maxmag)}\x1b[0m
------------------------------
STR: \x1b[31m${this.str}\x1b[0m
DEX: \x1b[31m${this.dex}\x1b[0m
INT: \x1b[31m${this.int}\x1b[0m
SPD: \x1b[31m${this.spd}\x1b[0m
-----------------------------------------------
Weapon: ${this.weapon.name} | weight: \x1b[31m${this.weapon.weight}\x1b[0m | Power: \x1b[31m${this.weapon.atk}\x1b[0m
Armour: ${this.armour.name} | weight: \x1b[31m${this.armour.weight}\x1b[0m | Power: \x1b[31m${this.armour.def}\x1b[0m
-----------------------------------------------
Inventory: 
${this.inv}

Moves:`
);
this.displayMoves();
console.log('-----------------------------------------------');
    }

    levelUp(){
        this.lvl++;

        this.maxhp+=3;
        this.maxend+=1;
        this.maxmag+=1;
        this.spd+=1;

        console.log(`You have leveled up! Now level ${this.lvl}`);
        this.points+=1;
        this.spendPoints()
        this.displayStats();
    }

    spendPoints(){
        while (this.points != 0){
            console.clear();
            console.log(`You have ${this.points} point(s) to spend:`);
            console.log(`[1] Strength: ${this.str}
[2] Dexterity: ${this.dex}
[3] Intelligence: ${this.int}`);
            let choice=prompt('Make a selection: ');
            switch(choice){
                case '1':
                    this.str++;
                    break;
                case '2': 
                    this.dex++;
                    break;
                case '3':
                    this.int++;
                    break;
                default:
                    this.points++;
            }
            this.points--;
        }
    }

    addToStatus(name, stat, maxStat, num){
        stat+=num;
        if (stat > maxStat) {
            stat=maxStat;
        }
        console.log(`+${num} added to ${name}-\x1b[31m${stat}\x1b[0m/\x1b[31m${maxStat}\x1b[(0m`);
        switch(name){
            case 'hp':
                console.log(`\x1b[42m${this.bar(stat, maxStat)}\x1b[0m`);
                break;
        }       
    }

    displayMoves(){
        for(let i=0; i<this.moves.length; i++){
            console.log(this.moves[i].name);
        }
    }
}

const moves = [

    /* TEMPLATE

        name: '',
        type: '',
        endCost: ,
        effect: 'none',
        effectChance: 0,
        critical: 10,

    */

    {
        name: 'Slash',
        type: 'sword',
        endCost: 4,
        effect: 'none',
        effectChance: 0,
        critical: 10,
    },
    {
        name: 'Pierce',
        type: 'sword',
        endCost: 3,
        effect: 'bleed',
        effectChance: 10,
        critical: 10,
    },
    {
        name: 'Back Slash',
        type: 'sword',
        endCost: 4,
        effect: 'none',
        effectChance: 0,
        critical: 15,
    },

    {
        name: 'Lacerate',
        type: 'sword',
        endCost: 4,
        effect: 'bleed',
        effectChance: 10,
        critical: 10,
    }
];


const createNewCharacter = () => {
    let name=prompt('Enter your name');
    let newClass;
    newClass=prompt('Pick a class: [1]-Warrior [2]-Rogue [3]-Wizard  ');

    switch(newClass.trim()){
        case '1': 
            newClass='Warrior';
            break;
        case '2':
            newClass='Rogue';
            break;
        case '3':
            newClass='Wizard';
            break;
        defaut:
            console.log('Invalid choice, defaulting to warrior');
            newClass='Warrior';
    }
    console.log(`'${newClass}'`);
    newClass=prompt('Pick a class: [1]-Warrior [2]-Rogue [3]-Wizard  ');

    return new Player(String(name).trim(), String(newClass).trim());
}

const hero = createNewCharacter();
hero.displayStats();
