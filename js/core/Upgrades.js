export const Upgrades = [
    {
        id: 'strength',
        name: 'Strength',
        description: 'Increase Damage by 5 (Flat)',
        rarity: 'common',
        condition: (player) => player.attackPower < 100,
        apply: (player) => {
            player.attackPower += 5;
            console.log(`Strength Upgraded! New Damage: ${player.attackPower}`);
        }
    },
    {
        id: 'haste',
        name: 'Haste',
        description: 'Reduce Attack Delay by 0.05s',
        rarity: 'common',
        condition: (player) => player.attackSpeed > 0.2,
        apply: (player) => {
            player.attackSpeed = Math.max(0.1, player.attackSpeed - 0.05);
            console.log(`Haste Upgraded! New Speed: ${player.attackSpeed.toFixed(2)}s`);
        }
    },
    {
        id: 'vitality',
        name: 'Vitality',
        description: 'Increase Max HP by 25 & Heal',
        rarity: 'common',
        condition: (player) => player.maxHp < 500,
        apply: (player) => {
            player.maxHp += 25;
            player.hp += 25;
            console.log(`Vitality Upgraded! New MaxHP: ${player.maxHp}`);
        }

    },
    {
        id: 'reinforced_armor',
        name: 'Reinforced Armor',
        description: 'Increase Defense by 5',
        rarity: 'common',
        condition: (player) => player.defense < 50,
        apply: (player) => {
            player.defense += 5;
            console.log(`Armor Upgraded! New Defense: ${player.defense}`);
        }
    },
    {
        id: 'iron_skin',
        name: 'Iron Skin',
        description: 'Reduce incoming damage by 10% (Max 80%)',
        rarity: 'uncommon', // Stronger mitigation
        condition: (player) => (player.damageReduction || 0) < 0.8,
        apply: (player) => {
            player.damageReduction = (player.damageReduction || 0) + 0.10;
            console.log(`Iron Skin Upgraded! Reduction: ${(player.damageReduction * 100).toFixed(0)}%`);
        }
    },
    {
        id: 'swiftness',
        name: 'Swiftness',
        description: 'Increase Move Speed by 0.5',
        rarity: 'common',
        condition: (player) => player.speed < 10,
        apply: (player) => {
            player.speed += 0.5;
            console.log(`Swiftness Upgraded! New Speed: ${player.speed.toFixed(2)}`);
        }
    },
    {
        id: 'scope',
        name: 'Scope',
        description: 'Increase Attack Range by 100',
        rarity: 'uncommon',
        condition: (player) => (player.attackRange || 0) < 800,
        apply: (player) => {
            player.attackRange += 100;
            console.log(`Scope Upgraded! New Range: ${player.attackRange}`);
        }
    },
    {
        id: 'explosive',
        name: 'Explosive Rounds',
        description: 'Increase Blast Radius by 50',
        rarity: 'rare',
        condition: (player) => (player.projectileAOE || 0) < 600,
        apply: (player) => {
            player.projectileAOE += 50;
            console.log(`Explosive Upgraded! New AOE: ${player.projectileAOE}`);
        }
    },
    {
        id: 'velocity',
        name: 'High Velocity',
        description: 'Increase Projectile Speed by 1',
        rarity: 'common', // Downgraded
        condition: (player) => player.projectileSpeed < 15,
        apply: (player) => {
            player.projectileSpeed += 1;
            console.log(`Velocity Upgraded! New ProjSpeed: ${player.projectileSpeed}`);
        }
    },
    {
        id: 'multishot',
        name: 'Multishot',
        description: '+1 Projectile (Extra shots hit random nearby enemies)',
        rarity: 'legendary', // Lengendary upgrade!
        condition: (player) => (player.projectileCount || 1) < 5,
        apply: (player) => {
            player.projectileCount = (player.projectileCount || 1) + 1;
            console.log(`Multishot Upgraded! Total Projectiles: ${player.projectileCount}`);
        }
    },
    {
        id: 'knockback',
        name: 'Heavy Impact',
        description: 'Increase Knockback by 25',
        rarity: 'rare',
        condition: (player) => (player.knockback || 0) < 150,
        apply: (player) => {
            player.knockback = (player.knockback || 0) + 25;
            console.log(`Knockback Upgraded! New Knockback: ${player.knockback}`);
        }
    },
    {
        id: 'deep_freeze',
        name: 'Deep Freeze',
        description: '+0.5s Freeze Duration',
        rarity: 'epic',
        condition: (player) => (player.freezeDuration || 0) < 3000,
        apply: (player) => {
            player.freezeDuration = (player.freezeDuration || 0) + 500;
            console.log(`Freeze Upgraded! New Duration: ${player.freezeDuration}ms`);
        }
    },
    {
        id: 'lethal_precision',
        name: 'Lethal Precision',
        description: '+10% Crit Chance',
        rarity: 'uncommon',
        condition: (player) => (player.critChance || 0) < 1.0,
        apply: (player) => {
            player.critChance = (player.critChance || 0) + 0.10;
            console.log(`Crit Chance Upgraded! New Chance: ${player.critChance}`);
        }
    },
    {
        id: 'brutal_impact',
        name: 'Brutal Impact',
        description: '+25% Crit Damage',
        rarity: 'uncommon',
        condition: (player) => (player.critDamage || 0) < 5.0,
        apply: (player) => {
            player.critDamage = (player.critDamage || 1.5) + 0.25;
            console.log(`Crit Damage Upgraded! New Damage: ${player.critDamage}`);
        }
    },
    {
        id: 'blessed_aura',
        name: 'Blessed Aura',
        description: '+2 HP Regen / Sec',
        rarity: 'uncommon', // Changed to Uncommon per user request
        description: '+2 HP Regen / Sec',
        rarity: 'uncommon', // Changed to Uncommon per user request
        condition: (player) => (player.hpRegen || 0) < 30,
        apply: (player) => {
            player.hpRegen = (player.hpRegen || 0) + 2;
            console.log(`HpRegen Upgraded! New Regen: ${player.hpRegen}/s`);
        }
    },
    {
        id: 'divine_favor',
        name: 'Divine Favor',
        description: '+5 HP on Kill',
        rarity: 'rare',
        condition: (player) => (player.lifeOnKill || 0) < 30,
        apply: (player) => {
            player.lifeOnKill = (player.lifeOnKill || 0) + 5;
            console.log(`LifeOnKill Upgraded! New Lifesteal: ${player.lifeOnKill}`);
        }
    },
    {
        id: 'acoustics',
        name: 'Acoustics',
        description: '+1 Ricochet / Bounce',
        rarity: 'epic', // Epic
        condition: (player) => (player.projectileRicochet || 0) < 5,
        apply: (player) => {
            player.projectileRicochet = (player.projectileRicochet || 0) + 1;
            console.log(`Ricochet Upgraded! New Count: ${player.projectileRicochet}`);
        }
    },
    {
        id: 'combo_strike',
        name: 'Combo Strike',
        description: '+1 Extra Hit per Attack (Stackable!)',
        rarity: 'legendary', // Legendary
        condition: (player) => (player.extraStrikes || 0) < 5,
        apply: (player) => {
            player.extraStrikes = (player.extraStrikes || 0) + 1;
            console.log(`Combo Strike Upgraded! Total Extra Strikes: ${player.extraStrikes}`);
        }
    },
    {
        id: 'piercing_rounds',
        name: 'Piercing Rounds',
        description: 'Projectiles pass through enemies. Triggers explosions on EVERY hit if you have AOE!',
        rarity: 'legendary', // Legendary
        condition: (player) => !player.piercing,
        apply: (player) => {
            player.piercing = true;
            console.log(`Piercing Upgraded!`);
        }
    },
    {
        id: 'venom_strike',
        name: 'Venomous Strike',
        description: 'Attacks apply Poison (3 dmg / 0.5s for 3s)',
        rarity: 'uncommon',
        condition: (player) => (player.poisonDamage || 0) < 50,
        apply: (player) => {
            if (player.poisonDuration > 0) {
                player.poisonDamage += 3;
                console.log(`Poison Buffed! New Tick Dmg: ${player.poisonDamage}`);
            } else {
                player.poisonDuration = 3000;
                player.poisonDamage = 3;
                console.log(`Poison Added!`);
            }
        }
    },
    {
        id: 'crippling_shot',
        name: 'Crippling Shot',
        description: 'Attacks Slow enemies by 15% for 1.5s',
        rarity: 'rare', // User requested Blue (Rare)
        condition: (player) => (player.slowPercent || 0) < 0.8, // Stop at 80%
        apply: (player) => {
            player.slowDuration = 1500; // Standardized to 1.5s
            player.slowPercent = Math.min(1.0, (player.slowPercent || 0) + 0.10);
            console.log(`Crippling Shot Acquired! Slows by 10% (Total: ${(player.slowPercent * 100).toFixed(0)}%)`);
        }
    }
];

