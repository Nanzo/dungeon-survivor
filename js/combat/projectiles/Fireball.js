import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class Fireball extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        super(game, x, y, target, speed, damage, aoeRadius, {
            ...options,
            image: Assets.generateFireball()
        });
    }
}
