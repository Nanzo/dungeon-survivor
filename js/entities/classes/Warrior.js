import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Sword } from '../../combat/projectiles/Sword.js';

export class Warrior extends Player {
    constructor(game) {
        super(game);
        // Warrior Stats
        this.maxHp = 120;
        this.hp = this.maxHp;
        this.attackPower = 30; // Very High
        this.defense = 8;
        this.damageReduction = 0.10; // Starts with Iron Skin (10% Reduction)
        this.speed = 2.0; // Slowed down from 2.5
        this.attackSpeed = 0.8; // Slower attacks (was 0.5)
        this.attackRange = 150; // Short Ranged

        // Projectile / Ability Stats
        this.projectileSpeed = 6; // Slower projectile (was 12)
        this.projectileAOE = 0; // Single Target
        // Removed High Knockback (Moved to Barbarian) - Standard Sword KB will apply

        // UI Info
        this.description = "The ultimate Tank. High defense and native damage reduction allow him to withstand heavy punishment.";
        this.roleDescription = "Tank / Melee DPS";

        this.image = Assets.generateWarrior();
    }

    // update() removed - uses Player.update() which handles movement and tryAttack

    performAttack(target) {
        // Throw Sword
        // Warrior uses default stats but ensures correct Knockback/Range
        this.spawnProjectile(Sword, target, {
            range: 1000
        });
    }
}
