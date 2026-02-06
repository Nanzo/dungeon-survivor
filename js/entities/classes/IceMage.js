import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { IceShard } from '../../combat/projectiles/IceShard.js';

export class IceMage extends Player {
    constructor(game) {
        super(game);
        // Ice Mage Stats (Crowd Control, Lower Dmg)
        this.maxHp = 80; // Buffed from 60
        this.hp = this.maxHp;
        this.attackPower = 25; // Lower than Fire Mage (45)
        this.defense = 0;
        this.speed = 1.6; // Slowed from 1.8
        this.attackSpeed = 1.2; // Slower (was 1.0)
        this.attackRange = 400;

        // Projectile / Ability Stats
        this.projectileSpeed = 4.5; // Slowed from 12
        this.projectileAOE = 0; // Single Target (AOE removed)
        this.freezeDuration = 1500; // 1.5 second Freeze

        // UI Info
        this.description = "A cryomancer who freezes enemies in their tracks. Lower damage but unmatched crowd control.";
        this.roleDescription = "CC / Ice Support";

        this.image = Assets.generateIceMage();
    }

    // update() removed - uses Player.update()

    performAttack(target) {
        // Shoot Ice Shard
        // Uses base freezeDuration synced in fireProjectile
        this.spawnProjectile(IceShard, target);
    }
}
