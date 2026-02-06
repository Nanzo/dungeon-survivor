import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class Spear extends Projectile {
    constructor(game, x, y, target, speed, damage, aoe, options) {
        super(game, x, y, target, speed, damage, aoe, options);

        // Spear Visuals (Override defaults if needed, but keeping options is key)
        this.width = 48;
        this.height = 16;
        this.image = Assets.generateSpear();

        // Rotation (Point towards target)
        // Projectile.js usually handles rotation in draw() if we set rotation property?
        // BaseProjectile handles rotation logic in update/constructor usually.
    }
}
