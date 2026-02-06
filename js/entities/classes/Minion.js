import { Entity } from '../base/Entity.js';

export class Minion extends Entity {
    constructor(game, owner, x, y, image) {
        super(game);
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.image = image;

        // Base Multipliers (Override in subclasses)
        this.hpMult = 1.0;
        this.dmgMult = 1.0;
        this.spdMult = 1.0;
        this.atkSpdMult = 1.0;

        // State
        this.state = 'follow'; // follow, chase, attack, return
        this.target = null;
        this.leashRadius = 400; // Max distance from player before returning
        this.aggroRange = 250; // Distance to spot enemies (boosted by Proj Speed)
        this.attackRange = 40; // Melee
        this.returnThreshold = 100; // Distance to stop following

        // Movement smoothing
        this.vx = 0;
        this.vy = 0;
    }

    syncStats() {
        // Map Player Stats to Minion Stats
        this.maxHp = Math.ceil(this.owner.maxHp * this.hpMult);
        if (this.hp > this.maxHp) this.hp = this.maxHp; // Cap hp but don't heal fully instantly? 
        // Actually, if maxHp goes up, current HP should play catch up or stay proportional?
        // Let's just keep it simple. If checking logic handles death, we are good.

        this.attackPower = Math.ceil(this.owner.attackPower * this.dmgMult);

        // Projectile Speed boosts Lunge/Move Speed! (User Request)
        // Base player speed ~3-5. Proj speed ~10-15.
        // Let's say +0.2 Move Speed per Proj Speed.
        const projSpeedBonus = (this.owner.projectileSpeed || 10) * 0.2;
        this.speed = (this.owner.speed * this.spdMult) + projSpeedBonus;

        this.attackSpeed = Math.max(0.2, this.owner.attackSpeed * this.atkSpdMult);

        // Defense
        this.defense = this.owner.defense;

        // On-Hit Effects inherited
        this.critChance = this.owner.critChance;
        this.critDamage = this.owner.critDamage;
        this.knockback = this.owner.knockback;
        this.freezeDuration = this.owner.freezeDuration;
        this.projectileAOE = this.owner.projectileAOE; // Explosive hits
        this.projectileRicochet = this.owner.projectileRicochet; // Cleave count
        this.piercing = this.owner.piercing; // Armor Pen (Logic handled in performAttack)
        this.extraStrikes = this.owner.extraStrikes || 0; // Inherit Combo Strike
        this.extraStrikes = this.owner.extraStrikes || 0; // Inherit Combo Strike
        this.lifeOnKill = this.owner.lifeOnKill;

        // Aggro / Taunt Power
        // Higher value = Enemies target this unit from further away (Virtual distance reduction)
        this.aggroValue = 0;
        if (this.hpMult > 2) this.aggroValue = 200; // Tanky minions (Bear) Taunt effectively (200px bias)
        else this.aggroValue = 50; // Squishy minions (Skeletons) have minor taunt (50px bias)
    }

