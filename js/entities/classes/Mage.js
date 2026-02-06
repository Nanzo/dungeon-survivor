import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

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

    update(input, deltaTime) {
        super.update(input, deltaTime);

        // Mage Auto Attack (Closest Only)
        this.tryAttack(this.game.enemies);
    }

    // Override performAttack to spawn projectile instead of direct damage
    performAttack(target) {
        // Shoot Fireball
        const projectile = new Projectile(
            this.game,
            this.x, this.y,
            target,
            this.projectileSpeed, // Projectile Speed 
            this.attackPower,
            this.projectileAOE, // Uses the AOE stat
            Assets.generateFireball()
        );
        // Sync Upgrades
        if (this.projectileRicochet) {
            projectile.ricochetCount = this.projectileRicochet;
            projectile.ricochetRange = 250;
        }
        if (this.piercing) projectile.piercing = true;
        if (this.knockback) projectile.knockback = this.knockback;

        this.game.projectiles.push(projectile);
    }
}

