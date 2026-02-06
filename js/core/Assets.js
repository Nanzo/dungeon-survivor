import { WarriorAssets } from '../assets/classes/WarriorAssets.js';
import { LancerAssets } from '../assets/classes/LancerAssets.js';
import { MageAssets } from '../assets/classes/MageAssets.js';
import { ArcherAssets } from '../assets/classes/ArcherAssets.js';
import { AssassinAssets } from '../assets/classes/AssassinAssets.js';
import { BarbarianAssets } from '../assets/classes/BarbarianAssets.js';
import { GunslingerAssets } from '../assets/classes/GunslingerAssets.js';
import { IceMageAssets } from '../assets/classes/IceMageAssets.js';
import { ClericAssets } from '../assets/classes/ClericAssets.js';
import { PaladinAssets } from '../assets/classes/PaladinAssets.js';
import { BardAssets } from '../assets/classes/BardAssets.js';
import { MonkAssets } from '../assets/classes/MonkAssets.js';
import { SummonerAssets } from '../assets/classes/SummonerAssets.js';
import { WarlockAssets } from '../assets/classes/WarlockAssets.js';
import { EnvironmentAssets } from '../assets/environment/EnvironmentAssets.js';

// Normal Enemies
import { RatAssets } from '../assets/enemies/normal/RatAssets.js';
import { GoblinAssets } from '../assets/enemies/normal/GoblinAssets.js';
import { SkeletonAssets } from '../assets/enemies/normal/SkeletonAssets.js';
import { OrcAssets } from '../assets/enemies/normal/OrcAssets.js';
import { GhostAssets } from '../assets/enemies/normal/GhostAssets.js';
import { TrollAssets } from '../assets/enemies/normal/TrollAssets.js';
import { VampireAssets } from '../assets/enemies/normal/VampireAssets.js';
import { BeholderAssets } from '../assets/enemies/normal/BeholderAssets.js';
import { HydraAssets } from '../assets/enemies/normal/HydraAssets.js';
import { DragonAssets } from '../assets/enemies/normal/DragonAssets.js';

// Boss Enemies
import { BossRatAssets } from '../assets/enemies/bosses/BossRatAssets.js';
import { BossGoblinAssets } from '../assets/enemies/bosses/BossGoblinAssets.js';
import { BossSkeletonAssets } from '../assets/enemies/bosses/BossSkeletonAssets.js';
import { BossOrcAssets } from '../assets/enemies/bosses/BossOrcAssets.js';
import { BossGhostAssets } from '../assets/enemies/bosses/BossGhostAssets.js';
import { BossTrollAssets } from '../assets/enemies/bosses/BossTrollAssets.js';

console.log("Assets Loaded");

export class Assets {
    // Characters
    static generateLancer() { return LancerAssets.generateLancer(); }
    static generateWarrior() { return WarriorAssets.generateWarrior(); }
    static generateMage() { return MageAssets.generateMage(); }
    static generateArcher() { return ArcherAssets.generateArcher(); }
    static generateAssassin() { return AssassinAssets.generateAssassin(); }
    static generateBarbarian() { return BarbarianAssets.generateBarbarian(); }
    static generateGunslinger() { return GunslingerAssets.generateGunslinger(); }
    static generateIceMage() { return IceMageAssets.generateIceMage(); }
    static generateCleric() { return ClericAssets.generateCleric(); }
    static generatePaladin() { return PaladinAssets.generatePaladin(); }
    static generateBard() { return BardAssets.generateBard(); }
    static generateMonk() { return MonkAssets.generateMonk(); }
    static generateRat() { return RatAssets.generateRat(); }
    static generateWarlock() { return WarlockAssets.generateWarlock(); }

