import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { PoisonBolt } from '../../combat/projectiles/PoisonBolt.js';

export class Warlock extends Player {
    constructor(game) {
        super(game);
        this.image = Assets.generateWarlock();

        // Warlock Stats (Weak initial hit, Strong DoT)
        this.maxHp = 80;
        this.hp = this.maxHp;
        this.attackPower = 6; // Nerfed back to weak (was 10)
        this.defense = 0;
        this.speed = 1.8;
        this.attackSpeed = 1.0;
        this.attackRange = 350;

        // Projectile / Ability Stats
        this.projectileSpeed = 6;
        this.projectileAOE = 0;

        // Poison Stats
        // 8 dmg/tick (every 0.5s) for 3s = 6 ticks * 8 = 48 dmg total
        this.poisonDamage = 8;
        this.poisonDuration = 3000; // Milliseconds (was 3s)

        // UI Info
        this.description = "A dark caster who withers enemies over time. Weak initial hits but deadly poison.";
        this.roleDescription = "DoT / Debuffer";
    }

    // update() removed - uses Player.update()

    performAttack(target) {
        // Correct Usage: spawnProjectile(Class, target, extras)
        this.spawnProjectile(PoisonBolt, target, {
            poisonDuration: this.poisonDuration, // Pass stats to be used by Projectile
            poisonDamage: this.poisonDamage
        });
    }
}
