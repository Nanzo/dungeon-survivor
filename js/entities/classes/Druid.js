import { Summoner } from './Summoner.js';
import { Minion } from './Minion.js';
import { Assets } from '../../core/Assets.js';

export class Druid extends Summoner {
    constructor(game) {
        super(game);
        // Player Stats (Tanky Summoner)
        this.maxHp = 150;
        this.hp = this.maxHp;
        this.attackPower = 15;
        this.defense = 5;
        this.speed = 2.8; // Slightly slow
        this.attackSpeed = 1.2;
        this.projectileSpeed = 10; // Base speed for Minion Lunge/Aggro calculations

        // Summoner Config
        this.baseMinionCount = 1; // Starts with 1 Bear

        // UI
        this.description = "Nature's guardian. Summons a powerful Bear companion.";
        this.roleDescription = "Summoner / Tank";
        this.image = Assets.generateDruid();
    }

    spawnMinion() {
        // Spawn Bear
        const minion = new Minion(this.game, this, this.x, this.y, Assets.generateBear());

        // Bear Stats (Tanky Bruiser)
        minion.hpMult = 4.0; // Massive Health (Tank!)
        minion.dmgMult = 2.5; // Heavy Hitter
        minion.spdMult = 0.3; // Very Slow (Slower than Skeletons' 0.9)
        minion.atkSpdMult = 0.6; // Slow swipes

        // Bears have built-in Cleave!
        // We can force a base ricochet if we want, or rely on player upgrades.
        // Let's give them base +1 Ricochet (Cleave 2 targets) for free.
        minion.syncStats();
        // Override after sync (hacky but works)
        if (this.projectileRicochet === 0) minion.projectileRicochet = 1;
        else minion.projectileRicochet += 1; // Bonus cleave

        minion.hp = minion.maxHp;

        this.minions.push(minion);
    }
}