    update(deltaTime) {
        if (this.hp <= 0) {
            this.markedForDeletion = true;
            return;
        }

        // 1. Sync stats periodically? Or assume synced by Summoner?
        // Let's assume Summoner calls sync, or we do it here cheaply.
        // Doing it every frame is overkill. Let's do it on spawn. 
        // Actually, Player stats change on Level Up. Summoner should loop existing minions and sync.

        super.update(deltaTime); // Update attack timer

        // AI Logic
        const distToPlayer = Math.hypot(this.owner.x - this.x, this.owner.y - this.y);

        // FORCE RETURN if too far
        if (distToPlayer > this.leashRadius * 1.5) {
            this.state = 'return';
        }

        if (this.state === 'return') {
            this.moveTowards(this.owner.x, this.owner.y);
            if (distToPlayer < this.returnThreshold) {
                this.state = 'follow';
            }
            return;
        }

        // FIND TARGET
        if (!this.target || this.target.markedForDeletion || this.target.hp <= 0) {
            this.target = this.findNearestEnemy();
            if (!this.target) {
                this.state = 'follow';
            } else {
                this.state = 'chase';
            }
        }

        // DO STATE
        if (this.state === 'follow') {
            // Idle wander near player
            if (distToPlayer > this.returnThreshold) {
                this.moveTowards(this.owner.x, this.owner.y);
            }
            // Check for enemies
            this.target = this.findNearestEnemy();
            if (this.target) this.state = 'chase';

        } else if (this.state === 'chase') {
            if (this.target) {
                const distToTarget = Math.hypot(this.target.x - this.x, this.target.y - this.y);
                if (distToTarget <= this.attackRange) {
                    this.state = 'attack';
                } else {
                    this.moveTowards(this.target.x, this.target.y);
                }
            } else {
                this.state = 'follow';
            }

        } else if (this.state === 'attack') {
            if (this.target && !this.target.markedForDeletion) {
                const distToTarget = Math.hypot(this.target.x - this.x, this.target.y - this.y);
                if (distToTarget > this.attackRange + 10) {
                    this.state = 'chase';
                } else {
                    // Try to attack
                    if (this.attackTimer >= this.attackSpeed) {
                        // performAttack(this.target);
                        this.launchAttackSequence(this.target);
                        this.attackTimer = 0;
                    }
                }
            } else {
                this.state = 'follow';
            }
        }
    }

    launchAttackSequence(target) {
        // Initial Hit
        this.performAttack(target);

        // Extra Strikes
        if (this.extraStrikes > 0) {
            for (let i = 1; i <= this.extraStrikes; i++) {
                setTimeout(() => {
                    // Check if we exist and target exists
                    if (this.hp > 0 && !this.game.isPaused && !this.game.isGameOver) {
                        // Re-validate target? 
                        // If target dead, we could find new one, but for simplicity let's stick to target or fail gracefully
                        if (target.hp > 0) {
                            this.performAttack(target);
                        } else {
                            // Optional: find new target nearby for 'Fist of Fury' style?
                            // For minions, let's keep it simple.
                        }
                    }
                }, 100 * i);
            }
        }
    }

    moveTowards(tx, ty) {
        let dx = tx - this.x;
        let dy = ty - this.y;
        const dist = Math.hypot(dx, dy);

        // Normalize desired direction
        if (dist > 0) {
            dx /= dist;
            dy /= dist;
        }

        // SEPARATION FORCE
        // Push away from other minions to avoid stacking
        const separationRadius = 25; // Minimum space between minions
        let sepX = 0;
        let sepY = 0;
        let count = 0;

        if (this.owner && this.owner.minions) {
            for (const other of this.owner.minions) {
                if (other === this) continue;
                const d = Math.hypot(this.x - other.x, this.y - other.y);
                if (d < separationRadius && d > 0) {
                    const pushStrength = (separationRadius - d) / separationRadius; // Stronger when closer
                    sepX += (this.x - other.x) / d * pushStrength;
                    sepY += (this.y - other.y) / d * pushStrength;
                    count++;
                }
            }
        }

        // Combine Forces
        // Target Weight: 1.0, Separation Weight: 1.5 (Prioritize not stacking)
        let moveX = dx + (sepX * 1.5);
        let moveY = dy + (sepY * 1.5);

        // Normalize validation
        const moveLen = Math.hypot(moveX, moveY);
        if (moveLen > 0) {
            moveX /= moveLen;
            moveY /= moveLen;
        }

        // Apply
        if (dist > 1) { // Only move if needed
            this.x += moveX * this.speed;
            this.y += moveY * this.speed;
        }
    }

