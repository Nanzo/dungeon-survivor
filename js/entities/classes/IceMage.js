import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class IceMage extends Player {
    constructor(game) {
        super(game);
        // Ice Mage Stats (Crowd Control, Lower Dmg)
        this.maxHp = 60;
        this.hp = this.maxHp;
        this.attackPower = 25; // Lower than Fire Mage (45)
        this.defense = 0;
        this.speed = 1.6; // Slowed from 1.8
        this.attackSpeed = 1.2; // Slower (was 1.0)
        this.attackRange = 400;

        // Projectile / Ability Stats
        this.projectileSpeed = 4.5; // Slowed from 12
        this.projectileAOE = 60; // Same AOE as Fire Mage
        this.freezeDuration = 1000; // 1 second Freeze

        // UI Info
        this.description = "A cryomancer who freezes enemies in their tracks. Lower damage but unmatched crowd control.";
        this.roleDescription = "CC / Ice Support";

        this.image = Assets.generateIceMage();
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        const projectile = new Projectile(
            this.game,
            this.x, this.y,
            target,
            this.projectileSpeed,
            this.attackPower,
            this.projectileAOE,
            Assets.generateIceShard()
        );
        // Apply Freeze Stats
        projectile.freezeDuration = this.freezeDuration;

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
