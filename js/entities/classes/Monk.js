import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { FistProjectile } from '../../combat/projectiles/FistProjectile.js';

export class Monk extends Player {
    constructor(game) {
        super(game);
        // Monk Stats (Fast, Combo-based)
        this.maxHp = 110; // Slightly tanky
        this.hp = this.maxHp;
        this.attackPower = 18; // Buffed from 12
        this.defense = 3;
        this.speed = 3.5; // Fast
        this.attackSpeed = 0.9; // Fast attacks
        this.attackRange = 250; // Short-Mid range (Fist projection)

        // Projectile / Ability Stats
        this.projectileSpeed = 12;
        this.projectileAOE = 0;
        this.projectileCount = 1;

        // Special Trait: Double Strike (Starts with 1 extra strike)
        this.extraStrikes = 1;

        // UI Info
        this.description = "A martial artist who unleashes a rapid flurry of blows. Every attack lands twice in quick succession.";
        this.roleDescription = "Double Strike / Burst";

        this.image = Assets.generateMonk();
    }

    // update() removed - uses Player.update()

    performAttack(target) {
        // Fist Projectile
        this.spawnProjectile(FistProjectile, target);
    }
}
