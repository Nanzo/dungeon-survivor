import { WarriorAssets } from '../assets/classes/WarriorAssets.js';
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
import { RatAssets } from '../assets/enemies/RatAssets.js';
import { GoblinAssets } from '../assets/enemies/GoblinAssets.js';
import { SkeletonAssets } from '../assets/enemies/SkeletonAssets.js';
import { OrcAssets } from '../assets/enemies/OrcAssets.js';
import { GhostAssets } from '../assets/enemies/GhostAssets.js';
import { TrollAssets } from '../assets/enemies/TrollAssets.js';
import { VampireAssets } from '../assets/enemies/VampireAssets.js';
import { BeholderAssets } from '../assets/enemies/BeholderAssets.js';
import { HydraAssets } from '../assets/enemies/HydraAssets.js';
import { DragonAssets } from '../assets/enemies/DragonAssets.js';
import { EnvironmentAssets } from '../assets/environment/EnvironmentAssets.js';
import { WarlockAssets } from '../assets/classes/WarlockAssets.js';

export class Assets {
    // Characters
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

    // Projectiles (Delegating to proper class)
    static generateFireball() { return MageAssets.generateFireball(); }
    static generateArrow() { return ArcherAssets.generateArrow(); }
    static generateSword() { return WarriorAssets.generateSword(); }
    static generateBullet() { return GunslingerAssets.generateBullet(); }
    static generateDagger() { return AssassinAssets.generateDagger(); }
    static generateIceShard() { return IceMageAssets.generateIceShard(); }
    static generateHolyBolt() { return ClericAssets.generateHolyBolt(); }
    static generateHammerProjectile() { return PaladinAssets.generateHammerProjectile(); }
    static generateNoteProjectile() { return BardAssets.generateNoteProjectile(); }
    static generateNoteProjectile() { return BardAssets.generateNoteProjectile(); }
    static generateFist() { return MonkAssets.generateFistProjectile(); }
    static generatePoisonBolt() { return WarlockAssets.generatePoisonBolt(); }

    // Summoners
    static generateNecromancer() { return SummonerAssets.generateNecromancer(); }
    static generateDruid() { return SummonerAssets.generateDruid(); }
    static generateSkeleton() { return SummonerAssets.generateSkeleton(); }
    static generateBear() { return SummonerAssets.generateBear(); }
    static generateAxe() { return BarbarianAssets.generateAxe(); }

    // Fix for generateBullet above: Class methods are static, so direct call:
    // Actually, I can just call GunslingerAssets.generateBullet().

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
            case 'God': return Assets.generateWarrior(); // Fallback for God icon
            default: return RatAssets.generateRat();
        }
    }

    // Bestiary Helpers
    static getEnemyAsset(key) {
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

// Re-implementing generateBullet simpler to avoid confusion in the export above
Assets.generateBullet = function () { return GunslingerAssets.generateBullet(); };
