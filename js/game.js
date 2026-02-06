import { Input } from './core/Input.js';
import { Warrior } from './entities/classes/Warrior.js';
import { Mage } from './entities/classes/Mage.js';
import { Archer } from './entities/classes/Archer.js';
import { Assassin } from './entities/classes/Assassin.js';
import { Barbarian } from './entities/classes/Barbarian.js';
import { Gunslinger } from './entities/classes/Gunslinger.js';
import { IceMage } from './entities/classes/IceMage.js';
import { Cleric } from './entities/classes/Cleric.js';
import { Paladin } from './entities/classes/Paladin.js';
import { Bard } from './entities/classes/Bard.js';
import { Monk } from './entities/classes/Monk.js';
import { Necromancer } from './entities/classes/Necromancer.js';
import { Druid } from './entities/classes/Druid.js';
import { Warlock } from './entities/classes/Warlock.js';
import { God } from './entities/classes/God.js';
import { Map } from './world/Map.js?v=3';
import { Rat } from './entities/enemies/Rat.js';
import { Monster } from './entities/enemies/Monster.js';
import { Bestiary } from './core/Bestiary.js';
import { FloatingText } from './ui/FloatingText.js';
import { Assets } from './core/Assets.js?v=2';
import { Explosion } from './combat/Explosion.js';
import { LevelUpScreen } from './ui/LevelUpScreen.js';

