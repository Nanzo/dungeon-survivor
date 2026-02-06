import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';

export class Warlock extends Player {
    constructor(game) {
        super(game);
        this.image = Assets.generateWarlock();

        // Warlock Stats (Weak initial hit, Strong DoT)
        this.maxHp = 80;
        this.hp = this.maxHp;
        this.attackPower = 5; // Weak initial hit
        this.defense = 0;
        this.speed = 1.8;
        this.attackSpeed = 1.0;
        this.attackRange = 350;

        // Projectile / Ability Stats
        this.projectileSpeed = 6;
        this.projectileAOE = 0;

        // Poison Stats
        // 5 dmg/tick (every 0.5s) for 3s = 6 ticks * 5 = 30 dmg total (+5 initial = 35 total)
        this.poisonDamage = 5;
        this.poisonDuration = 3; // Seconds

        // UI Info
        this.description = "A dark caster who withers enemies over time. Weak initial hits but deadly poison.";
        this.roleDescription = "DoT / Debuffer";
    }

    performAttack(target) {
        // We override this to pass specific projectile properties
        // For Warlock, we want to inject poisonDuration and poisonDamage

        // But wait, Player.perfomAttack -> fireProjectile
        // And fireProjectile takes overrides.

        const overrides = {
            image: Assets.generatePoisonBolt(),
            poisonDuration: this.poisonDuration, // Pass the duration
            poisonDamage: this.poisonDamage      // Pass the dmg per tick
        };

        this.fireProjectile(target, overrides);
    }
}
