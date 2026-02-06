import { Assets } from './Assets.js'; // Will update Assets to export BestiaryAssets

// Define Monster Types
const MONSTERS = {
    RAT: {
        name: "Rat",
        hp: 10, hpScale: 5,
        damage: 5, dmgScale: 0.5,
        speed: 2, speedGrowth: 0,
        xp: 10, xpScale: 2,
        width: 40, height: 25,
        assetKey: 'rat' // Special case or standard
    },
    GOBLIN: {
        name: "Goblin",
        hp: 20, hpScale: 6,
        damage: 8, dmgScale: 0.8,
        speed: 3, speedGrowth: 0.1, // Fast
        xp: 15, xpScale: 3,
        width: 40, height: 40,
        assetKey: 'goblin'
    },
    SKELETON: {
        name: "Skeleton",
        hp: 40, hpScale: 8,
        damage: 12, dmgScale: 1,
        speed: 2, speedGrowth: 0,
        xp: 25, xpScale: 4,
        width: 40, height: 40,
        assetKey: 'skeleton'
    },
    ORC: {
        name: "Orc",
        hp: 80, hpScale: 15,
        damage: 20, dmgScale: 1.5,
        speed: 1.5, speedGrowth: 0.05, // Slow, Heavy
        xp: 40, xpScale: 5,
        width: 50, height: 50,
        assetKey: 'orc'
    },
    GHOST: {
        name: "Ghost",
        hp: 50, hpScale: 10,
        damage: 15, dmgScale: 1.2,
        speed: 3.5, speedGrowth: 0.1, // Very Fast
        xp: 50, xpScale: 6,
        width: 40, height: 40,
        assetKey: 'ghost'
    },
    TROLL: {
        name: "Troll",
        hp: 200, hpScale: 25, // Tank
        damage: 30, dmgScale: 2,
        speed: 1.2, speedGrowth: 0,
        xp: 100, xpScale: 10,
        width: 60, height: 60,
        assetKey: 'troll'
    },
    VAMPIRE: {
        name: "Vampire",
        hp: 120, hpScale: 15,
        damage: 40, dmgScale: 2.5,
        speed: 4, speedGrowth: 0.1, // Zoom
        xp: 150, xpScale: 15,
        width: 40, height: 40,
        assetKey: 'vampire'
    },
    BEHOLDER: {
        name: "Beholder",
        hp: 300, hpScale: 30,
        damage: 50, dmgScale: 3,
        speed: 1, speedGrowth: 0,
        xp: 300, xpScale: 30,
        width: 60, height: 60,
        assetKey: 'beholder'
    },
    HYDRA: {
        name: "Hydra",
        hp: 400, hpScale: 40,
        damage: 40, dmgScale: 4, // Multi-hit logic not implied here, just high base
        speed: 1.5, speedGrowth: 0,
        xp: 500, xpScale: 50,
        width: 70, height: 70,
        assetKey: 'hydra'
    },
    DRAGON: {
        name: "Dragon",
        hp: 1000, hpScale: 100, // BOSS
        damage: 100, dmgScale: 5,
        speed: 2.5, speedGrowth: 0.1,
        xp: 2000, xpScale: 100,
        width: 80, height: 80,
        assetKey: 'dragon'
    }
};

export const Bestiary = {
    // Get a monster config based on current level
    getSpawn(level) {
        // Simple weight system?
        // Or pure bracket system?
        // Let's use brackets that overlap.

        const pool = [];

        // Base: Rats always small chance? Or stop spawning?
        // Let's keep them as fodder until lvl 10.
        if (level < 10) pool.push({ weight: 50, type: MONSTERS.RAT });

        // Lvl 2+: Goblins
        if (level >= 2) pool.push({ weight: 40, type: MONSTERS.GOBLIN });

        // Lvl 5+: Skeletons
        if (level >= 5) pool.push({ weight: 30, type: MONSTERS.SKELETON });

        // Lvl 8+: Orcs
        if (level >= 8) pool.push({ weight: 20, type: MONSTERS.ORC });

        // Lvl 12+: Ghost
        if (level >= 12) pool.push({ weight: 15, type: MONSTERS.GHOST });

        // Lvl 15+: Troll
        if (level >= 15) pool.push({ weight: 10, type: MONSTERS.TROLL });

        // Lvl 20+: Elite (Vampire, Beholder, etc)
        if (level >= 20) {
            pool.push({ weight: 10, type: MONSTERS.VAMPIRE });
            pool.push({ weight: 5, type: MONSTERS.BEHOLDER });
        }

        // Lvl 30+: Bosses
        if (level >= 30) {
            pool.push({ weight: 5, type: MONSTERS.HYDRA });
            pool.push({ weight: 2, type: MONSTERS.DRAGON });
        }

        // Select from pool
        const totalWeight = pool.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * totalWeight;

        for (const entry of pool) {
            r -= entry.weight;
            if (r <= 0) return entry.type;
        }

        return MONSTERS.RAT; // Fallback
    }
};
