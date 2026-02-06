import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';

export class Gunslinger extends Player {
    constructor(game) {
        super(game);
        // Stats
        this.maxHp = 90; // squishy
        this.hp = this.maxHp;
        this.attackPower = 20; // Moderate per shot (but fires 2)
        this.defense = 2;
        this.speed = 3.5; // Fast movement

        this.attackSpeed = 1.2; // Slower attack speed than Archer
        this.attackRange = 400; // Shorter range than Archer (say 400 vs 600)

        // Projectile / Ability Stats
        this.projectileSpeed = 20; // Very Fast
        this.projectileAOE = 0;
        this.projectileCount = 2; // STARTING TRAIT: Dual Wield

        this.description = "A dual-wielding outlaw. Fires two bullets at once: one at the closest target, the other at a random target in range.";
        this.roleDescription = "Burst DPS / Hybrid Target";

        this.image = Assets.generateGunslinger();
    }

    // Uses base Entity.update() and Entity.tryAttack() now!

    performAttack(target) {
        // Shoot Bullet
        this.fireProjectile(target, Assets.generateBullet());
    }
}
