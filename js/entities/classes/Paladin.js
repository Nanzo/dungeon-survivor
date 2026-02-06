import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class Paladin extends Player {
    constructor(game) {
        super(game);
        // Paladin Stats (Tanky, Sustain on Kill)
        this.maxHp = 150; // Highest HP
        this.hp = this.maxHp;
        this.attackPower = 15;
        this.defense = 8; // High Defense
        this.speed = 1.7; // Slowed from 3.0
        this.attackSpeed = 1.8; // Slower (was 0.9)
        this.attackRange = 150; // Short/Mid Range (Hammer Throw)

        // Sustain
        this.lifeOnKill = 5; // 5 HP per Kill

        // Projectile
        this.projectileSpeed = 5; // Slowed from 12
        this.projectileAOE = 0;

        // UI Info
        this.description = "A holy warrior who fights on the frontline. Recovers health for every enemy purified.";
        this.roleDescription = "Tank / LifeSteal";

        this.image = Assets.generatePaladin();
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        // Hammer Throw
        this.fireProjectile(target, Assets.generateHammerProjectile(), {
            range: this.attackRange,
            knockback: 5 // Default high knockback for Hammer
        });
    }
}
