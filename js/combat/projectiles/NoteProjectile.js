import { Projectile } from './Projectile.js';
import { Assets } from '../../core/Assets.js';

export class NoteProjectile extends Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        // Merge image into options
        const projectileOptions = {
            ...options,
            image: Assets.generateNoteProjectile(),
            maxRange: options.maxRange, // Ensure these are preserved if passed
            piercing: options.piercing,
            knockback: options.knockback,
            isCrit: options.isCrit
        };

        super(game, x, y, target, speed, damage, aoeRadius, projectileOptions);
    }
}
