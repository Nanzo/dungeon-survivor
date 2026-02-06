import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class FistProjectile extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        super(game, x, y, target, speed, damage, aoeRadius, Assets.generateFist(), options.maxRange, options.piercing, options.knockback, options.isCrit);
    }
}
