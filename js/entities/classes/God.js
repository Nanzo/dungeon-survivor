import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Projectile } from '../../combat/Projectile.js';

// ==========================================
// GOD MODE CONFIGURATION
// Edit these values to test different builds!
// ==========================================
export const GOD_CONFIG = {
    // Base Stats
    hp: 9999,
    attackPower: 100,
    speed: 5.0,
    defense: 999,
    attackSpeed: 0.2, // Very fast attacks
    attackRange: 800,

    // Projectile Stats
    projectileSpeed: 15,
    projectileCount: 5,  // Multishot
    projectileAOE: 100,  // Explosion Radius (0 = Single Target)
    piercing: true,      // Piercing shots?
    ricochet: 5,         // Bounces
    extraStrikes: 2,     // Double/Triple strike

    // Combat Effects
    freezeDuration: 2000, // ms
    knockback: 50,
    critChance: 1.0,      // 100% Crit
    critDamage: 5.0,      // 500% Crit Dmg
    slowPercent: 0.5,     // 50% Slow
    slowDuration: 3000,

    // Sustain
    hpRegen: 100,
    lifeOnKill: 50,

    // Visuals
    // Options: Warrior, Mage, Archer, Assassin, Barbarian, Gunslinger, IceMage, Cleric, Paladin, Bard, Monk, Necromancer, Druid
    imageType: 'Warrior',
    // Options: Fireball, Arrow, Sword, Bullet, Dagger, IceShard, HolyBolt, HammerProjectile, NoteProjectile, Fist, Axe
    projectileType: 'Fireball'
};

export class God extends Player {
    constructor(game) {
        super(game);

        // Apply Config
        this.maxHp = GOD_CONFIG.hp;
        this.hp = this.maxHp;
        this.attackPower = GOD_CONFIG.attackPower;
        this.speed = GOD_CONFIG.speed;
        this.defense = GOD_CONFIG.defense;
        this.attackSpeed = GOD_CONFIG.attackSpeed;
        this.attackRange = GOD_CONFIG.attackRange;

        // Projectile Stats
        this.projectileSpeed = GOD_CONFIG.projectileSpeed;
        this.projectileCount = GOD_CONFIG.projectileCount;
        this.projectileAOE = GOD_CONFIG.projectileAOE;
        this.piercing = GOD_CONFIG.piercing;
        this.projectileRicochet = GOD_CONFIG.ricochet;
        this.extraStrikes = GOD_CONFIG.extraStrikes;

        // Effects
        this.freezeDuration = GOD_CONFIG.freezeDuration;
        this.knockback = GOD_CONFIG.knockback;
        this.critChance = GOD_CONFIG.critChance;
        this.critDamage = GOD_CONFIG.critDamage;

        // Sustain
        this.hpRegen = GOD_CONFIG.hpRegen;
        this.lifeOnKill = GOD_CONFIG.lifeOnKill;

        // UI Info
        this.description = "GOD MODE - For Testing Only. Edit God.js to change stats.";
        this.roleDescription = "Debug / God";

        // Generate Image
        // Use reflective call to Assets
        const generatorName = `generate${GOD_CONFIG.imageType}`;
        if (Assets[generatorName]) {
            this.image = Assets[generatorName]();
        } else {
            this.image = Assets.generateWarrior();
        }
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);
        this.tryAttack(this.game.enemies);
    }

    performAttack(target) {
        // Generate Asset based on config
        let projAsset;
        const assetName = `generate${GOD_CONFIG.projectileType}`;
        if (Assets[assetName]) {
            projAsset = Assets[assetName]();
        } else {
            projAsset = Assets.generateFireball();
        }

        // Use Universal Fire Projectile
        this.fireProjectile(target, projAsset, {
            slowPercent: GOD_CONFIG.slowPercent,
            slowDuration: GOD_CONFIG.slowDuration
        });
    }
}
