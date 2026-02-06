import { getRandomUpgrades } from '../core/Upgrades.js';

export class LevelUpScreen {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById('levelUpScreen');
        this.container = document.getElementById('upgradeCards');
    }

    show() {
        this.element.style.display = 'flex';
        this.container.innerHTML = ''; // Clear previous

        const upgrades = getRandomUpgrades(3, this.game.player);

        upgrades.forEach((upgrade, index) => {
            const card = document.createElement('div');

            // Rarity Colors
            let borderColor = '#fff'; // Default for common
            let titleColor = '#fff'; // Default for common
            let bgColor = '#333'; // Default for common

            if (upgrade.rarity === 'uncommon') {
                borderColor = '#0f0'; // Green
                titleColor = '#8f8';
                bgColor = '#131';
            } else if (upgrade.rarity === 'rare') {
                borderColor = 'gold'; // Gold/Purple
                titleColor = '#f0f';
                bgColor = '#202';
            }

            card.style.cssText = `
                background: ${bgColor};
                border: 2px solid ${borderColor};
                border-radius: 10px;
                padding: 20px;
                width: 200px;
                cursor: pointer;
                transition: transform 0.2s;
                text-align: center;
            `;

            card.innerHTML = `
                <h3 style="color: ${titleColor}; margin-top: 0;">${upgrade.name}</h3>
                <p style="color: #ccc; font-size: 0.9em;">${upgrade.description}</p>
                <div style="font-size: 0.8em; text-transform: uppercase; color: ${borderColor}; margin-top: 10px;">${upgrade.rarity.toUpperCase()}</div>
            `;

            card.onmouseenter = () => card.style.transform = 'scale(1.05)';
            card.onmouseleave = () => card.style.transform = 'scale(1.0)';

            card.onclick = () => {
                upgrade.apply(this.game.player);
                this.game.player.upgrades.push(upgrade);
                this.game.resumeGame();
            };

            this.container.appendChild(card);
        });
    }

    hide() {
        this.element.style.display = 'none';
    }
}
