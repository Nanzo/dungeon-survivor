import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class Warrior extends Player {
    constructor(game) {
        super(game);
        // Warrior Stats
        this.maxHp = 120;
        this.hp = this.maxHp;
        this.attackPower = 30; // Very High
        this.defense = 8;
        this.speed = 2.0; // Slowed down from 2.5
        this.attackSpeed = 0.8; // Slower attacks (was 0.5)
        this.attackRange = 150; // Short Ranged

        // Projectile / Ability Stats
        this.projectileSpeed = 6; // Slower projectile (was 12)
        this.projectileAOE = 0; // Single Target
        this.knockback = 45; // STARTING TRAIT: High Knockback

        // UI Info
        this.description = "A sturdy fighter who excels at close-range combat. High defense and health allow him to withstand heavy punishment.";
        this.roleDescription = "Tank / Melee DPS";

        this.image = Assets.generateWarrior();
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        // Throw Sword
        const projectile = new Projectile(
            this.game,
            this.x, this.y,
            target,
            this.projectileSpeed, // Speed
            this.attackPower,
            this.projectileAOE, // Single Target
            Assets.generateSword(),
            1000, // Max Range
            false, // Piercing
            this.knockback // Knockback
        );
        // Sync Upgrades
        if (this.projectileRicochet) {
            projectile.ricochetCount = this.projectileRicochet;
            projectile.ricochetRange = 250;
        }
        if (this.piercing) projectile.piercing = true;
        // Knockback is already passed in constructor, but re-assigning ensures latest value if changed dynamically
        if (this.knockback) projectile.knockback = this.knockback;

        this.game.projectiles.push(projectile);
    }
}
