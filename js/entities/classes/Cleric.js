import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class Cleric extends Player {
    constructor(game) {
        super(game);
        // Cleric Stats (Durable Caster)
        this.maxHp = 120;
        this.hp = this.maxHp;
        this.attackPower = 25; // Buffed from 12
        this.defense = 3;
        this.speed = 1.6; // Slowed from 3.5 (Wait, 3.5 was very fast for Cleric!)
        this.attackSpeed = 1.0; // Faster (was 1.5)
        this.attackRange = 400; // Mid-Long Range

        // Sustain
        this.hpRegen = 5; // 5 HP per second PASSIVE

        // Projectile
        this.projectileSpeed = 5; // Slowed from 10
        this.projectileAOE = 0;
        this.projectileCount = 1;

        // UI Info
        this.description = "A holy healer who regenerates health over time. Smite enemies with holy light.";
        this.roleDescription = "Healer / Sustain";

        this.image = Assets.generateCleric();
    }

    // update() removed - uses Player.update()

    performAttack(target) {
        // Holy Bolt
        this.fireProjectile(target, Assets.generateHolyBolt(), {
            range: this.attackRange
        });
    }
}
