import { Assets } from '../../core/Assets.js';
import { Entity } from './Entity.js';


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

        // Status Effect Stats (Universal)
        this.poisonDuration = 0;
        this.poisonDamage = 0;
        this.slowDuration = 0;
        this.slowPercent = 0;
    }

    gainXp(amount) {
        this.xp += amount;
        if (this.xp >= this.nextLevelXp) {
            this.levelUp();
        }
    }

    heal(amount, source = 'unknown') {
        if (this.hp >= this.maxHp) return;
        const oldHp = this.hp;
        this.hp = Math.min(this.maxHp, this.hp + amount);
        const healedAmount = this.hp - oldHp;
        if (healedAmount > 0) {
            this.game.showHeal(this.x + this.width / 2, this.y, Math.ceil(healedAmount));
            // Log for Simulation (via Game hook or monkey patch on Player)
            if (this.game.recordHeal) this.game.recordHeal(healedAmount, source);
        }
    }

    levelUp() {
        this.xp -= this.nextLevelXp;
        this.level++;
        this.nextLevelXp = Math.ceil(100 * this.level); // Linear: 100, 200, 300...
        console.log(`Level Up! Now Level ${this.level}`);
        this.game.triggerLevelUp(); // Notify game loop
    }

    update(input, deltaTime) {
        super.update(deltaTime);

        // Passive Regeneration
        if (this.hpRegen > 0 && this.hp < this.maxHp) {
            this.regenTimer += deltaTime;
            if (this.regenTimer >= 1000) {
                this.heal(this.hpRegen, 'passive_regen');
                this.regenTimer = 0;
            }
        }

        let dx = 0;
        let dy = 0;

        // Check Joystick First
        const joystick = input.getJoystick();
        if (joystick.x !== 0 || joystick.y !== 0) {
            dx = joystick.x * this.speed;
            dy = joystick.y * this.speed;
        } else {
            // Keyboard Fallback
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

            // Normalize diagonal speed (Only for Keyboard)
            if (dx !== 0 && dy !== 0) {
                dx *= 0.7071; // 1 / sqrt(2)
                dy *= 0.7071;
            }
        }

        // Normalize diagonal speed
        if (dx !== 0 && dy !== 0) {
            dx *= 0.7071; // 1 / sqrt(2)
            dy *= 0.7071;
        }

        // Apply movement with collision check
        this.move(dx, 0);
        this.move(0, dy);

        // Auto Attack (Default Behavior)
        // Subclasses that don't want to attack (like Summoner) should override tryAttack to do nothing.
        this.tryAttack(this.game.enemies);
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

    spawnProjectile(ProjectileClass, target, extras = {}) {
        // 1. Calculate Damage & Crit
        const isCrit = Math.random() < this.critChance;
        let damage = this.attackPower;
        if (isCrit) damage *= this.critDamage;

        // 2. Determine Stats (Allow overrides via extras)
        const speed = extras.speed || this.projectileSpeed;
        const aoe = (extras.aoe !== undefined) ? extras.aoe : this.projectileAOE;
        // Range: extras.range (e.g. Sword) -> this.attackRange -> default 1000
        const range = extras.range || this.attackRange || 1000;
        const knockback = (extras.knockback !== undefined) ? extras.knockback : this.knockback;

        // 3. Prepare Options for Constructor
        const options = {
            maxRange: range,
            piercing: this.piercing,
            knockback: knockback,
            isCrit: isCrit,
            source: this._currentAttackSource || extras.source, // Use context flag or passed extra
            ...extras // Allow passing other things if needed
        };

        // 4. Instantiate Specific Projectile
        // ProjectileClass(game, x, y, target, speed, damage, aoeRadius, options)
        const projectile = new ProjectileClass(
            this.game,
            this.x, this.y,
            target,
            speed,
            Math.round(damage),
            aoe,
            options
        );

        // 5. Apply Universal Stats (if not handled by constructor options)
        // Note: Projectile constructor now handles maxRange, piercing, knockback, isCrit.
        // We still need to set status effects which might be dynamic properties on the instance.

        projectile.freezeDuration = this.freezeDuration;
        projectile.poisonDuration = this.poisonDuration;
        projectile.poisonDamage = this.poisonDamage;
        projectile.slowDuration = this.slowDuration;
        projectile.slowPercent = this.slowPercent;

        // Ricochet
        if (this.projectileRicochet > 0) {
            projectile.ricochetCount = this.projectileRicochet;
            projectile.ricochetRange = range; // Use full range for bounces
        }

        // Apply explicit property overrides from extras
        Object.assign(projectile, extras);

        console.log(`[Player] Spawning ${ProjectileClass.name}. Dmg:${damage} Crit:${isCrit}`);

        this.game.projectiles.push(projectile);
        return projectile;
    }
}
