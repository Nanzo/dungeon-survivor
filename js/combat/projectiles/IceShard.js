import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class IceShard extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        super(game, x, y, target, speed, damage, aoeRadius, Assets.generateIceShard(), options.maxRange, options.piercing, options.knockback, options.isCrit);
    }
}
