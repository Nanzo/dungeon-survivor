import { Assets } from './Assets.js'; // Will update Assets to export BestiaryAssets

// Define Monster Types
const MONSTERS = {
    RAT: {
        name: "Rat",
        stage: 0,
        hp: 10, hpScale: 5,
        damage: 5, dmgScale: 0.5,
        speed: 2, speedGrowth: 0,
        xp: 10, xpScale: 2,
        width: 40, height: 25,
        assetKey: 'rat' // Special case or standard
    },
    GOBLIN: {
        name: "Goblin",
        stage: 1,
        hp: 20, hpScale: 6,
        damage: 8, dmgScale: 0.8,
        speed: 2.2, speedGrowth: 0.1, // Adjusted from 3 (too fast)
        xp: 15, xpScale: 3,
        width: 40, height: 40,
        assetKey: 'goblin'
    },
    SKELETON: {
        name: "Skeleton",
        stage: 2,
        hp: 40, hpScale: 8,
        damage: 12, dmgScale: 1,
        speed: 2, speedGrowth: 0,
        xp: 25, xpScale: 4,
        width: 40, height: 40,
        assetKey: 'skeleton'
    },
    ORC: {
        name: "Orc",
        stage: 3,
        hp: 80, hpScale: 15,
        damage: 20, dmgScale: 1.5,
        speed: 1.5, speedGrowth: 0.05, // Slow, Heavy
        xp: 40, xpScale: 5,
        width: 50, height: 50,
        assetKey: 'orc'
    },
    GHOST: {
        name: "Ghost",
        stage: 4,
        hp: 50, hpScale: 10,
        damage: 15, dmgScale: 1.2,
        speed: 3.5, speedGrowth: 0.1, // Very Fast
        xp: 50, xpScale: 6,
        width: 40, height: 40,
        assetKey: 'ghost'
    },
    TROLL: {
        name: "Troll",
        stage: 5,
        hp: 200, hpScale: 25, // Tank
        damage: 30, dmgScale: 2,
        speed: 1.2, speedGrowth: 0,
        xp: 100, xpScale: 10,
        width: 60, height: 60,
        assetKey: 'troll'
    },
    VAMPIRE: {
        name: "Vampire",
        stage: 6,
        hp: 120, hpScale: 15,
        damage: 40, dmgScale: 2.5,
        speed: 4, speedGrowth: 0.1, // Zoom
        xp: 150, xpScale: 15,
        width: 40, height: 40,
        assetKey: 'vampire'
    },
    BEHOLDER: {
        name: "Beholder",
        stage: 7,
        hp: 300, hpScale: 30,
        damage: 50, dmgScale: 3,
        speed: 1, speedGrowth: 0,
        xp: 300, xpScale: 30,
        width: 60, height: 60,
        assetKey: 'beholder'
    },
    HYDRA: {
        name: "Hydra",
        stage: 8,
        hp: 400, hpScale: 40,
        damage: 40, dmgScale: 4, // Multi-hit logic not implied here, just high base
        speed: 1.5, speedGrowth: 0,
        xp: 500, xpScale: 50,
        width: 70, height: 70,
        assetKey: 'hydra'
    },
    DRAGON: {
        name: "Dragon",
        stage: 9,
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
    getSpawn(bossKills) {
        // Monster Spawn Weights based on Boss Kills (Progress)
        // Adjust weights to phase out weaker monsters as time goes on.

        const pool = [];

        // Helper to add monster with weight
        const add = (type, weight) => {
            if (weight > 0) pool.push({ type, weight });
        };

        // --- STAGE 0: RATS (The Beginning) ---
        // Dominant at start, rare at stage 1, GONE by stage 2 (Middle)
        if (bossKills === 0) add(MONSTERS.RAT, 100);
        else if (bossKills === 1) add(MONSTERS.RAT, 20);
        else if (bossKills === 2) add(MONSTERS.RAT, 5); // Very very rare
        // BossKills >= 3: No Rats

        // --- STAGE 1: GOBLINS (After Rat Boss) ---
        // Introduce at S1, Peak S1-S2, Phase out by S5
        if (bossKills >= 1 && bossKills <= 4) {
            let weight = 80;
            if (bossKills === 1) weight = 100;
            if (bossKills === 2) weight = 80;
            if (bossKills === 3) weight = 40;
            if (bossKills === 4) weight = 10;
            add(MONSTERS.GOBLIN, weight);
        }

        // --- STAGE 2: SKELETONS (After Goblin Boss) ---
        // Introduce S2, Peak S3, Phase out by S6
        if (bossKills >= 2 && bossKills <= 6) {
            let weight = 80;
            if (bossKills === 2) weight = 60; // Just introduced
            if (bossKills === 3) weight = 100; // Peak
            if (bossKills >= 5) weight = 30; // Fading
            add(MONSTERS.SKELETON, weight);
        }

        // --- STAGE 3: ORCS (After Skeleton Boss) ---
        // Introduce S3, Peak S4-S5, Phase out by S8 (End)
        if (bossKills >= 3 && bossKills <= 8) {
            let weight = 70;
            if (bossKills === 3) weight = 50;
            if (bossKills >= 4 && bossKills <= 5) weight = 100; // Main enemy mid-game
            if (bossKills >= 7) weight = 20;
            add(MONSTERS.ORC, weight);
        }

        // --- STAGE 4: GHOSTS ---
        // Fast, annoying. Mid-late game harassment.
        if (bossKills >= 4) {
            let weight = 40;
            if (bossKills >= 6) weight = 60; // More common later
            add(MONSTERS.GHOST, weight);
        }

        // --- STAGE 5: TROLLS ---
        // Tanks. Late game.
        if (bossKills >= 5) {
            add(MONSTERS.TROLL, (bossKills - 4) * 20); // 20, 40, 60...
        }

        // --- STAGE 6+: ELITES ---
        if (bossKills >= 6) {
            add(MONSTERS.VAMPIRE, (bossKills - 5) * 15);
            add(MONSTERS.BEHOLDER, (bossKills - 5) * 10);
        }
        if (bossKills >= 7) {
            add(MONSTERS.HYDRA, (bossKills - 6) * 10);
        }
        if (bossKills >= 8) {
            add(MONSTERS.DRAGON, (bossKills - 7) * 5); // Very rare regular spawn
        }

        // Select from pool
        const totalWeight = pool.reduce((a, b) => a + b.weight, 0);

        // Fallback if pool is empty (shouldn't happen with logic above, but safety first)
        if (totalWeight === 0) return MONSTERS.RAT;

        let r = Math.random() * totalWeight;

        for (const entry of pool) {
            r -= entry.weight;
            if (r <= 0) return entry.type;
        }

        return MONSTERS.RAT; // Fallback
    },

    getBoss(bossKills) {
        // Fixed progression based on kills
        // 0 kills -> need to fight Rat Boss
        // 1 kill -> need to fight Goblin Boss
        if (bossKills === 0) return MONSTERS.RAT;
        if (bossKills === 1) return MONSTERS.GOBLIN;
        if (bossKills === 2) return MONSTERS.SKELETON;
        if (bossKills === 3) return MONSTERS.ORC;
        if (bossKills === 4) return MONSTERS.GHOST;
        if (bossKills === 5) return MONSTERS.TROLL;
        if (bossKills === 6) return MONSTERS.VAMPIRE;
        if (bossKills === 7) return MONSTERS.BEHOLDER;
        if (bossKills === 8) return MONSTERS.HYDRA;

        return MONSTERS.DRAGON; // 9+ kills
    },

    getAllMonsters() {
        return Object.values(MONSTERS);
    }
};
