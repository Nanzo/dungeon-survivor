import { Enemy } from '../base/Enemy.js';
import { Assets } from '../../core/Assets.js';

export class Monster extends Enemy {
    constructor(game, config, level = 1) {
        super(game);

        // Base Stats from Config
        this.name = config.name || "Monster";
        this.width = config.width || 40;
        this.height = config.height || 40;
        this.color = config.color || "red"; // Fallback

        // Boss Flag
        this.isBoss = config.isBoss || false;

        // Asset Generation
        if (config.assetKey) {
            this.image = Assets.getEnemyAsset(config.assetKey, this.isBoss);
        } else if (config.assetFn) {
            this.image = config.assetFn();
        } else {
            this.image = Assets.getEnemyAsset('rat'); // Fallback
        }

        // --- Scaling Logic ---
        // Level 1 stats are defined in 'config'
        // We scale them based on 'level'
        const hpScale = config.hpScale || 5; // HP per level
        const xpScale = config.xpScale || 2; // XP per level
        const dmgScale = config.dmgScale || 0.5; // Damage per level (slow growth)

        this.maxHp = (config.hp || 10) + ((level - 1) * hpScale);
        this.attackPower = (config.damage || 5) + ((level - 1) * dmgScale);
        this.xpValue = (config.xp || 10) + ((level - 1) * xpScale);

        // BOSS MULTIPLIERS
        if (this.isBoss) {
            this.width *= 3.0; // 3x Bigger
            this.height *= 3.0;
            this.maxHp *= 5.0;
            this.attackPower *= 2.0;
            this.xpValue *= 10.0;
            this.name = "Giant " + this.name;

            // Visual Flair (Darker, menacing)
            // We can't easily change the image pixels without canvas manipulation,
            // but we can add a filter if drawing, or just rely on size.
            // Let's add a property 'filter' that Entity.draw could use?
            // Or just modify color fallback.
            this.color = "darkred";
        }

        this.hp = this.maxHp;

        // Speed is tricky. Some monsters shouldn't get faster.
        // We allow config to define 'speedGrowth' or fixed.
        // Let's cap speed growth to avoid unplayable kiting.
        const speedGrowth = config.speedGrowth || 0;
        this.speed = (config.speed || 2) + Math.min(2, (level - 1) * speedGrowth);

        // Bosses are slightly slower to compensate for size? Or same speed.
        // Let's keep same speed for now, maybe 0.9x if too fast.

        this.baseSpeed = this.speed;

        // Spawn Logic (Off-screen circle)
        // Similar to Rat
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.max(this.game.width, this.game.height) / 2 + 100;
        const playerCenterX = this.game.player.x + this.game.player.width / 2;
        const playerCenterY = this.game.player.y + this.game.player.height / 2;

        this.x = playerCenterX + Math.cos(angle) * radius;
        this.y = playerCenterY + Math.sin(angle) * radius;
    }

    update(deltaTime) {
        super.update(deltaTime);

        // AI: Chase Nearest Hero (Player or Minion)
        const target = this.findNearestHero();
        if (target) {
            // Check Freeze (Redundant but necessary if super.update returns early)
            if (this.isFrozen) return;

            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.hypot(dx, dy);

            // Movement
            // Standard melee range is ~40-50.
            // Large monsters might need larger stop distance.
            const range = this.width;
            if (distance > range) {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            }

            // Attack
            this.tryAttack([target]);
        }
    }

    findNearestHero() {
        // Reuse logic from Rat.js (Should have been moved to Enemy.js really, but keeping safe here)
        let candidates = [this.game.player];
        if (this.game.player.minions) {
            candidates = candidates.concat(this.game.player.minions);
        }

        let nearest = null;
        let minDist = Infinity;

        for (const hero of candidates) {
            if (hero.hp <= 0 || hero.markedForDeletion) continue;

            const dist = Math.hypot(hero.x - this.x, hero.y - this.y);

            // Aggro Logic
            const aggro = hero.aggroValue || 0;
            const score = dist - aggro;

            if (score < minDist) {
                minDist = score;
                nearest = hero;
            }
        }
        return nearest;
    }

    checkCollision(player) {
        // Simple AABB
        return (
            this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y
        );
    }
}
