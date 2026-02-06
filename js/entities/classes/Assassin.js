import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class Assassin extends Player {
    constructor(game) {
        super(game);
        // Assassin Stats (High Speed, High Crit, Low HP)
        this.maxHp = 70;
        this.hp = this.maxHp;
        this.attackPower = 20;
        this.defense = 0;
        this.speed = 3.5; // Slowed from 4.0
        this.attackSpeed = 0.5; // Slower (was 0.4)
        this.attackRange = 250; // Mid-Range (Throwing Daggers)

        // Crit Stats Override
        this.critChance = 0.25; // 25% Base Crit Chance!
        this.critDamage = 2.0; // 200% Crit Damage!

        // Projectile Stats
        this.projectileSpeed = 10; // Slowed from 18
        this.projectileAOE = 0; // Single Target

        // UI Info
        this.description = "A swift shadow who deals massive critical damage with thrown daggers. High risk, high reward.";
        this.roleDescription = "Crit DPS / Assassin";

        this.image = Assets.generateAssassin();
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        // Calculate Crit
        let isCrit = Math.random() < this.critChance;
        let damage = this.attackPower;
        if (isCrit) {
            damage *= this.critDamage;
        }

        const projectile = new Projectile(
            this.game,
            this.x, this.y,
            target,
            this.projectileSpeed,
            damage, // Pass calculated damage
            this.projectileAOE,
            Assets.generateDagger(),
            this.attackRange, // Max Range
            false, // Piercing
            0, // Knockback
            isCrit // Critical Flag
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
