import { Player } from '../base/Player.js';
import { Assets } from '../../core/Assets.js';
import { Fireball } from '../../combat/projectiles/Fireball.js';
import { Arrow } from '../../combat/projectiles/Arrow.js';
import { Sword } from '../../combat/projectiles/Sword.js';
import { Bullet } from '../../combat/projectiles/Bullet.js';
import { Dagger } from '../../combat/projectiles/Dagger.js';
import { IceShard } from '../../combat/projectiles/IceShard.js';
import { HolyBolt } from '../../combat/projectiles/HolyBolt.js';
import { Hammer } from '../../combat/projectiles/Hammer.js';
import { FistProjectile } from '../../combat/projectiles/FistProjectile.js';
import { NoteProjectile } from '../../combat/projectiles/NoteProjectile.js';
import { Axe } from '../../combat/projectiles/Axe.js';
import { PoisonBolt } from '../../combat/projectiles/PoisonBolt.js';

const PROJECTILE_MAP = {
    'Fireball': Fireball,
    'Arrow': Arrow,
    'Sword': Sword,
    'Bullet': Bullet,
    'Dagger': Dagger,
    'IceShard': IceShard,
    'HolyBolt': HolyBolt,
    'HammerProjectile': Hammer, // Mapped name from config
    'Hammer': Hammer,
    'Fist': FistProjectile,
    'NoteProjectile': NoteProjectile,
    'Axe': Axe,
    'PoisonBolt': PoisonBolt
};

// ==========================================
// GOD MODE CONFIGURATION
// Edit these values to test different builds!
// ==========================================
export const GOD_CONFIG = {
    // Base Stats
    hp: 9999,
    attackPower: 5,
    speed: 5.0,
    defense: 999,
    attackSpeed: 2, // Very fast attacks
    attackRange: 800,

    // Projectile Stats
    projectileSpeed: 15,
    projectileCount: 0,  // Multishot
    projectileAOE: 0,  // Explosion Radius (0 = Single Target)
    piercing: false,      // Piercing shots?
    ricochet: 0,         // Bounces
    extraStrikes: 0,     // Double/Triple strike

    // Combat Effects
    freezeDuration: 0, // ms
    knockback: 30,
    critChance: 0.0,      // 100% Crit
    critDamage: 5.0,      // 500% Crit Dmg
    slowPercent: 0.5,     // 50% Slow
    slowDuration: 0,

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

    // update() removed - uses Player.update()

    performAttack(target) {
        // Resolve Class
        const ProjClass = PROJECTILE_MAP[GOD_CONFIG.projectileType] || Fireball;

        // Use Universal Spawn
        this.spawnProjectile(ProjClass, target, {
            slowPercent: GOD_CONFIG.slowPercent,
            slowDuration: GOD_CONFIG.slowDuration
        });
    }
}
