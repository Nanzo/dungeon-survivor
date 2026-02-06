export class Entity {
    constructor(game) {
        this.game = game;
        this.id = Math.random().toString(36).substr(2, 9); // Unique ID for collision tracking
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;

        // Stats
        this.hp = 100;
        this.maxHp = 100;
        this.attackPower = 10;
        this.defense = 0;
        this.speed = 0;
        this.attackSpeed = 1.0; // Seconds per attack
        this.attackTimer = 0;
        this.attackRange = 80;

        this.markedForDeletion = false;
        this.image = null;
    }

    update(deltaTime) {
        if (this.attackTimer < this.attackSpeed) {
            this.attackTimer += deltaTime / 1000;
        }
    }

    draw(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.x - (64 - this.width) / 2, this.y - (64 - this.height) / 2, 64, 64);
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // Draw Health Bar
        this.drawHealthBar(ctx);
    }

    drawHealthBar(ctx) {
        const barWidth = 40;
        const barHeight = 5;
        const x = this.x + (this.width - barWidth) / 2;
        const y = this.y - 10;

        // Background
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(x, y, barWidth, barHeight);

        // Health
        const hpPercent = Math.max(0, this.hp / this.maxHp);
        ctx.fillStyle = hpPercent > 0.5 ? 'lime' : hpPercent > 0.2 ? 'yellow' : 'red';
        ctx.fillRect(x, y, barWidth * hpPercent, barHeight);
    }

    tryAttack(targets) {
        if (this.attackTimer >= this.attackSpeed) {

            // 1. Find all targets in range
            const targetsInRange = targets.filter(t => {
                const dist = Math.hypot(t.x - this.x, t.y - this.y);
                return dist < this.attackRange;
            });

            if (targetsInRange.length > 0) {
                // 2. Sort by distance (closest first)
                targetsInRange.sort((a, b) => {
                    const distA = Math.hypot(a.x - this.x, a.y - this.y);
                    const distB = Math.hypot(b.x - this.x, b.y - this.y);
                    return distA - distB;
                });

                // 3. Fire Projectiles
                const count = this.projectileCount || 1;

                const fireVolley = () => {
                    // New "Multishot" Logic:
                    // Fire at 'count' unique targets (closest first).
                    // If we have fewer targets than projectiles, we simply fire fewer projectiles.
                    // This prevents "shotgunning" single targets with Multishot (User request).

                    const targetsToHit = targetsInRange.slice(0, count);

                    targetsToHit.forEach(target => {
                        this.performAttack(target);
                    });
                };

                // Immediate Volley
                fireVolley();

                // Extra Strikes Logic (Stackable!)
                // If player has extraStrikes (Monk starts with 1, Upgrades add more)
                if (this.extraStrikes > 0) {
                    for (let i = 1; i <= this.extraStrikes; i++) {
                        setTimeout(() => {
                            if (!this.game.isPaused && !this.game.isGameOver) {
                                fireVolley();
                            }
                        }, 100 * i); // 100ms delay between each extra strike (Rapid fire combo!)
                    }
                }

                this.attackTimer = 0;
            }
        }
    }

    performAttack(target) {
        // Damage Formula
        const damage = Math.max(1, this.attackPower - target.defense);
        target.takeDamage(damage);
    }

    takeDamage(amount, isCrit = false) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.markedForDeletion = true; // For enemies
        }
        this.game.showDamage(this.x + this.width / 2, this.y, Math.round(amount), isCrit);
    }

    applyKnockback(force, sourceX, sourceY) {
        if (force <= 0) return;
        const dx = (this.x + this.width / 2) - sourceX; // Center to source
        const dy = (this.y + this.height / 2) - sourceY;
        const dist = Math.hypot(dx, dy) || 1; // Avoid divide by zero

        // Normalize and apply force
        const knockbackX = (dx / dist) * force;
        const knockbackY = (dy / dist) * force;

        this.x += knockbackX;
        this.y += knockbackY;
    }
}
