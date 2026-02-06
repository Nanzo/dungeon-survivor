export const PaladinAssets = {
    generatePaladin() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Cape (Behind)
        ctx.fillStyle = '#800'; // Dark Red Cape
        ctx.fillRect(22, 30, 20, 32);

        // Body (Armor Base)
        ctx.fillStyle = '#A9A9A9'; // Dark Grey Chainmail
        ctx.fillRect(18, 28, 28, 32);

        // Breastplate (Silver)
        ctx.fillStyle = '#E0E0E0';
        ctx.beginPath();
        ctx.moveTo(18, 28);
        ctx.lineTo(46, 28);
        ctx.lineTo(42, 50);
        ctx.lineTo(22, 50);
        ctx.fill();

        // Cross on Chest
        ctx.fillStyle = 'gold';
        ctx.fillRect(28, 32, 8, 16); // Vertical
        ctx.fillRect(24, 36, 16, 6);  // Horizontal

        // Head
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(32, 18, 9, 0, Math.PI * 2);
        ctx.fill();

        // Helmet (Great Helm style)
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(24, 8, 16, 18);
        // Visor slit
        ctx.fillStyle = '#333';
        ctx.fillRect(26, 14, 12, 4);
        // Plume (Decoration)
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(32, 8);
        ctx.lineTo(42, 2);
        ctx.lineTo(22, 2);
        ctx.fill();

        // Hammer (Right Hand)
        ctx.fillStyle = '#8B4513'; // Handle
        ctx.fillRect(50, 40, 6, 20);
        ctx.fillStyle = '#DDD'; // Head
        ctx.fillRect(44, 25, 18, 15);
        ctx.fillStyle = 'gold'; // Gold trim
        ctx.fillRect(50, 25, 6, 15);

        // Shield (Left Hand)
        ctx.fillStyle = '#4682B4'; // Steel Blue
        ctx.beginPath();
        ctx.moveTo(8, 30);
        ctx.lineTo(22, 30);
        ctx.lineTo(22, 50);
        ctx.lineTo(15, 58);
        ctx.lineTo(8, 50);
        ctx.fill();
        // Shield Cross
        ctx.fillStyle = 'white';
        ctx.fillRect(13, 35, 4, 15);
        ctx.fillRect(10, 38, 10, 4);

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    },

    generateHammerProjectile() {
        const canvas = document.createElement('canvas');
        canvas.width = 48; // Slightly larger for rotation
        canvas.height = 48;
        const ctx = canvas.getContext('2d');

        ctx.translate(24, 24);

        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'gold';

        // Rotate for visual effect if we animated it, but here just static drawing
        // Handle
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(-3, 0, 6, 20);

        // Head
        ctx.fillStyle = '#EEE';
        ctx.fillRect(-12, -10, 24, 12);

        // Gold Accents
        ctx.fillStyle = 'gold';
        ctx.fillRect(-4, -10, 8, 12); // Center band
        ctx.fillRect(-12, -10, 3, 12); // Left edge
        ctx.fillRect(9, -10, 3, 12);  // Right edge

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    }
};