    // Projectiles
    static generateFireball() { return MageAssets.generateFireball(); }
    static generateArrow() { return ArcherAssets.generateArrow(); }
    static generateSword() { return WarriorAssets.generateSword(); }
    static generateBullet() { return GunslingerAssets.generateBullet(); }
    static generateDagger() { return AssassinAssets.generateDagger(); }
    static generateIceShard() { return IceMageAssets.generateIceShard(); }
    static generateHolyBolt() { return ClericAssets.generateHolyBolt(); }
    static generateHammerProjectile() { return PaladinAssets.generateHammerProjectile(); }
    static generateNoteProjectile() { return BardAssets.generateNoteProjectile(); }
    static generateFist() { return MonkAssets.generateFistProjectile(); }
    static generatePoisonBolt() { return WarlockAssets.generatePoisonBolt(); }
    static generateSpear() { return LancerAssets.generateSpear(); }

    // Summoners
    static generateNecromancer() { return SummonerAssets.generateNecromancer(); }
    static generateDruid() { return SummonerAssets.generateDruid(); }
    static generateSkeleton() { return SummonerAssets.generateSkeleton(); }
    static generateBear() { return SummonerAssets.generateBear(); }
    static generateAxe() { return BarbarianAssets.generateAxe(); }

    // Environment
    static generateTileset() { return EnvironmentAssets.generateTileset(); }
    static createTile(type) { return EnvironmentAssets.createTile(type); }

    // Utility
    static getAssetByType(type) {
        switch (type) {
            case 'Rat': return RatAssets.generateRat();
            case 'Warrior': return WarriorAssets.generateWarrior();
            case 'Mage': return MageAssets.generateMage();
            case 'Archer': return ArcherAssets.generateArcher();
            case 'Assassin': return AssassinAssets.generateAssassin();
            case 'Barbarian': return BarbarianAssets.generateBarbarian();
            case 'Gunslinger': return GunslingerAssets.generateGunslinger();
            case 'IceMage': return IceMageAssets.generateIceMage();
            case 'Cleric': return ClericAssets.generateCleric();
            case 'Paladin': return PaladinAssets.generatePaladin();
            case 'Bard': return BardAssets.generateBard();
            case 'Monk': return MonkAssets.generateMonk();
            case 'Necromancer': return Assets.generateNecromancer();
            case 'Druid': return Assets.generateDruid();
            case 'God': return Assets.generateWarrior();
            case 'Warlock': return Assets.generateWarlock();
            case 'Lancer': return Assets.generateLancer();
            default: return RatAssets.generateRat();
        }
    }

    // Bestiary Helpers
    static getEnemyAsset(key, isBoss = false) {
        if (isBoss) {
            switch (key) {
                case 'rat': return BossRatAssets.generateBossRat();
                case 'goblin': return BossGoblinAssets.generateBossGoblin();
                case 'skeleton': return BossSkeletonAssets.generateBossSkeleton();
                case 'orc': return BossOrcAssets.generateBossOrc();
                case 'ghost': return BossGhostAssets.generateBossGhost();
                case 'troll': return BossTrollAssets.generateBossTroll();
                // Fallbacks for un-implemented Boss Assets (will be scaled normal assets)
                case 'vampire': return VampireAssets.generateVampire();
                case 'beholder': return BeholderAssets.generateBeholder();
                case 'hydra': return HydraAssets.generateHydra();
                case 'dragon': return DragonAssets.generateDragon();
                default: return BossRatAssets.generateBossRat();
            }
        } else {
            switch (key) {
                case 'rat': return RatAssets.generateRat();
                case 'goblin': return GoblinAssets.generateGoblin();
                case 'skeleton': return SkeletonAssets.generateSkeleton();
                case 'orc': return OrcAssets.generateOrc();
                case 'ghost': return GhostAssets.generateGhost();
                case 'troll': return TrollAssets.generateTroll();
                case 'vampire': return VampireAssets.generateVampire();
                case 'beholder': return BeholderAssets.generateBeholder();
                case 'hydra': return HydraAssets.generateHydra();
                case 'dragon': return DragonAssets.generateDragon();
                default: return RatAssets.generateRat();
            }
        }
    }
}

// Fix for generateBullet usage
Assets.generateBullet = function () { return GunslingerAssets.generateBullet(); };
