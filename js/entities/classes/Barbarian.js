import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

export class Barbarian extends Player {
    constructor(game) {
        super(game);
        // Barbarian Stats (High Dmg, Low Def, Mid Speed)
        this.maxHp = 100;
        this.hp = this.maxHp;
        this.attackPower = 40; // High Damage
        this.defense = 3; // Low Defense
        this.speed = 4; // Average speed (between War/Mage) - User asked to halve speeds, so let's aim for ~2.0? 
        // Wait, Warrior is 2.5, Mage 1.8, Archer 3.0. 
        // Barbarian "Average" would be around 2.2? 
        this.speed = 1.8; // Slowed from 2.2
        this.attackSpeed = 1.1; // Faster (was 1.8)
        this.attackRange = 250; // Throwing Range (Mid)

        // Projectile / Ability Stats
        this.projectileSpeed = 5; // Slowed from 14
        this.projectileAOE = 0;
        this.piercing = true; // STARTING TRAIT: Pierce

        // UI Info
        this.description = "A brutal warrior who throws piercing axes that can cleave through multiple enemies.";
        this.roleDescription = "Piercing / Burst DPS";

        this.image = Assets.generateBarbarian();
    }

    // update() removed - uses Player.update()

    performAttack(target) {
        // Throw Axe
        // Barbarian has this.piercing = true in constructor, so fireProjectile picks it up automatically!
        this.fireProjectile(target, Assets.generateAxe());
    }
}