    findNearestEnemy() {
        let nearest = null;
        let minDist = this.aggroRange + ((this.owner.projectileSpeed || 10) * 10);

        let bestScore = Infinity;

        for (const enemy of this.game.enemies) {
            const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);

            // Only consider if within range
            if (dist < minDist) {
                // Scoring: 
                // 1. Distance (Base)
                // 2. Random Noise (Tie-breaker)
                // 3. Busy Penalty (Huge penalty if already targeted, unless Boss)

                let busyPenalty = 0;
                // Exception: If enemy is huge/tanky (Boss-like), multiple minions can attack?
                // For now, user requested strict 1:1 logic.
                // We add HUGE penalty if targetedBy > 0.
                if (enemy.targetedBy > 0) busyPenalty = 5000 * enemy.targetedBy;

                const score = dist + busyPenalty + (Math.random() * 50); // Add noise to prevent synchronized switching

                if (score < bestScore) {
                    bestScore = score;
                    nearest = enemy;
                }
            }
        }
        return nearest;
    }

    releaseTarget() {
        if (this.target && this.target.targetedBy > 0) {
            this.target.targetedBy--;
        }
        this.target = null;
    }

    performAttack(target) {
        // Melee Hit (Primary)
        this.applyAttackToTarget(target, 1.0, true);

        // EXPLOSIONS (AOE)
        if (this.projectileAOE > 0) {
            if (this.game.addExplosion) this.game.addExplosion(target.x + target.width / 2, target.y + target.height / 2, this.projectileAOE);
            this.dealAreaDamage(target.x, target.y, this.projectileAOE, 0.5); // 50% splash damage
        }

        // CLEAVE (Ricochet)
        // If Ricochet > 0, hit N other enemies nearby
        if (this.projectileRicochet > 0) {
            let cleaveCount = 0;
            for (const enemy of this.game.enemies) {
                if (enemy === target) continue;
                if (cleaveCount >= this.projectileRicochet) break;

                const dist = Math.hypot(enemy.x - target.x, enemy.y - target.y);
                if (dist < 100) { // Cleave radius
                    this.applyAttackToTarget(enemy, 1.0, false); // Full damage cleave? Or partial? Assuming full based on "Ricochet" usually implies full hit or slightly reduced on bounce. Let's keep 1.0 for now as previously it was full dmg.
                    cleaveCount++;
                }
            }
        }

        // Life On Kill (Heal Minion)
        // Note: This logic is slightly flawed because if AOE kills, we might miss it here?
        // But checking target.hp <= 0 handles primary target kill.
        if (target.hp <= 0 && this.lifeOnKill > 0) {
            this.heal(this.lifeOnKill);
        }
    }

    applyAttackToTarget(target, damageMult = 1.0, isPrimary = false) {
        // Critical Hit Check
        const isCrit = Math.random() < this.critChance;
        let dmg = this.attackPower * damageMult;
        if (isCrit) dmg *= this.critDamage;

        // Damage Calculation
        let damageToDeal = dmg;
        if (!this.piercing) {
            // Subtract defense if not piercing
            damageToDeal = Math.max(1, dmg - target.defense);
        }

        // Deal Damage
        target.takeDamage(damageToDeal, isCrit);

        // Apply Status Effects (Proc Everything!)
        if (this.knockback > 0) target.applyKnockback(this.knockback, this.x, this.y);
        if (this.freezeDuration > 0) target.applyFreeze(this.freezeDuration);
        // Add Slow if minions eventually get it (Projectile has it, Minion might inherit)
        if (this.slowPercent > 0) target.applySlow(this.slowDuration || 2000, this.slowPercent || 0.3);
    }

    dealAreaDamage(x, y, radius, damageMult) {
        for (const enemy of this.game.enemies) {
            const dist = Math.hypot(enemy.x - x, enemy.y - y);
            if (dist < radius) {
                // Apply everything!
                this.applyAttackToTarget(enemy, damageMult, false);
            }
        }
    }

    heal(amount) {
        if (this.hp >= this.maxHp) return;
        this.hp = Math.min(this.maxHp, this.hp + amount);
        this.game.showHeal(this.x, this.y - 20, Math.ceil(amount));
    }
}