window.addEventListener('load', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let game = null;

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (game) {
            game.width = canvas.width;
            game.height = canvas.height;
        }
    });

    class Game {
        constructor(width, height, classType) {
            this.width = width;
            this.height = height;
            this.input = new Input();
            this.map = new Map(this);

            if (classType === 'mage') {
                this.player = new Mage(this);
            } else if (classType === 'archer') {
                this.player = new Archer(this);
            } else if (classType === 'assassin') {
                this.player = new Assassin(this);
            } else if (classType === 'barbarian') {
                this.player = new Barbarian(this);
            } else if (classType === 'gunslinger') {
                this.player = new Gunslinger(this);
            } else if (classType === 'icemage') {
                this.player = new IceMage(this);
            } else if (classType === 'cleric') {
                this.player = new Cleric(this);
            } else if (classType === 'paladin') {
                this.player = new Paladin(this);
            } else if (classType === 'bard') {
                this.player = new Bard(this);
            } else if (classType === 'monk') {
                this.player = new Monk(this);
            } else if (classType === 'necromancer') {
                this.player = new Necromancer(this);
            } else if (classType === 'druid') {
                this.player = new Druid(this);
            } else if (classType === 'warlock') {
                this.player = new Warlock(this);
            } else if (classType === 'god') {
                this.player = new God(this);
            } else {
                this.player = new Warrior(this);
            }

            this.camera = { x: 0, y: 0 };
            this.enemies = [];
            this.projectiles = [];
            this.explosions = []; // Explosions array
            this.floatingTexts = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;

            // Leveling System
            this.isPaused = false;
            this.levelUpScreen = new LevelUpScreen(this);

            // Stats
            this.gameTime = 0;
            this.killCounts = {};

            // HUD Elements
            this.hud = {
                container: document.getElementById('gameHUD'),
                level: document.getElementById('hudLevel'),
                hp: document.getElementById('hudHp'),
                atk: document.getElementById('hudAtk'),
                def: document.getElementById('hudDef'),
                spd: document.getElementById('hudSpd'),
                atkSpd: document.getElementById('hudAtkSpd'),
                range: document.getElementById('hudRange'),
                projSpd: document.getElementById('hudProjSpd'),
                critRate: document.getElementById('hudCritRate'),
                critDmg: document.getElementById('hudCritDmg'),
                aoe: document.getElementById('hudAOE'),
                // New Stats
                multi: document.getElementById('hudMulti'),
                pierce: document.getElementById('hudPierce'),
                kb: document.getElementById('hudKB'),
                slow: document.getElementById('hudSlow'),
                freeze: document.getElementById('hudFreeze'),
                regen: document.getElementById('hudRegen'),
                lok: document.getElementById('hudLoK'),
                ricochet: document.getElementById('hudRicochet'),
                doubleStrike: document.getElementById('hudDbl'),

                xpFill: document.getElementById('xpBarFill'),
                xpText: document.getElementById('xpText')
            };

            if (this.hud.container) this.hud.container.style.display = 'block';
        }

        triggerLevelUp() {
            this.isPaused = true;
            this.levelUpScreen.show();
        }

        togglePause() {
            this.isPaused = !this.isPaused;
            const pauseMenu = document.getElementById('pauseMenu');
            if (pauseMenu) {
                pauseMenu.style.display = this.isPaused ? 'flex' : 'none';
            }

            // If we unpaused, reset lastTime to prevent jump
            if (!this.isPaused) {
                lastTime = performance.now();
                animate(lastTime);
            }
        }

        gameOver() {
            this.isGameOver = true;
            this.isPaused = true; // Ensure loop stops

            // Hide HUD
            if (this.hud && this.hud.container) {
                this.hud.container.style.display = 'none';
            }

            // Hide Pause Menu if open
            const pauseMenu = document.getElementById('pauseMenu');
            if (pauseMenu) pauseMenu.style.display = 'none';

            const goScreen = document.getElementById('gameOverScreen');
            const goClassIcon = document.getElementById('goClassIcon');
            const goClassName = document.getElementById('goClassName');
            const goLevel = document.getElementById('goLevel');
            const goTime = document.getElementById('goTime');
            const goFinalStats = document.getElementById('goFinalStats');
            const goUpgrades = document.getElementById('goUpgrades');

            if (goScreen) {
                // Class Info
                const className = this.player.constructor.name;
                if (goClassName) goClassName.innerText = className;

                if (goClassIcon) {
                    goClassIcon.innerHTML = '';
                    const classSprite = Assets.getAssetByType(className); // Uses the helper we added
                    classSprite.style.width = '100%';
                    classSprite.style.height = '100%';
                    goClassIcon.appendChild(classSprite);
                }

                // Time
                const totalSeconds = Math.floor(this.gameTime / 1000);
                const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
                const seconds = (totalSeconds % 60).toString().padStart(2, '0');
                if (goTime) goTime.innerText = `${minutes}:${seconds}`;

                // Level
                if (goLevel) goLevel.innerText = this.player.level;

                // Final Stats
                if (goFinalStats) {
                    // Update grid columns for better layout if needed, or just let it flow
                    goFinalStats.style.gridTemplateColumns = '1fr 1fr';

                    // Increased font sizes injected here
                    goFinalStats.innerHTML = `
                        <div style="grid-column: span 2; text-align: center; margin-bottom: 15px; font-size: 1.3em;">
                            <span style="color:#aaa">Level</span> <span style="color:cyan; font-weight:bold;">${this.player.level}</span>
                            <span style="color:#666; margin: 0 15px;">|</span>
                            <span style="color:#aaa">XP</span> <span style="color:#66f">${Math.floor(this.player.xp)}</span>
                        </div>

                        <!-- Common -->
                        <div style="border-right: 1px solid #444; padding-right: 15px;">
                            <div style="color: #ddd; margin-bottom: 5px;">HP: <span style="color:#f66; float:right">${Math.max(0, Math.floor(this.player.hp))}/${this.player.maxHp}</span></div>
                            <div style="color: #ddd; margin-bottom: 5px;">Damage: <span style="color:white; float:right">${this.player.attackPower}</span></div>
                            <div style="color: #ddd; margin-bottom: 5px;">Defense: <span style="color:white; float:right">${this.player.defense}</span></div>
                            <div style="color: #ddd; margin-bottom: 5px;">Move Spd: <span style="color:white; float:right">${this.player.speed.toFixed(1)}</span></div>
                        </div>

                        <!-- Uncommon -->
                        <div style="padding-left: 15px;">
                            <div style="color: #8f8; margin-bottom: 5px;">Atk Spd: <span style="float:right">${this.player.attackSpeed.toFixed(2)}s</span></div>
                            <div style="color: #8f8; margin-bottom: 5px;">Range: <span style="float:right">${this.player.attackRange}</span></div>
                            <div style="color: #8f8; margin-bottom: 5px;">Proj Spd: <span style="float:right">${this.player.projectileSpeed}</span></div>
                            <div style="color: #8f8; margin-bottom: 5px;">Crit Rate: <span style="float:right">${Math.round(this.player.critChance * 100)}%</span></div>
                            <div style="color: #8f8; margin-bottom: 5px;">Crit Dmg: <span style="float:right">${Math.round(this.player.critDamage * 100)}%</span></div>
                        </div>

                        <!-- Rare (Full Width) -->
                        <div style="grid-column: span 2; border-top: 1px solid #444; margin-top: 15px; padding-top: 15px; color: #b388ff;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>Multishot: <span style="color:gold">${this.player.projectileCount || 1}</span></span>
                                <span>Pierce: <span style="color:gold">${this.player.piercing ? 'Yes' : 'No'}</span></span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>AOE: <span style="color:gold">${this.player.projectileAOE}</span></span>
                                <span>Knockback: <span style="color:gold">${this.player.knockback || 0}</span></span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Slow: <span style="color:gold">${(this.player.constructor.name === 'Archer') ? "30%" : "No"}</span></span>
                                <span>Freeze: <span style="color:gold">${(this.player.freezeDuration > 0) ? (this.player.freezeDuration / 1000).toFixed(1) + 's' : "No"}</span></span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Ex. Strikes: <span style="color:gold">${this.player.extraStrikes ? ("+" + this.player.extraStrikes) : "0"}</span></span>
                            </div>
                        </div>
                    `;
                }

                // Upgrades (Aggregated)
                if (goUpgrades) {
                    goUpgrades.innerHTML = '';
                    if (this.player.upgrades.length === 0) {
                        goUpgrades.innerHTML = '<span style="color:#666">No upgrades...</span>';
                    } else {
                        // Aggregate upgrades count
                        const upgradeCounts = {};
                        this.player.upgrades.forEach(up => {
                            upgradeCounts[up.name] = (upgradeCounts[up.name] || 0) + 1;
                        });

                        for (const [name, count] of Object.entries(upgradeCounts)) {
                            const upCard = document.createElement('div');
                            upCard.style.cssText = 'background: #333; padding: 8px 15px; border-radius: 6px; font-size: 1.0em; border: 1px solid gold; display: flex; align-items: center; gap: 8px;';
                            // e.g. "Strength x3"
                            upCard.innerHTML = `<span style="color: gold;">★</span> ${name} <span style="color: #aaa; margin-left: 5px;">x${count}</span>`;
                            goUpgrades.appendChild(upCard);
                        }
                    }
                }

                goScreen.style.display = 'flex';
            }
        }

        resumeGame() {
            this.isPaused = false;
            this.levelUpScreen.hide();
            // Reset lastTime to avoid huge deltaTime jump on resume
            lastTime = performance.now();
            animate(lastTime);
        }

        update(deltaTime) {
            if (this.isPaused) return;
            this.gameTime += deltaTime;
            this.player.update(this.input, deltaTime);

            this.camera.x = this.player.x - this.width / 2 + this.player.width / 2;
            this.camera.y = this.player.y - this.height / 2 + this.player.height / 2;

            // Dynamic Spawn Rate based on Level
            // Dynamic Spawn Rate based on Level
            // Base: 2000ms. Reduces by 150ms per level!
            // Lvl 1: 1850ms
            // Lvl 7: 950ms (Sub 1s)
            // Lvl 10: 500ms
            const currentInterval = Math.max(200, 2000 - (this.player.level * 150));

            if (this.enemyTimer > currentInterval) {
                // Pass current player level to scale the enemy
                // Old: this.enemies.push(new Rat(this, this.player.level));

                // New: Bestiary
                const monsterConfig = Bestiary.getSpawn(this.player.level);
                this.enemies.push(new Monster(this, monsterConfig, this.player.level));

                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            // Update and check death
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion && enemy.hp <= 0) { // Only if killed, not just despawned
                    if (enemy.xpValue) this.player.gainXp(enemy.xpValue);
                    if (this.player.lifeOnKill > 0) this.player.heal(this.player.lifeOnKill);
                }
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

            this.projectiles.forEach(proj => proj.update(deltaTime));
            this.projectiles = this.projectiles.filter(proj => !proj.markedForDeletion);

            this.explosions.forEach(exp => exp.update(deltaTime));
            this.explosions = this.explosions.filter(exp => !exp.markedForDeletion);

            this.floatingTexts.forEach(text => text.update(deltaTime));
            this.floatingTexts = this.floatingTexts.filter(text => !text.markedForDeletion);

            this.updateHUD();
        }

        updateHUD() {
            if (!this.hud.container) return;

            // Stats
            this.hud.level.innerText = this.player.level;
            this.hud.hp.innerText = `${Math.ceil(Math.max(0, this.player.hp))}/${this.player.maxHp}`;
            this.hud.atk.innerText = this.player.attackPower;
            this.hud.def.innerText = this.player.defense;
            this.hud.spd.innerText = this.player.speed.toFixed(1);

            this.hud.atkSpd.innerText = this.player.attackSpeed.toFixed(2) + 's';
            this.hud.range.innerText = this.player.attackRange;
            this.hud.projSpd.innerText = this.player.projectileSpeed;
            this.hud.critRate.innerText = Math.round(this.player.critChance * 100) + '%';
            this.hud.critDmg.innerText = Math.round(this.player.critDamage * 100) + '%';

            // Rare Stats
            this.hud.aoe.innerText = this.player.projectileAOE > 0 ? this.player.projectileAOE : '0';
            this.hud.multi.innerText = this.player.projectileCount || 1;
            this.hud.pierce.innerText = this.player.piercing ? "Yes" : "No";
            this.hud.kb.innerText = this.player.knockback || 0;
            // Check if player has slow capability (Archer logic mostly, or an upgrade)
            // For now, we can check if they are Archer or have a 'slow' property if we add one later.
            // But Archer.js doesn't expose it as a property on 'this', it attaches to projectile.
            // Let's check constructor name or if we standardise it.
            // Better: Add 'slowChance' or 'slowPower' to Player base if we want it generic.
            // For now, simple check:
            this.hud.slow.innerText = (this.player.constructor.name === 'Archer') ? "30%" : "No";
            this.hud.freeze.innerText = (this.player.freezeDuration > 0) ? (this.player.freezeDuration / 1000).toFixed(1) + 's' : "No";

            // Sustain Stats
            this.hud.regen.innerText = (this.player.hpRegen > 0) ? this.player.hpRegen + "/s" : "0";
            this.hud.lok.innerText = (this.player.lifeOnKill > 0) ? this.player.lifeOnKill : "0";
            this.hud.ricochet.innerText = (this.player.projectileRicochet > 0) ? this.player.projectileRicochet : "0";
            this.hud.doubleStrike.innerText = this.player.extraStrikes > 0 ? ("+" + this.player.extraStrikes) : "0";

            // XP Bar
            const xpPercent = Math.min(100, Math.max(0, (this.player.xp / this.player.nextLevelXp) * 100));
            this.hud.xpFill.style.width = `${xpPercent}%`;
            this.hud.xpText.innerText = `${Math.floor(this.player.xp)} / ${this.player.nextLevelXp} XP`;
        }

        draw(ctx) {
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.save();
            ctx.translate(-this.camera.x, -this.camera.y);

            this.map.draw(ctx);
            // Draw order: Map -> Enemies -> Projectiles -> Explosions -> Player -> UI
            this.enemies.forEach(enemy => enemy.draw(ctx));
            this.projectiles.forEach(proj => proj.draw(ctx));
            this.explosions.forEach(exp => exp.draw(ctx));
            this.player.draw(ctx);
            this.floatingTexts.forEach(text => text.draw(ctx));

            ctx.restore();
        }

        showDamage(x, y, amount, isCrit = false, color = '#fff') {
            // Damage = Color (Default White) or Gold (Crit)
            const finalColor = isCrit ? '#FFD700' : color;
            this.floatingTexts.push(new FloatingText(amount, x, y, finalColor, isCrit));
        }

        showHeal(x, y, amount) {
            // Heal = Green
            this.floatingTexts.push(new FloatingText("+" + amount, x, y, '#44ff44', false));
        }

        addExplosion(x, y, radius) {
            this.explosions.push(new Explosion(this, x, y, radius));
        }
    }

    // UI Handling
    const warriorBtn = document.getElementById('btnWarrior');
    const mageBtn = document.getElementById('btnMage');
    const archerBtn = document.getElementById('btnArcher');
    const assassinBtn = document.getElementById('btnAssassin');
    const barbarianBtn = document.getElementById('btnBarbarian');
    const gunslingerBtn = document.getElementById('btnGunslinger');
    const iceMageBtn = document.getElementById('btnIceMage');
    const selectionScreen = document.getElementById('selectionScreen');

    // Add Assets to buttons
    if (warriorBtn) {
        const warriorIcon = Assets.generateWarrior();
        warriorBtn.prepend(warriorIcon);
        warriorIcon.style.marginRight = '15px';
        warriorIcon.style.verticalAlign = 'middle';
    }

    if (mageBtn) {
        const mageIcon = Assets.generateMage();
        mageBtn.prepend(mageIcon);
        mageIcon.style.marginRight = '15px';
        mageIcon.style.verticalAlign = 'middle';
    }

    if (archerBtn) {
        const archerIcon = Assets.generateArcher();
        archerBtn.prepend(archerIcon);
        archerIcon.style.marginRight = '15px';
        archerIcon.style.verticalAlign = 'middle';
    }

    if (assassinBtn) {
        const assassinIcon = Assets.generateAssassin();
        assassinBtn.prepend(assassinIcon);
        assassinIcon.style.marginRight = '15px';
        assassinIcon.style.verticalAlign = 'middle';
    }

    if (barbarianBtn) {
        const barbIcon = Assets.generateBarbarian();
        barbarianBtn.prepend(barbIcon);
        barbIcon.style.marginRight = '15px';
        barbIcon.style.verticalAlign = 'middle';
    }

    if (gunslingerBtn) {
        const gunIcon = Assets.generateGunslinger();
        gunslingerBtn.prepend(gunIcon);
        gunIcon.style.marginRight = '15px';
        gunIcon.style.verticalAlign = 'middle';
    }

    if (iceMageBtn) {
        const iceIcon = Assets.generateIceMage();
        iceMageBtn.prepend(iceIcon);
        iceIcon.style.marginRight = '15px';
        iceIcon.style.verticalAlign = 'middle';
    }

    const clericBtn = document.getElementById('btnCleric');
    const paladinBtn = document.getElementById('btnPaladin');

    if (clericBtn) {
        const clericIcon = Assets.generateCleric();
        clericBtn.prepend(clericIcon);
        clericIcon.style.marginRight = '15px';
        clericIcon.style.verticalAlign = 'middle';
    }

    if (paladinBtn) {
        const paladinIcon = Assets.generatePaladin();
        paladinBtn.prepend(paladinIcon);
        paladinIcon.style.marginRight = '15px';
        paladinIcon.style.verticalAlign = 'middle';
    }

    const bardBtn = document.getElementById('btnBard');
    if (bardBtn) {
        const bardIcon = Assets.generateBard();
        bardBtn.prepend(bardIcon);
        bardIcon.style.marginRight = '15px';
        bardIcon.style.verticalAlign = 'middle';
    }

    const monkBtn = document.getElementById('btnMonk');
    if (monkBtn) {
        const monkIcon = Assets.generateMonk();
        monkBtn.prepend(monkIcon);
        monkIcon.style.marginRight = '15px';
        monkIcon.style.verticalAlign = 'middle';
    }

    const necroBtn = document.getElementById('btnNecromancer');
    if (necroBtn) {
        const necroIcon = Assets.generateNecromancer();
        necroBtn.prepend(necroIcon);
        necroIcon.style.marginRight = '15px';
        necroIcon.style.verticalAlign = 'middle';
    }

    if (druidBtn) {
        const druidIcon = Assets.generateDruid();
        druidBtn.prepend(druidIcon);
        druidIcon.style.marginRight = '15px';
        druidIcon.style.verticalAlign = 'middle';
    }

    const warlockBtn = document.getElementById('btnWarlock');
    if (warlockBtn) {
        const warlockIcon = Assets.generateWarlock();
        warlockBtn.prepend(warlockIcon);
        warlockIcon.style.marginRight = '15px';
        warlockIcon.style.verticalAlign = 'middle';
    }

    const godBtn = document.getElementById('btnGod');
    // God button listener - Skip Preview, Start Immediately
    if (godBtn) godBtn.addEventListener('click', () => startGame('god'));


    function startGame(classType) {
        if (selectionScreen) {
            selectionScreen.style.display = 'none';
        }
        game = new Game(canvas.width, canvas.height, classType);
        animate(0);
    }

    // Preview Logic
    const classPreviewModal = document.getElementById('classPreviewModal');
    const cpStartBtn = document.getElementById('cpStartBtn');
    const cpBackBtn = document.getElementById('cpBackBtn');

    // Pause UI
    const btnPause = document.getElementById('btnPause');
    const pauseMenu = document.getElementById('pauseMenu');
    const btnResume = document.getElementById('btnResume');
    const btnForfeit = document.getElementById('btnForfeit');

    if (btnPause) {
        btnPause.addEventListener('click', () => {
            if (game && !game.isGameOver) game.togglePause();
        });
    }

    if (btnResume) {
        btnResume.addEventListener('click', () => {
            if (game) game.togglePause();
        });
    }

    if (btnForfeit) {
        btnForfeit.addEventListener('click', () => {
            if (game) {
                // Unpause UI but set Game Over
                if (pauseMenu) pauseMenu.style.display = 'none';
                game.gameOver();
            }
        });
    }

    // Keyboard shortcut P or ESC
    window.addEventListener('keydown', (e) => {
        if ((e.key === 'p' || e.key === 'P' || e.key === 'Escape') && game && !game.isGameOver) {
            // If LevelUp screen is open, Escape might close it? No, LevelUp is mandatory.
            // Only toggle pause if not leveling up? 
            // Logic: togglePause sets isPaused. LevelUp also sets isPaused. 
            // We need a separate state or just handle UI based on what's open.
            // For now, simple toggle.
            if (game.levelUpScreen && game.levelUpScreen.element.style.display !== 'none') return; // Don't allow double pause on level up
            game.togglePause();
        }
    });

    let selectedClassType = 'warrior';

    function showClassPreview(classType) {
        selectedClassType = classType;

        // Instantiate a dummy game and player to get stats
        const dummyGame = { width: 0, height: 0, projectiles: [], enemies: [] }; // Minimal mock
        let dummyPlayer;

        if (classType === 'mage') dummyPlayer = new Mage(dummyGame);
        else if (classType === 'archer') dummyPlayer = new Archer(dummyGame);
        else if (classType === 'assassin') dummyPlayer = new Assassin(dummyGame);
        else if (classType === 'barbarian') dummyPlayer = new Barbarian(dummyGame);
        else if (classType === 'gunslinger') dummyPlayer = new Gunslinger(dummyGame);
        else if (classType === 'icemage') dummyPlayer = new IceMage(dummyGame);
        else if (classType === 'cleric') dummyPlayer = new Cleric(dummyGame);
        else if (classType === 'paladin') dummyPlayer = new Paladin(dummyGame);
        else if (classType === 'bard') dummyPlayer = new Bard(dummyGame);
        else if (classType === 'monk') dummyPlayer = new Monk(dummyGame);
        else if (classType === 'necromancer') dummyPlayer = new Necromancer(dummyGame);
        else if (classType === 'druid') dummyPlayer = new Druid(dummyGame);
        else if (classType === 'warlock') dummyPlayer = new Warlock(dummyGame);
        else dummyPlayer = new Warrior(dummyGame);

        // Populate UI
        document.getElementById('cpIcon').innerHTML = '';
        const icon = Assets.getAssetByType(dummyPlayer.constructor.name);
        icon.style.width = '100%';
        icon.style.height = '100%';
        document.getElementById('cpIcon').appendChild(icon);

        document.getElementById('cpName').innerText = dummyPlayer.constructor.name;
        document.getElementById('cpRole').innerText = dummyPlayer.roleDescription || 'Hero';
        document.getElementById('cpDesc').innerText = dummyPlayer.description || '';

        // Base Stats
        document.getElementById('cpHp').innerText = dummyPlayer.maxHp;
        document.getElementById('cpDef').innerText = dummyPlayer.defense;
        document.getElementById('cpSpd').innerText = dummyPlayer.speed;
        document.getElementById('cpRange').innerText = dummyPlayer.attackRange;

        // Ability Stats
        document.getElementById('cpDmg').innerText = dummyPlayer.attackPower;
        document.getElementById('cpAtkSpd').innerText = dummyPlayer.attackSpeed + 's';
        document.getElementById('cpProjSpd').innerText = dummyPlayer.projectileSpeed;
        document.getElementById('cpAOE').innerText = dummyPlayer.projectileAOE > 0 ? dummyPlayer.projectileAOE : 'Single';

        // Dynamic Special Stats
        const cpSpecialStats = document.getElementById('cpSpecialStats');
        cpSpecialStats.innerHTML = ''; // Clear previous

        const specialTraits = [];

        // Crit
        if (dummyPlayer.critChance > 0.05) specialTraits.push({ name: 'Crit Chance', val: Math.round(dummyPlayer.critChance * 100) + '%', color: '#8f8' });
        if (dummyPlayer.critDamage > 1.5) specialTraits.push({ name: 'Crit Dmg', val: Math.round(dummyPlayer.critDamage * 100) + '%', color: '#8f8' });

        // Sustain
        if (dummyPlayer.hpRegen > 0) specialTraits.push({ name: 'HP Regen', val: dummyPlayer.hpRegen + '/s', color: '#8f8' });
        if (dummyPlayer.lifeOnKill > 0) specialTraits.push({ name: 'Life on Kill', val: dummyPlayer.lifeOnKill, color: '#8f8' });

        // Rare Mechanics
        if (dummyPlayer.projectileAOE > 0) specialTraits.push({ name: 'AOE', val: dummyPlayer.projectileAOE, color: '#b388ff' }); // Purple for Magic/AOE
        if (dummyPlayer.projectileCount > 1) specialTraits.push({ name: 'Multishot', val: dummyPlayer.projectileCount, color: 'gold' });
        if (dummyPlayer.piercing) specialTraits.push({ name: 'Piercing', val: 'Yes', color: 'gold' });
        if (dummyPlayer.projectileRicochet > 0) specialTraits.push({ name: 'Ricochet', val: dummyPlayer.projectileRicochet, color: '#FF1493' }); // Pink for music
        if (dummyPlayer.extraStrikes > 0) specialTraits.push({ name: 'Ex. Strikes', val: '+' + dummyPlayer.extraStrikes, color: '#FF8C00' }); // Orange for Monk
        if (dummyPlayer.knockback > 0) specialTraits.push({ name: 'Knockback', val: dummyPlayer.knockback, color: 'gold' });

        // Effects matching
        // Simple check for now based on classes as we did before, or if we standardized properties
        // Ideally we move these props to the player class itself.
        if (dummyPlayer.freezeDuration > 0) specialTraits.push({ name: 'Freeze', val: (dummyPlayer.freezeDuration / 1000).toFixed(1) + 's', color: '#00ACC1' });

        // Archer Slow (Hack for now as it's not on "this" but on projectile logic)
        if (dummyPlayer.constructor.name === 'Archer') specialTraits.push({ name: 'Slow', val: '30%', color: '#ffa' });


        if (specialTraits.length === 0) {
            cpSpecialStats.innerHTML = '<span style="color:#666; font-style:italic;">No special traits</span>';
        } else {
            specialTraits.forEach(trait => {
                const badge = document.createElement('div');
                badge.style.cssText = `background: #333; padding: 5px 10px; border-radius: 4px; font-size: 0.9em; border: 1px solid ${trait.color}; color: ${trait.color};`;
                badge.innerHTML = `${trait.name}: <span style="color:white; margin-left:5px;">${trait.val}</span>`;
                cpSpecialStats.appendChild(badge);
            });
        }

        // Show Modal
        if (classPreviewModal) {
            selectionScreen.style.display = 'none'; // Hide Selection
            classPreviewModal.style.display = 'flex'; // Show Preview
        }
    }

    if (warriorBtn) warriorBtn.addEventListener('click', () => showClassPreview('warrior'));
    if (mageBtn) mageBtn.addEventListener('click', () => showClassPreview('mage'));
    if (archerBtn) archerBtn.addEventListener('click', () => showClassPreview('archer'));
    if (assassinBtn) assassinBtn.addEventListener('click', () => showClassPreview('assassin'));
    if (barbarianBtn) barbarianBtn.addEventListener('click', () => showClassPreview('barbarian'));
    if (gunslingerBtn) gunslingerBtn.addEventListener('click', () => showClassPreview('gunslinger'));
    if (iceMageBtn) iceMageBtn.addEventListener('click', () => showClassPreview('icemage'));
    if (clericBtn) clericBtn.addEventListener('click', () => showClassPreview('cleric'));
    if (paladinBtn) paladinBtn.addEventListener('click', () => showClassPreview('paladin'));
    if (bardBtn) bardBtn.addEventListener('click', () => showClassPreview('bard'));
    if (monkBtn) monkBtn.addEventListener('click', () => showClassPreview('monk'));
    if (necroBtn) necroBtn.addEventListener('click', () => showClassPreview('necromancer'));
    if (druidBtn) druidBtn.addEventListener('click', () => showClassPreview('druid'));

    if (cpBackBtn) {
        cpBackBtn.addEventListener('click', () => {
            if (classPreviewModal) classPreviewModal.style.display = 'none';
            if (selectionScreen) selectionScreen.style.display = 'flex';
        });
    }

    if (cpStartBtn) {
        cpStartBtn.addEventListener('click', () => {
            if (classPreviewModal) classPreviewModal.style.display = 'none';
            startGame(selectedClassType);
        });
    }

    let lastTime = 0;
    function animate(timeStamp) {
        if (!game) return;
        if (game.isGameOver) return; // Stop loop if game over
        if (game.isPaused) return; // Stop loop if paused

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.update(deltaTime);
        game.draw(ctx);

        requestAnimationFrame(animate);
    }
});
