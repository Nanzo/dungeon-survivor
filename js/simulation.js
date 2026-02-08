import { Game } from './game.js';

const CLASSES = [
    'Warrior', 'Mage', 'Archer', 'Assassin', 'Barbarian',
    'Gunslinger', 'IceMage', 'Cleric', 'Paladin', 'Bard',
    'Monk', 'Necromancer', 'Druid', 'Warlock', 'Lancer'
];

// Initialize UI
const classGrid = document.getElementById('classGrid');
if (classGrid) {
    CLASSES.forEach(c => {
        const div = document.createElement('div');
        div.innerHTML = `<label><input type="checkbox" class="class-check" value="${c}" checked> ${c}</label>`;
        classGrid.appendChild(div);
    });

    document.getElementById('btnRun').addEventListener('click', startSimulation);
}

const SIMULATION_DT = 16; // 60 FPS step
const MAX_SIM_TIME = 15 * 60 * 1000; // Cap at 15 mins (Victory/Timeout)

const results = {};

async function startSimulation() {
    const btn = document.getElementById('btnRun');
    const iterInput = document.getElementById('iterInput');
    const statusDiv = document.getElementById('status') || createStatusDiv();
    const progressFill = document.getElementById('progressFill');
    document.getElementById('progressBar').style.display = 'block';

    const iterations = parseInt(iterInput.value) || 10;

    // Get Selected Classes
    const checkboxes = document.querySelectorAll('.class-check:checked');
    const selectedClasses = Array.from(checkboxes).map(cb => cb.value);

    if (selectedClasses.length === 0) {
        alert("Please select at least one class.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Running...";

    // Reset Results
    for (const k of Object.keys(results)) delete results[k];

    let totalRuns = selectedClasses.length * iterations;
    let runsCompleted = 0;

    console.log("Starting Simulation...");

    for (const className of selectedClasses) {
        results[className] = {
            survivedTimes: [],
            bossesKilled: [],
            levels: [],
            kills: [],
            damage: [],
            damageBySource: [],
            healing: [],
            healingBySource: [],
            critStats: [],
            upgradeCounts: {},
            wins: 0
        };

        for (let i = 0; i < iterations; i++) {
            statusDiv.innerText = `Simulating ${className} (Run ${i + 1}/${iterations})...\nTotal Progress: ${Math.floor((runsCompleted / totalRuns) * 100)}%`;
            progressFill.style.width = `${(runsCompleted / totalRuns) * 100}%`;

            await new Promise(r => setTimeout(r, 0)); // Yield to UI

            const game = new Game(800, 600, className.toLowerCase());

            // Mock Input (Auto-Aim / Auto-Move?)
            // For fairness, let's make them stand still or move randomly?
            // Static survival is a good baseline check for DPS/Tankiness check.
            // Or simple simple AI: Move towards center if far, random wiggle?
            // Let's go with STATIC + AUTO-FIRE for now to test raw statcheck.
            // Game.js Input handles keys. We can just simulate 'mouse' for aiming?
            // Player.update uses input.

            // Override Player Logic for "Bot" features if needed, 
            // but for now, let's assume they fire nearest logic is in Player?
            // Most classes manual aim. We need to auto-aim.
            // We can inject a "BotInput" into game.

            // Auto-Aim Hack
            game.input.mouse = { x: 400, y: 300 }; // Center
            game.input.activeKeys = {}; // No movement

            // Override Render (Disable)
            game.draw = () => { };

            // Fast Forward Loop
            while (!game.isGameOver && game.gameTime < MAX_SIM_TIME) {
                // Mock Auto-Aim closest enemy
                const nearest = game.enemies[0]; // Naive
                if (nearest) {
                    game.input.mouse.x = nearest.x;
                    game.input.mouse.y = nearest.y;
                    game.input.mouseDown = true; // Auto-fire
                } else {
                    game.input.mouseDown = false;
                }

                // Auto-Level Up (Always pick first upgrade)
                if (game.isPaused && game.levelUpScreen) {
                    // Game pauses on level up. We need to force pick.
                    // Access player upgrades?
                    // Game.js triggerLevelUp calls levelUpScreen.show()
                    // We need to intercept or force choice.
                    // The logic is:
                    // 1. generate choices
                    // 2. wait for click
                    // We can patch game.triggerLevelUp to instant-pick random.
                }

                game.update(SIMULATION_DT);
            }

            // Record Stats
            // Ensure simStats exists if they died instantly
            const stats = game.simStats || { kills: 0, damage: 0, damageSources: {}, healing: 0, healingSources: {}, critDmg: 0, critCount: 0 };

            results[className].survivedTimes.push(game.gameTime);
            results[className].bossesKilled.push(game.bossKills);
            results[className].levels.push(game.player.level);
            results[className].kills.push(stats.kills);
            results[className].damage.push(stats.damage);
            results[className].damageBySource.push(stats.damageSources);

            results[className].healing.push(stats.healing);
            results[className].healingBySource.push(stats.healingSources);
            results[className].critStats.push({ count: stats.critCount, damage: stats.critDmg });

            // Track Frequency of Upgrades
            if (game.player.upgrades) {
                game.player.upgrades.forEach(u => {
                    results[className].upgradeCounts[u] = (results[className].upgradeCounts[u] || 0) + 1;
                });
            }

            if (game.bossKills >= 9) results[className].wins++;

            runsCompleted++;
        }
    }

    console.log("Simulation Complete");
    progressFill.style.width = "100%";
    statusDiv.innerText = "Done! Downloading results...";
    btn.innerText = "Run Again";
    btn.disabled = false;
    downloadResults(results);
}

function createStatusDiv() {
    // If running in main game, we might not have #status. Create overlay.
    const div = document.createElement('div');
    div.id = 'status';
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.right = '10px';
    div.style.background = 'rgba(0,0,0,0.8)';
    div.style.color = 'white';
    div.style.padding = '10px';
    div.style.zIndex = '9999';
    document.body.appendChild(div);
    return div;
}

// Monkey-Patch Game.triggerLevelUp inside the loop? 
// Better to extend Game class or patch prototype.
const originalTrigger = Game.prototype.triggerLevelUp;
const originalBossReward = Game.prototype.triggerBossReward;

import { Upgrades } from './core/Upgrades.js';

Game.prototype.triggerLevelUp = function () {
    this.isPaused = false;

    // 1. Get Eligible Upgrades
    const eligible = Upgrades.filter(u => !u.condition || u.condition(this.player));

    if (eligible.length === 0) {
        // No upgrades left? Buff raw stats
        this.player.attackPower += 5;
        this.player.maxHp += 20;
        this.player.hp += 20;
        return;
    }

    // 2. Score Upgrades (Heuristic)
    // Priority: Sustain > AOE/Multi > Raw Dmg > Utility
    const TIER_SCORES = {
        'multishot': 100,
        'ricochet': 95,
        'piercing_rounds': 90,
        'combo_strike': 85,
        'divine_favor': 80, // Life on Kill is crucial for survival
        'iron_skin': 75,
        'vitality': 70,
        'strength': 60,
        'haste': 55,
        'explosive': 50,
        'lethal_precision': 45,
        'brutal_impact': 40,
        'deep_freeze': 35,
        'knockback': 30,
        'poison': 25,
        'swiftness': 10,
        'scope': 5,
        'velocity': 5
    };

    // Sort by Score (High to Low)
    eligible.sort((a, b) => {
        const scoreA = TIER_SCORES[a.id] || 20; // Default score
        const scoreB = TIER_SCORES[b.id] || 20;
        return scoreB - scoreA;
    });

    // 3. Pick Best
    const bestUpgrade = eligible[0];

    // 4. Apply
    bestUpgrade.apply(this.player);

    // Track Upgrade
    if (!this.player.upgrades) this.player.upgrades = [];
    this.player.upgrades.push(bestUpgrade.id);
};

Game.prototype.triggerBossReward = function () {
    this.player.maxHp *= 1.2;
    this.player.hp = this.player.maxHp;
    this.isPaused = false;
};

// Monkey-Patches for Tracking (Only active during Sim)
import { Player } from './entities/base/Player.js';

const originalGainXp = Player.prototype.gainXp;
Player.prototype.gainXp = function (amount) {
    originalGainXp.call(this, amount);
    // Track Kills (approximate via XP gain triggers)
    if (!this.game.simStats) this.game.simStats = { kills: 0, damage: 0 };
    this.game.simStats.kills++;
};

const originalRecordDmg = Game.prototype.recordDamage;
Game.prototype.recordDamage = function (amount, source = 'unknown', isCrit = false) {
    originalRecordDmg.call(this, amount);
    if (!this.simStats) this.simStats = {
        kills: 0,
        damage: 0,
        damageSources: {},
        healing: 0,
        healingSources: {},
        critDmg: 0,
        critCount: 0
    };

    this.simStats.damage += amount;

    // Track Source
    if (!this.simStats.damageSources[source]) this.simStats.damageSources[source] = 0;
    this.simStats.damageSources[source] += amount;

    // Track Crits
    if (isCrit) {
        this.simStats.critCount++;
        this.simStats.critDmg += amount;
    }
};

Game.prototype.recordHeal = function (amount, source = 'unknown') {
    if (!this.simStats) this.simStats = { kills: 0, damage: 0, damageSources: {}, healing: 0, healingSources: {}, critDmg: 0, critCount: 0 };

    this.simStats.healing += amount;

    if (!this.simStats.healingSources[source]) this.simStats.healingSources[source] = 0;
    this.simStats.healingSources[source] += amount;
};


function downloadResults(data) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "simulation_results.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
