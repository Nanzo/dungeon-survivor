import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Fireball } from '../../combat/projectiles/Fireball.js';

export class Mage extends Player {
    constructor(game) {
        super(game);
        // Mage Stats (Fragile, High Dmg, Slower)
        this.maxHp = 60;
        this.hp = this.maxHp;
        this.attackPower = 45; // Massive single hit / explosion dmg
        this.defense = 0;
        this.speed = 1.6; // Slowed down from 1.8
        this.attackSpeed = 1.3; // Slower attacks (was 0.9)
        this.attackRange = 400; // Ranged

        // Projectile / Ability Stats
        this.projectileSpeed = 5; // Slower projectile (was 10)
        this.projectileAOE = 60; // STARTING TRAIT: Huge AOE Area

        // UI Info
        this.description = "A master of arcane arts who can damage multiple enemies at once with explosive fireballs.";
        this.roleDescription = "AOE / Magic DPS";

        this.image = Assets.generateMage();
    }

    // update() removed - uses Player.update()

    // Override performAttack to spawn projectile instead of direct damage
    performAttack(target) {
        // Shoot Fireball
        this.spawnProjectile(Fireball, target);
    }
}

