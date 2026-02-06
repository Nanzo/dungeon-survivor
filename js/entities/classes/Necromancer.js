import { Summoner } from './Summoner.js';
import { Minion } from './Minion.js';
import { Assets } from '../../core/Assets.js';

export class Necromancer extends Summoner {
    constructor(game) {
        super(game);
        // Player Stats (Squishy, commands army)
        this.maxHp = 80;
        this.hp = this.maxHp;
        this.attackPower = 8;
        this.defense = 0;
        this.speed = 3.0; // Normal
        this.attackSpeed = 1.0;
        this.projectileSpeed = 10; // Base speed for Minion Lunge/Aggro calculations

        // Summoner Config
        this.baseMinionCount = 2; // Starts with 2 Skeletons

        // UI
        this.description = "Commander of the dead. Summons Skeletons that swarm enemies.";
        this.roleDescription = "Summoner / Horde";
        this.image = Assets.generateNecromancer();
    }

    spawnMinion() {
        // Spawn Skeleton
        const minion = new Minion(this.game, this, this.x + Math.random() * 20, this.y + Math.random() * 20, Assets.generateSkeleton());

        // Skeleton Stats (Glass Cannon)
        minion.hpMult = 0.4; // Fragile (40% HP)
        minion.dmgMult = 0.8; // Low Damage per unit (Horde relies on updates)
        minion.spdMult = 0.45; // Slower than player (User Request)
        minion.atkSpdMult = 1.0;

        minion.syncStats();
        minion.hp = minion.maxHp; // Spawn full health

        this.minions.push(minion);
    }
}
