import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { NoteProjectile } from '../../combat/projectiles/NoteProjectile.js';

export class Bard extends Player {
    constructor(game) {
        super(game);
        // Bard Stats (Crowd Control, Bounce)
        this.maxHp = 90;
        this.hp = this.maxHp;
        this.attackPower = 15;
        this.defense = 2;
        this.speed = 3.2; // Slowed from 4.5
        this.attackSpeed = 1.0; // Slower (was 0.6)
        this.attackRange = 500; // Buffed Range (User request)

        // Mechanics
        this.projectileRicochet = 3; // Bounces 3 times!

        // Projectile
        this.projectileSpeed = 3.5; // Slowed significantly (was 7)
        this.projectileAOE = 0;
        this.projectileCount = 1;

        // UI Info
        this.description = "A charismatic musician whose tunes echo through the battlefield. Attacks bounce between enemies.";
        this.roleDescription = "Crowd Control / Ricochet";

        this.image = Assets.generateBard();
    }

    // update() removed - uses Player.update()

    performAttack(target) {
        // Musical Note
        // fireProjectile automatically handles this.projectileRicochet, which Bard sets in constructor
        this.spawnProjectile(NoteProjectile, target, {
            range: this.attackRange
        });
    }
}
