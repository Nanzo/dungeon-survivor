import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class Bullet extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        // Bullets are tiny and fast
        super(game, x, y, target, speed, damage, aoeRadius, {
            ...options,
            image: Assets.generateBullet()
        });
        this.width = 10;
        this.height = 10;
    }
}
