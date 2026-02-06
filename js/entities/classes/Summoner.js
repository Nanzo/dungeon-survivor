import { Player } from '../base/Player.js';

export class Summoner extends Player {
    constructor(game) {
        super(game);
        this.minions = [];
        this.baseMinionCount = 1; // Default
        this.respawnTimer = 0;
        this.respawnInterval = 2; // Seconds per spawn check
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);

        // Minion Logic
        // 1. Clean up dead minions
        this.minions = this.minions.filter(m => !m.markedForDeletion);

        // 2. Calculate Max Minions (Multishot = Count)
        const maxMinions = this.baseMinionCount + (this.projectileCount || 1) - 1; // Count starts at 1, so if count is 1, we get base. If count is 2 (upgrade), we adds 1.
        // Wait, projectileCount defaults to 1.
        // If Base is 2 (Necro) and projectileCount is 1: Total = 2 + 0 = 2.
        // If projectileCount upgrades to 2: Total = 2 + 1 = 3.
        // Formula: base + (projectileCount - 1).

        // 3. Spawn if needed
        if (this.minions.length < maxMinions) {
            this.respawnTimer += deltaTime;
            // Attack Speed boosts Respawn Rate?
            // Base 2s. High Attack Speed (0.5s) -> Faster respawn.
            // Interval = 2 * this.attackSpeed. (If atkSpd is 1.0 -> 2s. If 0.5 -> 1s).
            const interval = 2 * this.attackSpeed;

            if (this.respawnTimer >= interval) {
                this.spawnMinion();
                this.respawnTimer = 0;
            }
        }

        // 4. Update Minions
        this.minions.forEach(m => {
            m.syncStats(); // Keep them buffed
            m.update(deltaTime); // deltaTime is already in MS from game.js
        });
        // Entity.js: this.attackTimer += deltaTime / 1000;
        // So deltaTime is MS.
        // My Minion.js `update` calls `super.update(deltaTime)`. Correct.
        // Here `m.update(deltaTime)`.
    }

    draw(ctx) {
        super.draw(ctx);
        // Minions draw themselves in game.js loop if added to game.entities?
        // game.js draws players and enemies. It does NOT draw "minions" array unless we add them to a list.
        // For simplicity, let's draw them here or add them to game.floatingTexts? No.
        // Best approach: Add this.minions to game.js rendering or draw them here.
        // Drawing here works but z-indexing might be weird.
        // Let's draw them here for now, behind player?
        this.minions.forEach(m => m.draw(ctx));
    }

    spawnMinion() {
        // Obsolete - Override in Child
    }

    // Override tryAttack to NOT fire projectiles (Summoners command, not shoot)
    tryAttack(targets) {
        // Maybe "Command" attack? 
        // For now, doing nothing creates a "Pacifist" run feel where you just walk.
        // It's part of the archetype.
    }
}
