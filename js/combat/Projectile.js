import { Assets } from '../core/Assets.js';

export class Projectile {
    constructor(game, x, y, target, speed, damage, aoeRadius, image, maxRange = 1000, piercing = false, knockback = 0, isCrit = false) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.startX = x; // Track start pos
        this.startY = y;
        this.width = 20;
        this.height = 20;
        this.speed = speed;
        this.damage = damage;
        this.aoeRadius = aoeRadius;
        this.markedForDeletion = false;

        this.piercing = piercing;
        this.knockback = knockback; // New prop
        this.ricochetCount = 0; // New prop
        this.ricochetRange = 300; // Radius to look for next target
        this.slowPercent = 0; // New prop
        this.slowDuration = 0; // New prop
        this.freezeDuration = 0; // New prop
        this.poisonDuration = 0; // New prop
        this.poisonDamage = 0; // New prop
        this.isCrit = isCrit;
        this.maxRange = maxRange;
        this.hitList = new Set(); // Track enemies hit by this piercing/ricocheting projectile

        // Target calculation
        const dx = target.x + target.width / 2 - x;
        const dy = target.y + target.height / 2 - y;
        const dist = Math.hypot(dx, dy);

        this.vx = (dx / dist) * this.speed;
        this.vy = (dy / dist) * this.speed;

        this.image = image || Assets.generateFireball();

        // Trail effect
        this.particles = [];
    }

    update(deltaTime) {
        this.x += this.vx;
        this.y += this.vy;

        // Check collision with enemies
        for (const enemy of this.game.enemies) {
            if (this.checkCollision(enemy)) {

                // Avoid hitting same enemy twice (Piercing OR Ricochet-already-hit)
                if (this.hitList.has(enemy.id)) continue;

                // Avoid hitting same enemy twice if piercing
                // (Old check was: if (this.piercing && this.hitList.has(enemy.id)) continue;)

                // Hit logic
                // Hit logic
                if (this.piercing) {
                    this.applyHitEffects(enemy);
                    this.hitList.add(enemy.id); // Mark as hit

                    // User Request: If piercing, DO NOT explode on contact. 
                    // Explosion only happens at max range (handled in update maxRange check).

                    // Also check for Ricochet? 
                    // "Pierce triggers everything... ricochet". 
                    // If we want Pierce + Ricochet, we'd need to spawn a COPY that ricochets.
                    // For now, adhering to standard logic where Pierce overrides Ricochet movement to avoid physics conflicts.

                    // Continue flying...
                } else if (this.ricochetCount > 0 && !this.hitList.has(enemy.id)) {
                    // RICOCHET LOGIC

                    // IF AOE exists, explode on contact (Bouncing Bombs!)
                    if (this.aoeRadius > 0) {
                        this.explode(enemy); // Explode on this target
                        // Reset deletion flag because we want to bounce!
                        this.markedForDeletion = false;
                    } else {
                        // Standard Hit
                        this.applyHitEffects(enemy);
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
                        // Bounce to nearest
                        const dx = nearest.x + nearest.width / 2 - (this.x + this.width / 2);
                        const dy = nearest.y + nearest.height / 2 - (this.y + this.height / 2);
                        const dist = Math.hypot(dx, dy);

                        this.vx = (dx / dist) * this.speed;
                        this.vy = (dy / dist) * this.speed;
                        // Keep flying
                        this.vx = (dx / dist) * this.speed;
                        this.vy = (dy / dist) * this.speed;
                        // Keep flying
                    } else {
                        // No targets to bounce to -> Bounce Randomly!
                        // This serves as visual feedback that Ricochet is active/working
                        const randomAngle = Math.random() * Math.PI * 2;
                        this.vx = Math.cos(randomAngle) * this.speed;
                        this.vy = Math.sin(randomAngle) * this.speed;
                    }

                    // Reset Range for the bounce!
                    // User requested ricochet only travels half range (or ricochetRange)
                    this.startX = this.x;
                    this.startY = this.y;
                    this.maxRange = this.ricochetRange;

                    return;

                } else if (this.aoeRadius === 0) {
                    // Single Target, Non-Piercing
                    this.applyHitEffects(enemy);
                    this.markedForDeletion = true;
                    return;
                } else {
                    // AOE, Non-Piercing (Explode on impact)
                    this.explode(enemy); // Pass enemy as direct hit
                    return;
                }
            }
        }

        // Max range check
        const distTraveled = Math.hypot(this.x - this.startX, this.y - this.startY);
        if (distTraveled >= this.maxRange) {
            this.markedForDeletion = true;
            // If piercing (Barbarian) AND has AOE upgrade, explode at max range
            if (this.piercing && this.aoeRadius > 0) {
                this.explode();
            }
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

    applyHitEffects(enemy) {
        console.log(`[Projectile] Hit Enemy ${enemy.id}. Effects: Poison=${this.poisonDuration > 0}, Freeze=${this.freezeDuration > 0}`);
        enemy.takeDamage(this.damage, this.isCrit);
        if (this.knockback > 0) enemy.applyKnockback(this.knockback, this.x, this.y); // Source is projectile pos
        if (this.freezeDuration > 0) enemy.applyFreeze(this.freezeDuration);
        if (this.slowPercent > 0) enemy.applySlow(this.slowDuration, this.slowPercent);
        if (this.poisonDuration > 0) enemy.applyPoison(this.poisonDuration, this.poisonDamage);
    }

    explode(directHitTarget = null) {
        this.markedForDeletion = true;

        // VISUAL Explosion
        if (this.game.addExplosion) {
            this.game.addExplosion(this.x + this.width / 2, this.y + this.height / 2, this.aoeRadius);
        }

        // Damage Direct Hit First (Guaranteed)
        if (directHitTarget) {
            this.applyHitEffects(directHitTarget);
        }

        // AOE Damage
        for (const enemy of this.game.enemies) {
            if (directHitTarget && enemy.id === directHitTarget.id) continue; // Don't damage twice

            // Center to Center distance
            const dist = Math.hypot(enemy.x + enemy.width / 2 - (this.x + this.width / 2), enemy.y + enemy.height / 2 - (this.y + this.height / 2));

            if (dist < this.aoeRadius) {
                // For AOE splash, generally we just apply effects.
                // Knockback source should arguably be explosion center (this.x + w/2...) which is handled in applyHitEffects using this.x/y
                this.applyHitEffects(enemy);
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        // Rotate projectile to face direction
        const angle = Math.atan2(this.vy, this.vx);
        ctx.rotate(angle);

        if (this.image) {
            ctx.drawImage(this.image, -16, -16, 32, 32);
        } else {
            ctx.fillStyle = 'orange';
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}
