import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class Hammer extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        super(game, x, y, target, speed, damage, aoeRadius, {
            ...options,
            image: Assets.generateHammerProjectile()
        });
        this.width = 28;
        this.height = 28;
    }
}
