import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class Warrior extends Player {
    constructor(game) {
        super(game);
        // Warrior Stats
        this.maxHp = 120;
        this.hp = this.maxHp;
        this.attackPower = 30; // Very High
        this.defense = 8;
        this.speed = 2.0; // Slowed down from 2.5
        this.attackSpeed = 0.8; // Slower attacks (was 0.5)
        this.attackRange = 150; // Short Ranged

        // Projectile / Ability Stats
        this.projectileSpeed = 6; // Slower projectile (was 12)
        this.projectileAOE = 0; // Single Target
        this.knockback = 45; // STARTING TRAIT: High Knockback

        // UI Info
        this.description = "A sturdy fighter who excels at close-range combat. High defense and health allow him to withstand heavy punishment.";
        this.roleDescription = "Tank / Melee DPS";

        this.image = Assets.generateWarrior();
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        // Throw Sword
        // Warrior uses default stats but ensures correct Knockback/Range
        this.fireProjectile(target, Assets.generateSword(), {
            range: 1000,
            knockback: this.knockback // Explicitly pass current knockback
        });
    }
}
