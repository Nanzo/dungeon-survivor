import { Enemy } from '../base/Enemy.js';
import { Assets } from '../../core/Assets.js';

export class Rat extends Enemy {
    constructor(game, level = 1) {
        super(game);
        this.width = 40;
        this.height = 25;
        this.speed = 2; // Base speed

        // Scaling Factors
        // HP: Starts at 10, increases by 5 per level.
        // At lvl 10: 60 HP. At lvl 20: 110 HP.
        this.maxHp = 10 + (level * 5);
        this.hp = this.maxHp;

        // XP: Starts at 10, increases by 2 per level
        this.xpValue = 10 + (level * 2);

        // Optional: Slight speed increase every 10 levels?
        this.speed = 2 + Math.floor(level / 10);

        this.image = Assets.generateRat();

        // Spawn logic: Random position around the player ("off-screen" but close enough)
        const angle = Math.random() * Math.PI * 2;
        // Spawn radius: enough to be outside most of the screen but not too far
        const radius = Math.max(this.game.width, this.game.height) / 2 + 100;

        // Spawn relative to player's center
        const playerCenterX = this.game.player.x + this.game.player.width / 2;
        const playerCenterY = this.game.player.y + this.game.player.height / 2;

        this.x = playerCenterX + Math.cos(angle) * radius;
        this.y = playerCenterY + Math.sin(angle) * radius;
    }

    update(deltaTime) {
        super.update(deltaTime);

        // Simple Chase AI
        // AI: Chase Nearest Hero (Player or Minion)
        const target = this.findNearestHero();
        if (target) {
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.hypot(dx, dy);

            // Movement: Stop if close enough to attack
            if (distance > 40) { // Slightly closer than before (was 60)
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            }

            // Auto Attack Target
            // Ensure tryAttack supports generic entity, not just player array
            // Entity.js tryAttack accepts 'targets' array.
            this.tryAttack([target]);
        }
    }

    findNearestHero() {
        // Candidates: Player + Minions
        let candidates = [this.game.player];
        if (this.game.player.minions) {
            candidates = candidates.concat(this.game.player.minions);
        }

        let nearest = null;
        let minDist = Infinity;

        for (const hero of candidates) {
            if (hero.hp <= 0 || hero.markedForDeletion) continue;

            const dist = Math.hypot(hero.x - this.x, hero.y - this.y);

            // Aggro Logic: Subtract Aggro Value from Distance
            // High Aggro makes unit appear "closer" to the AI
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
        return (
            this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y
        );
    }
}
