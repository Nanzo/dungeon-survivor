import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Spear } from '../../combat/projectiles/Spear.js';

export class Lancer extends Player {
    constructor(game) {
        super(game);
        // Lancer Stats (Balanced, High Pierce)
        this.maxHp = 100;
        this.hp = this.maxHp;
        this.attackPower = 25; // Good Damage
        this.defense = 4; // Medium Defense
        this.speed = 2.2; // Quite Fast
        this.attackSpeed = 1.0; // Moderate
        this.attackRange = 550; // Buffed Range (Line Clearer)

        // Projectile / Ability Stats
        this.projectileSpeed = 9; // Fast Spear
        this.projectileAOE = 0;
        this.piercing = true; // STARTING TRAIT: Pierce (The defining trait)

        // UI Info
        this.description = "A disciplined warrior armed with a spear. Her attacks pierce through enemies, making her excellent at clearing lines of foes.";
        this.roleDescription = "Pierce / Line Clearer";

        this.image = Assets.generateLancer();
    }

    // update() removed - uses Player.update()

    performAttack(target) {
        // Throw Spear
        this.spawnProjectile(Spear, target);
    }
}
