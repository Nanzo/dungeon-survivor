import { Entity } from './Entity.js';

export class Enemy extends Entity {
    constructor(game) {
        super(game);
        this.x = 0;
        this.y = 0;
        this.width = 30;
        this.height = 30;
        // Stats
        this.attackPower = 5;
        this.defense = 0;
        this.speed = 2;

        // Smart Targeting: How many minions are focusing this unit?
        this.targetedBy = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);

        // Soft Collision / Repulsion (Prevent Stacking)
        // Simple O(N) check against all other enemies
        // In a real optimized game we'd use a QuadTree or Spatial Hash, but for < 100 enemies this is fine.
        if (this.game.enemies) {
            for (const other of this.game.enemies) {
                if (other === this) continue;

                const dx = this.x - other.x;
                const dy = this.y - other.y;
                const dist = Math.hypot(dx, dy);
                const minDist = 30; // Minimum separation distance

                if (dist < minDist && dist > 0) {
                    const push = (minDist - dist) / minDist; // Stronger push if closer
                    const force = 0.5 * push; // Gentle push
                    this.x += (dx / dist) * force;
                    this.y += (dy / dist) * force;
                }
            }
        }

        // Status Effects
        if (this.isFrozen) {
            this.speed = 0; // Force stop
            this.freezeTimer -= deltaTime;
            if (this.freezeTimer <= 0) {
                this.isFrozen = false;
                this.speed = this.baseSpeed || this.speed; // Try restore
            }
            return; // Don't process movement/slow if frozen
        }

        if (this.isSlowed) {
            this.slowTimer -= deltaTime;
            if (this.slowTimer <= 0) {
                this.isSlowed = false;
                this.speed = this.baseSpeed; // Restore speed
            }
        }
    }

    applyFreeze(duration) {
        if (!this.isFrozen) {
            this.baseSpeed = this.speed > 0 ? this.speed : (this.baseSpeed || 2); // Save speed if moving
        }
        this.isFrozen = true;
        this.freezeTimer = duration;
        this.speed = 0;
    }

    applySlow(duration, percent) {
        if (this.isFrozen) return; // Cannot slow if frozen (already stopped)

        if (this.isSlowed) {
            this.slowTimer = duration; // Refresh duration
            return;
        }

        this.isSlowed = true;
        this.slowTimer = duration;
        this.baseSpeed = this.speed; // Store original speed
        this.speed = this.speed * (1 - percent);
    }

    draw(ctx) {
        if (this.image) {
            const isFlipped = this.game.player.x < this.x; // Player is to the left

            ctx.save();
            const cx = this.x + this.width / 2;
            const cy = this.y + this.height / 2;

            ctx.translate(cx, cy);
            if (isFlipped) {
                ctx.scale(-1, 1);
            }

            // Draw image centered at (0,0) relative to translation
            // Entity.draw Logic: this.x - (64 - this.width) / 2
            // Relative to cx: -32 (since 64/2 = 32) assuming sprite is 64x64 roughly centered
            ctx.drawImage(this.image, -32, -32, 64, 64);

            ctx.restore();
        } else {
            // Fallback
            super.draw(ctx);
        }

        // Draw HP bar normally (not flipped)
        this.drawHealthBar(ctx);
    }
}
