export class GunslingerAssets {
    static generateGunslinger() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Duster Coat (Dark Blue/Grey)
        ctx.fillStyle = '#263238';
        ctx.fillRect(20, 20, 24, 32);
        // Coat tails
        ctx.fillRect(18, 50, 8, 8);
        ctx.fillRect(38, 50, 8, 8);

        // Vest
        ctx.fillStyle = '#37474F';
        ctx.fillRect(24, 22, 16, 20);

        // Scarf/Bandana (Red)
        ctx.fillStyle = '#D32F2F';
        ctx.fillRect(22, 20, 20, 6);

        // Head
        ctx.fillStyle = '#f5c6a5';
        ctx.fillRect(24, 12, 16, 10);

        // Hat (Cowboy - Wide Brim)
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(16, 12, 32, 4); // Brim
        ctx.fillRect(22, 4, 20, 8); // Top

        // Eyes (Determination)
        ctx.fillStyle = 'black';
        ctx.fillRect(26, 16, 2, 2);
        ctx.fillRect(36, 16, 2, 2);

        // Arms (Sleeves)
        ctx.fillStyle = '#263238';
        ctx.fillRect(12, 24, 8, 16); // Left
        ctx.fillRect(44, 24, 8, 16); // Right

        // Hands
        ctx.fillStyle = '#f5c6a5';
        ctx.fillRect(12, 40, 6, 6);
        ctx.fillRect(46, 40, 6, 6);

        // Dual Pistols
        // Left Gun
        ctx.fillStyle = '#CFD8DC'; // Silver barrel
        ctx.fillRect(4, 38, 10, 4);
        ctx.fillStyle = '#5D4037'; // Wooden Grip
        ctx.fillRect(10, 40, 4, 6);

        // Right Gun
        ctx.fillStyle = '#CFD8DC';
        ctx.fillRect(50, 38, 10, 4);
        ctx.fillStyle = '#5D4037'; // Grip
        ctx.fillRect(50, 40, 4, 6);

        return canvas;
    }

    static generateBullet() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');

        // Simple fast projectile
        ctx.fillStyle = '#FFD700'; // Gold casing/trail
        ctx.beginPath();
        ctx.arc(8, 8, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFF'; // Shine
        ctx.beginPath();
        ctx.arc(6, 6, 2, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }
}
