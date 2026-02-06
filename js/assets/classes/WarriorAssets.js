export class WarriorAssets {
    static generateWarrior() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cloak (Behind)
        ctx.fillStyle = '#800000';
        ctx.fillRect(20, 20, 24, 34);

        // Armor (Body)
        const gradient = ctx.createLinearGradient(0, 0, 64, 64);
        gradient.addColorStop(0, '#ccc');
        gradient.addColorStop(1, '#999');
        ctx.fillStyle = gradient;
        ctx.fillRect(20, 20, 24, 30);
        ctx.strokeStyle = '#555';
        ctx.strokeRect(20, 20, 24, 30);

        // Helmet
        ctx.fillStyle = '#777';
        ctx.fillRect(20, 8, 24, 14);
        // Helmet plume
        ctx.fillStyle = 'red';
        ctx.fillRect(28, 2, 8, 6);

        // Face area
        ctx.fillStyle = '#f5c6a5';
        ctx.fillRect(24, 14, 16, 6);
        // Eyes
        ctx.fillStyle = 'black';
        ctx.fillRect(26, 16, 2, 2);
        ctx.fillRect(36, 16, 2, 2);

        // Sword (Right Hand)
        ctx.fillStyle = '#bbb';
        ctx.fillRect(48, 10, 6, 30);
        ctx.fillStyle = '#5c3a21'; // Grip
        ctx.fillRect(46, 36, 10, 4);
        ctx.fillStyle = 'gold'; // Pommel
        ctx.fillRect(47, 40, 8, 6);

        // Shield (Left Hand)
        ctx.fillStyle = '#3a4a5c';
        ctx.beginPath();
        ctx.arc(14, 34, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d4af37'; // Gold rim
        ctx.lineWidth = 2;
        ctx.stroke();

        return canvas;
    }

    static generateSword() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Rotate for projectile visual (pointing right)
        ctx.translate(16, 16);
        ctx.rotate(Math.PI / 4); // 45 degrees
        ctx.translate(-16, -16);

        // Blade
        ctx.fillStyle = '#CFD8DC'; // Light Silver
        ctx.fillRect(14, 4, 4, 18);
        ctx.strokeStyle = '#90A4AE';
        ctx.lineWidth = 1;
        ctx.strokeRect(14, 4, 4, 18);

        // Grid/Guard
        ctx.fillStyle = '#5D4037'; // Wood/Leather
        ctx.fillRect(10, 22, 12, 3);

        // Handle
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(14, 25, 4, 6);

        // Pommel
        ctx.fillStyle = '#FFD700'; // Gold
        ctx.beginPath();
        ctx.arc(16, 32, 2, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }
}
