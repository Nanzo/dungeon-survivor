import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class PoisonBolt extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        const projectileOptions = {
            ...options,
            image: Assets.generatePoisonBolt(),
            // Ensure derived/passed options are preserved
            maxRange: options.maxRange,
            piercing: options.piercing,
            knockback: options.knockback,
            isCrit: options.isCrit,
            poisonDuration: options.poisonDuration,
            poisonDamage: options.poisonDamage
        };
        super(game, x, y, target, speed, damage, aoeRadius, projectileOptions);
    }
}
