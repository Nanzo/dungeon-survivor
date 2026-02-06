import { Assets } from '../../core/Assets.js';
import { Entity } from './Entity.js';
import { Projectile } from '../../combat/Projectile.js';

export class Player extends Entity {
    constructor(game) {
        super(game);
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
        this.damageTextColor = 'red'; // Player takes RED damage

        // Leveling Stats
        this.level = 1;
        this.xp = 0;
        this.xp = 0;
        this.nextLevelXp = 100;
        this.upgrades = [];

        // Combat Stats (New)
        this.projectileCount = 1;
        this.critChance = 0.05; // 5% Base Crit Chance
        this.critDamage = 1.5; // 150% Base Crit Damage
        this.freezeDuration = 0; // Duration in ms

        // Sustain Stats
        this.hpRegen = 0; // HP per second
        this.lifeOnKill = 0; // HP per kill
        this.regenTimer = 0;
    }

    gainXp(amount) {
        this.xp += amount;
        if (this.xp >= this.nextLevelXp) {
            this.levelUp();
        }
    }

    heal(amount) {
        if (this.hp >= this.maxHp) return;
        const oldHp = this.hp;
        this.hp = Math.min(this.maxHp, this.hp + amount);
        const healedAmount = this.hp - oldHp;
        if (healedAmount > 0) {
            this.game.showHeal(this.x + this.width / 2, this.y, Math.ceil(healedAmount));
        }
    }

    levelUp() {
        this.xp -= this.nextLevelXp;
        this.level++;
        this.nextLevelXp = Math.ceil(this.nextLevelXp * 1.5); // Curve
        console.log(`Level Up! Now Level ${this.level}`);
        this.game.triggerLevelUp(); // Notify game loop
    }

    update(input, deltaTime) {
        super.update(deltaTime);

        // Passive Regeneration
        if (this.hpRegen > 0 && this.hp < this.maxHp) {
            this.regenTimer += deltaTime;
            if (this.regenTimer >= 1000) {
                this.heal(this.hpRegen);
                this.regenTimer = 0;
            }
        }

        let dx = 0;
        let dy = 0;

        // Horizontal movement
        if (input.isDown('ArrowRight') || input.isDown('d')) {
            dx = this.speed;
        }
        if (input.isDown('ArrowLeft') || input.isDown('a')) {
            dx = -this.speed;
        }

        // Vertical movement
        if (input.isDown('ArrowUp') || input.isDown('w')) {
            dy = -this.speed;
        }
        if (input.isDown('ArrowDown') || input.isDown('s')) {
            dy = this.speed;
        }

        // Apply movement with collision check
        this.move(dx, 0);
        this.move(0, dy);

        // Auto Attack logic moved to subclasses (Warrior/Mage)
    }

    move(dx, dy) {
        if (!this.checkCollision(this.x + dx, this.y + dy)) {
            this.x += dx;
            this.y += dy;
        }
    }

    checkCollision(x, y) {
        // We need to check the 4 corners of the player hitbox
        // to see if any of them touch a solid tile (1=Water, 2=Stone)
        const points = [
            { x: x, y: y },
            { x: x + this.width, y: y },
            { x: x, y: y + this.height },
            { x: x + this.width, y: y + this.height }
        ];

        for (let p of points) {
            if (this.game.map.isSolid(p.x, p.y)) {
                return true;
            }
        }
        return false;
    }

    // Override draw to keep Player visual logic if needed, but super.draw handles it mostly
    draw(ctx) {
        super.draw(ctx);
        // Debug hitbox?
    }

    takeDamage(amount, isCrit = false) {
        super.takeDamage(amount, isCrit);
        if (this.hp <= 0) {
            this.game.gameOver();
        }
    }

    fireProjectile(target, imageAsset, overrides = {}) {
        // 1. Calculate Damage & Crit
        const isCrit = Math.random() < this.critChance;
        let damage = this.attackPower;
        if (isCrit) damage *= this.critDamage;

        // 2. Determine Stats (Allow overrides)
        const speed = overrides.speed || this.projectileSpeed;
        const aoe = (overrides.aoe !== undefined) ? overrides.aoe : this.projectileAOE;
        const range = overrides.range || 1000;
        const knockback = (overrides.knockback !== undefined) ? overrides.knockback : this.knockback;

        // 3. Create Projectile
        const projectile = new Projectile(
            this.game,
            this.x, this.y,
            target,
            speed,
            Math.round(damage),
            aoe,
            imageAsset,
            range,
            this.piercing,
            knockback,
            isCrit
        );

        // 4. Apply Universal Stats
        projectile.freezeDuration = this.freezeDuration;

        // Ricochet
        if (this.projectileRicochet > 0) {
            projectile.ricochetCount = this.projectileRicochet;
            projectile.ricochetRange = 250;
        }

        // Apply any extra overrides (like slow for Archer)
        Object.assign(projectile, overrides);

        this.game.projectiles.push(projectile);
        return projectile;
    }
}
