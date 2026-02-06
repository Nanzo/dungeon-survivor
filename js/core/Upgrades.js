export const Upgrades = [
    {
        id: 'strength',
        name: 'Strength',
        description: 'Increase Damage by 20%',
        rarity: 'common',
        apply: (player) => {
            player.attackPower = Math.ceil(player.attackPower * 1.2);
            console.log(`Strength Upgraded! New Damage: ${player.attackPower}`);
        }
    },
    {
        id: 'haste',
        name: 'Haste',
        description: 'Increase Attack Speed by 15%',
        rarity: 'uncommon', // Changed to uncommon
        apply: (player) => {
            player.attackSpeed = Math.max(0.1, player.attackSpeed * 0.85); // Lower is faster
            console.log(`Haste Upgraded! New Speed: ${player.attackSpeed.toFixed(2)}s`);
        }
    },
    {
        id: 'vitality',
        name: 'Vitality',
        description: 'Increase Max HP by 20% & Heal',
        rarity: 'common',
        apply: (player) => {
            const oldMax = player.maxHp;
            player.maxHp = Math.ceil(player.maxHp * 1.2);
            player.hp += (player.maxHp - oldMax) + 20; // Increase max + heal a bit
            if (player.hp > player.maxHp) player.hp = player.maxHp;
            console.log(`Vitality Upgraded! New MaxHP: ${player.maxHp}`);
        }

    },
    {
        id: 'iron_skin',
        name: 'Iron Skin',
        description: 'Increase Defense by 3',
        rarity: 'common',
        apply: (player) => {
            player.defense += 3;
            console.log(`Iron Skin Upgraded! New Defense: ${player.defense}`);
        }
    },
    {
        id: 'swiftness',
        name: 'Swiftness',
        description: 'Increase Move Speed by 10%',
        rarity: 'uncommon', // Changed to uncommon
        apply: (player) => {
            player.speed *= 1.1;
            console.log(`Swiftness Upgraded! New Speed: ${player.speed.toFixed(2)}`);
        }
    },
    {
        id: 'scope',
        name: 'Scope',
        description: 'Increase Attack Range by 50',
        rarity: 'uncommon', // Changed to uncommon
        apply: (player) => {
            player.attackRange += 50;
            console.log(`Scope Upgraded! New Range: ${player.attackRange}`);
        }
    },
    {
        id: 'explosive',
        name: 'Explosive Rounds',
        description: 'Increase Blast Radius by 25',
        rarity: 'rare',
        apply: (player) => {
            player.projectileAOE += 25;
            console.log(`Explosive Upgraded! New AOE: ${player.projectileAOE}`);
        }
    },
    {
        id: 'velocity',
        name: 'High Velocity',
        description: 'Increase Projectile Speed by 2',
        rarity: 'uncommon', // Projectile Speed is uncommon
        apply: (player) => {
            player.projectileSpeed += 2;
            console.log(`Velocity Upgraded! New ProjSpeed: ${player.projectileSpeed}`);
        }
    },
    {
        id: 'multishot',
        name: 'Multishot',
        description: '+1 Projectile (Extra shots hit random nearby enemies)',
        rarity: 'rare', // Rare upgrade!
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
        apply: (player) => {
            player.knockback = (player.knockback || 0) + 25;
            console.log(`Knockback Upgraded! New Knockback: ${player.knockback}`);
        }
    },
    {
        id: 'deep_freeze',
        name: 'Deep Freeze',
        description: '+0.5s Freeze Duration',
        rarity: 'rare',
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
        apply: (player) => {
            player.critDamage = (player.critDamage || 1.5) + 0.25;
            console.log(`Crit Damage Upgraded! New Damage: ${player.critDamage}`);
        }
    },
    {
        id: 'blessed_aura',
        name: 'Blessed Aura',
        description: '+2 HP Regen / Sec',
        rarity: 'rare',
        apply: (player) => {
            player.hpRegen = (player.hpRegen || 0) + 2;
            console.log(`HpRegen Upgraded! New Regen: ${player.hpRegen}/s`);
        }
    },
    {
        id: 'divine_favor',
        name: 'Divine Favor',
        description: '+3 HP on Kill',
        rarity: 'rare',
        apply: (player) => {
            player.lifeOnKill = (player.lifeOnKill || 0) + 3;
            console.log(`LifeOnKill Upgraded! New Lifesteal: ${player.lifeOnKill}`);
        }
    },
    {
        id: 'acoustics',
        name: 'Acoustics',
        description: '+1 Ricochet / Bounce',
        rarity: 'rare',
        apply: (player) => {
            player.projectileRicochet = (player.projectileRicochet || 0) + 1;
            console.log(`Ricochet Upgraded! New Count: ${player.projectileRicochet}`);
        }
    },
    {
        id: 'combo_strike',
        name: 'Combo Strike', // Renamed from Double Strike
        description: '+1 Extra Hit per Attack (Stackable!)',
        rarity: 'rare',
        apply: (player) => {
            player.extraStrikes = (player.extraStrikes || 0) + 1;
            console.log(`Combo Strike Upgraded! Total Extra Strikes: ${player.extraStrikes}`);
        }
    },
    {
        id: 'piercing_rounds',
        name: 'Piercing Rounds',
        description: 'Projectiles pass through enemies',
        rarity: 'rare',
        condition: (player) => !player.piercing, // Only if not already owned
        apply: (player) => {
            player.piercing = true;
            console.log(`Piercing Upgraded!`);
        }
    }
];

export function getRandomUpgrades(count, player) {
    // Filter upgrades based on condition (if exists)
    const available = Upgrades.filter(u => {
        if (u.condition && player) {
            return u.condition(player);
        }
        return true;
    });

    const shuffled = [...available].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
