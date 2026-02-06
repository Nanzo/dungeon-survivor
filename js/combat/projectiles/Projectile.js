import { Assets } from '../../core/Assets.js';

export class Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, options = {}) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.width = 20;
        this.height = 20;
        this.speed = speed;
        this.damage = damage;
        this.aoeRadius = aoeRadius;

        // Options handling
        this.image = options.image || null;
        this.maxRange = options.maxRange || 1000;
        this.piercing = options.piercing || false;
        this.knockback = options.knockback || 0;
        this.isCrit = options.isCrit || false;

        this.markedForDeletion = false;

        // Ricochet
        this.ricochetCount = 0;
        this.ricochetRange = 300;

        // Status Effects (Applied on hit)
        this.slowPercent = 0;
        this.slowDuration = 0;
        this.freezeDuration = 0;
        this.poisonDuration = 0;
        this.poisonDamage = 0;

        this.hitList = new Set(); // Track enemies hit

        // Physics
        const dx = target.x + target.width / 2 - x;
        const dy = target.y + target.height / 2 - y;
        const dist = Math.hypot(dx, dy);

        this.vx = (dx / dist) * this.speed;
        this.vy = (dy / dist) * this.speed;

        this.particles = [];
    }

    update(deltaTime) {
        this.x += this.vx;
        this.y += this.vy;

        // Check collision with enemies
        for (const enemy of this.game.enemies) {
            if (this.checkCollision(enemy)) {

                if (this.hitList.has(enemy.id)) continue;

                // Handle Hit
                this.onHit(enemy);

                // If projectile is consumed/destroyed
                if (this.markedForDeletion) return;
            }
        }

        // Max range check
        const distTraveled = Math.hypot(this.x - this.startX, this.y - this.startY);
        if (distTraveled >= this.maxRange) {
            this.onMaxRangeReached();
        }
    }

    checkCollision(enemy) {
        return (
            this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y
        );
    }

    onHit(enemy) {
        // Base Hit Logic
        if (this.piercing) {
            this.applyEffects(enemy);
            this.hitList.add(enemy.id);
        } else if (this.ricochetCount > 0) {
            this.handleRicochet(enemy);
        } else if (this.aoeRadius > 0) {
            this.explode(enemy);
        } else {
            // Single target hit
            this.applyEffects(enemy);
            this.markedForDeletion = true;
        }
    }

    onMaxRangeReached() {
        this.markedForDeletion = true;
        // If piercing and explosive, explode at end
        if (this.piercing && this.aoeRadius > 0) {
            this.explode();
        }
    }

    handleRicochet(enemy) {
        if (this.aoeRadius > 0) {
            this.explode(enemy);
            this.markedForDeletion = false; // Keep bouncing if possible? Or logic suggests AOE consumes? 
            // Original code: allowed bounce if AOE.
        } else {
            this.applyEffects(enemy);
        }

        this.hitList.add(enemy.id);
        this.ricochetCount--;

        // Find nearest other enemy
        let nearest = null;
        let minBodyDist = Infinity;

        for (const other of this.game.enemies) {
            if (other.id === enemy.id || this.hitList.has(other.id)) continue;

            const dist = Math.hypot(other.x - this.x, other.y - this.y);
            if (dist < this.ricochetRange && dist < minBodyDist) {
                minBodyDist = dist;
                nearest = other;
            }
        }

        if (nearest) {
            const dx = nearest.x + nearest.width / 2 - (this.x + this.width / 2);
            const dy = nearest.y + nearest.height / 2 - (this.y + this.height / 2);
            const dist = Math.hypot(dx, dy);

            this.vx = (dx / dist) * this.speed;
            this.vy = (dy / dist) * this.speed;
        } else {
            // Random bounce (Visual feedback)
            const randomAngle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(randomAngle) * this.speed;
            this.vy = Math.sin(randomAngle) * this.speed;
        }

        this.startX = this.x;
        this.startY = this.y;
        this.maxRange = this.ricochetRange; // Reset range to full bounce distance
    }

    applyEffects(enemy) {
        // Damage & Status
        enemy.takeDamage(this.damage, this.isCrit);
        if (this.knockback > 0) enemy.applyKnockback(this.knockback, this.x, this.y);

        if (this.freezeDuration > 0) enemy.applyFreeze(this.freezeDuration);
        if (this.slowDuration > 0) enemy.applySlow(this.slowDuration, this.slowPercent);
        if (this.poisonDuration > 0) enemy.applyPoison(this.poisonDuration, this.poisonDamage);

        console.log(`[Projectile] Hit Enemy ${enemy.id}. Types: ${this.constructor.name}`);
    }

    explode(directHitTarget = null) {
        this.markedForDeletion = true;

        if (this.game.addExplosion) {
            this.game.addExplosion(this.x + this.width / 2, this.y + this.height / 2, this.aoeRadius);
        }

        if (directHitTarget) {
            this.applyEffects(directHitTarget);
        }

        for (const enemy of this.game.enemies) {
            if (directHitTarget && enemy.id === directHitTarget.id) continue;

            const dist = Math.hypot(enemy.x + enemy.width / 2 - (this.x + this.width / 2), enemy.y + enemy.height / 2 - (this.y + this.height / 2));
            if (dist < this.aoeRadius) {
                this.applyEffects(enemy);
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        const angle = Math.atan2(this.vy, this.vx);
        ctx.rotate(angle);

        if (this.image) {
            ctx.drawImage(this.image, -16, -16, 32, 32);
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(-5, -5, 10, 10);
        }
        ctx.restore();
    }
}
