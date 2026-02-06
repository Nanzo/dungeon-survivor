import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class Hammer extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        super(game, x, y, target, speed, damage, aoeRadius, Assets.generateHammerProjectile(), options.maxRange, options.piercing, options.knockback, options.isCrit);
        this.width = 28;
        this.height = 28;
    }
}
