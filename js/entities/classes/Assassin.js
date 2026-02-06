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
        // Throw Dagger
        // Crit calculated automatically in fireProjectile based on this.critChance (which Assassin overrides)
        this.fireProjectile(target, Assets.generateDagger(), {
            range: this.attackRange // Limited range
        });
    }
}