export function getRandomUpgrades(count, player, minRarity = 'common') {
    // 1. Define Weights
    const rarityWeights = {
        common: 50,
        uncommon: 30,
        rare: 15,
        epic: 4,
        legendary: 1
    };

    // Filter weights based on minRarity
    let activeWeights = { ...rarityWeights };
    if (minRarity === 'uncommon') {
        delete activeWeights.common;
    } else if (minRarity === 'rare') {
        delete activeWeights.common;
        delete activeWeights.uncommon;
    } else if (minRarity === 'epic') {
        delete activeWeights.common;
        delete activeWeights.uncommon;
        delete activeWeights.rare;
    }

    // Update total weight
    const totalWeight = Object.values(activeWeights).reduce((a, b) => a + b, 0);

    // 2. Filter available upgrades based on condition AND allowed rarities
    const available = Upgrades.filter(u => {
        // Filter by Condition
        if (u.condition && player) {
            if (!u.condition(player)) return false;
        }

        // Filter by Allowed Rarity (must be in activeWeights)
        if (activeWeights[u.rarity] === undefined) return false;

        return true;
    });

    // Fallback if empty (e.g. no upgrades left for this rarity tier)
    let pool = available;
    let currentTotalWeight = totalWeight;

    if (pool.length === 0) {
        console.warn(`[Upgrades] No upgrades found for minRarity ${minRarity}. Falling back to all.`);
        pool = Upgrades.filter(u => !u.condition || u.condition(player));
        currentTotalWeight = 100;
        activeWeights = rarityWeights;
    }

    const selected = [];
    const maxRetries = 50;

    for (let i = 0; i < count; i++) {
        let upgradeToAdd = null;
        let attempts = 0;

        while (!upgradeToAdd && attempts < maxRetries) {
            attempts++;

            // 3. Roll Rarity
            const roll = Math.random() * currentTotalWeight;
            let chosenRarity = Object.keys(activeWeights)[0];
            let cumulative = 0;

            for (const [rarity, weight] of Object.entries(activeWeights)) {
                cumulative += weight;
                if (roll < cumulative) {
                    chosenRarity = rarity;
                    break;
                }
            }

            // 4. Find upgrades of this rarity
            const rarityPool = pool.filter(u => u.rarity === chosenRarity && !selected.includes(u));

            if (rarityPool.length > 0) {
                upgradeToAdd = rarityPool[Math.floor(Math.random() * rarityPool.length)];
            } else {
                // Fallback to any available unique upgrade
                const fallbackPool = pool.filter(u => !selected.includes(u));
                if (fallbackPool.length > 0) {
                    upgradeToAdd = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
                }
            }
        }

        if (upgradeToAdd) {
            selected.push(upgradeToAdd);
        }
    }

    return selected;
}
