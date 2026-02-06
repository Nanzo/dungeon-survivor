import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class Monk extends Player {
    constructor(game) {
        super(game);
        // Monk Stats (Fast, Combo-based)
        this.maxHp = 110; // Slightly tanky
        this.hp = this.maxHp;
        this.attackPower = 12; // Lower base dmg, but hits twice!
        this.defense = 3;
        this.speed = 3.5; // Fast
        this.attackSpeed = 0.9; // Fast attacks
        this.attackRange = 250; // Short-Mid range (Fist projection)

        // Projectile / Ability Stats
        this.projectileSpeed = 12;
        this.projectileAOE = 0;
        this.projectileCount = 1;

        // Special Trait: Double Strike (Starts with 1 extra strike)
        this.extraStrikes = 1;

        // UI Info
        this.description = "A martial artist who unleashes a rapid flurry of blows. Every attack lands twice in quick succession.";
        this.roleDescription = "Double Strike / Burst";

        this.image = Assets.generateMonk();
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        // Fist Projectile
        const projectile = new Projectile(
            this.game,
            this.x, this.y,
            target,
            this.projectileSpeed,
            this.attackPower,
            this.projectileAOE,
            Assets.generateFist() // Monk Fist
        );

        // Standard sync (always good practice now)
        if (this.projectileRicochet) {
            projectile.ricochetCount = this.projectileRicochet;
            projectile.ricochetRange = 250;
        }
        if (this.piercing) projectile.piercing = true;
        if (this.knockback) projectile.knockback = this.knockback;

        this.game.projectiles.push(projectile);
    }
}
