import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

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
        this.attackRange = 350;

        // Mechanics
        this.projectileRicochet = 3; // Bounces 3 times!

        // Projectile
        this.projectileSpeed = 7; // Slowed from 14
        this.projectileAOE = 0;
        this.projectileCount = 1;

        // UI Info
        this.description = "A charismatic musician whose tunes echo through the battlefield. Attacks bounce between enemies.";
        this.roleDescription = "Crowd Control / Ricochet";

        this.image = Assets.generateBard();
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        // Musical Note
        const projectile = new Projectile(
            this.game,
            this.x, this.y,
            target,
            this.projectileSpeed,
            this.attackPower,
            this.projectileAOE,
            Assets.generateNoteProjectile(),
            this.attackRange
        );

        // Apply Bard specifics
        projectile.ricochetCount = this.projectileRicochet;
        // Range of bounce is half the attack range (Keep it tight)
        projectile.ricochetRange = this.attackRange;
        // User asked for "same range" or "half". "Same" (350) is actually quite big for a bounce.
        // Let's try 350 first as explicit request "same range", but maybe reduce if too OP?
        // Actually user said "maybe half?". Let's do 200 (slightly more than half) for better feel.
        projectile.ricochetRange = 250;

        this.game.projectiles.push(projectile);
    }
}
