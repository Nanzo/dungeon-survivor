import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class Archer extends Player {
    constructor(game) {
        super(game);
        // Archer Stats (Fast, Long Range, Fragile)
        this.maxHp = 80;
        this.hp = this.maxHp;
        this.attackPower = 15;
        this.defense = 2;
        this.speed = 3.0; // Slowed from 6.0
        this.attackSpeed = 0.6; // Slower (was 0.4)
        this.attackRange = 600; // Longest range

        // Projectile / Ability Stats
        this.projectileSpeed = 10; // Slowed from 15
        this.projectileAOE = 0; // Single Target

        // UI Info
        this.description = "A swift marksman with the longest range. Uses high speed and rapid fire to kite enemies from a safe distance.";
        this.roleDescription = "Ranged DPS / Kiter";

        this.image = Assets.generateArcher();
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        // Shoot Arrow (High Speed, Single Target)
        this.fireProjectile(target, Assets.generateArrow(), {
            slowPercent: 0.3, // 30% Slow
            slowDuration: 2000 // 2 Seconds
        });
    }
}
