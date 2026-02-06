import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class Sword extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        super(game, x, y, target, speed, damage, aoeRadius, Assets.generateSword(), options.maxRange, options.piercing, options.knockback, options.isCrit);
        this.width = 30; // Bigger
        this.height = 30;
    }
}
