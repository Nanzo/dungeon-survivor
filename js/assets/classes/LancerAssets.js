
export class LancerAssets {
    static generateLancer() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Red Cape (Heroic, flowing behind)
        ctx.fillStyle = '#C0392B'; // Detailed Red
        ctx.beginPath();
        ctx.moveTo(20, 20); // Left shoulder
        ctx.quadraticCurveTo(10, 40, 5, 55); // Left bottom flow
        ctx.lineTo(59, 55); // Right bottom
        ctx.quadraticCurveTo(54, 40, 44, 20); // Right shoulder
        ctx.fill();

        // Body Armor (Cyan Plate)
        ctx.fillStyle = '#008B8B'; // Dark Cyan
        ctx.fillRect(22, 22, 20, 28);

        // Armor Details (Silver borders)
        ctx.strokeStyle = '#BDC3C7'; // Silver
        ctx.lineWidth = 2;
        ctx.strokeRect(22, 22, 20, 28);

        // Belt
        ctx.fillStyle = '#5D4037'; // Leather Brown
        ctx.fillRect(22, 45, 20, 5);

        // Head
        ctx.fillStyle = '#E0AC69'; // Skin
        ctx.beginPath();
        ctx.arc(32, 16, 9, 0, Math.PI * 2);
        ctx.fill();

        // Helmet (Medieval Knight style, Visor up)
        ctx.fillStyle = '#006064'; // Darker Cyan Metal
        ctx.beginPath();
        ctx.moveTo(22, 10);
        ctx.lineTo(42, 10);
        ctx.lineTo(42, 5);
        ctx.quadraticCurveTo(32, -2, 22, 5);
        ctx.fill();

        // Helmet plume (Red)
        ctx.fillStyle = '#C0392B';
        ctx.beginPath();
        ctx.moveTo(32, 5);
        ctx.lineTo(28, -2);
        ctx.lineTo(36, -2);
        ctx.fill();

        // Arms/Hands (Holding Spear)
        ctx.fillStyle = '#008B8B'; // Cyan Sleeves
        ctx.beginPath();
        ctx.arc(18, 28, 5, 0, Math.PI * 2); // Left Hand (Relaxed)
        ctx.fill();
        ctx.beginPath();
        ctx.arc(46, 28, 5, 0, Math.PI * 2); // Right Hand (Holding)
        ctx.fill();


        // Spear (Vertical, resting on ground)
        ctx.strokeStyle = '#5D4037'; // Wood
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(46, 60); // Bottom (Ground)
        ctx.lineTo(46, 12); // Top (Near head)
        ctx.stroke();

        // Spear Tip (Vertical Spike) - BETTER VISIBILITY
        ctx.fillStyle = '#CFD8DC'; // Light Steel
        ctx.beginPath();
        ctx.moveTo(46, 12); // Base
        ctx.lineTo(42, 18); // Left flare
        ctx.lineTo(46, 2);  // Point (Top of canvas)
        ctx.lineTo(50, 18); // Right flare
        ctx.lineTo(46, 12);
        ctx.fill();

        // Shine on tip
        ctx.fillStyle = '#ECEFF1';
        ctx.beginPath();
        ctx.moveTo(46, 12);
        ctx.lineTo(46, 2);
        ctx.lineTo(50, 18);
        ctx.fill();

        return canvas;
    }

    static generateSpear() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 20; // Taller context
        const ctx = canvas.getContext('2d');

        const cy = 10; // Center Y

        // 1. Shaft (Thicker, Dark Wood)
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(0, cy - 3, 40, 6);

        // 2. Head Assembly (Reinforced Metal)
        ctx.fillStyle = '#546E7A'; // Blue Grey
        ctx.fillRect(40, cy - 3, 6, 6);

        // 3. Spear Head (Large Halberd-ish Spike)
        // Top half
        ctx.fillStyle = '#ECEFF1'; // Bright Steel
        ctx.beginPath();
        ctx.moveTo(46, cy - 4);
        ctx.lineTo(64, cy); // Long Tip
        ctx.lineTo(46, cy);
        ctx.fill();

        // Bottom half (Shadowed)
        ctx.fillStyle = '#90A4AE'; // Darker Steel
        ctx.beginPath();
        ctx.moveTo(46, cy);
        ctx.lineTo(64, cy);
        ctx.lineTo(46, cy + 4);
        ctx.fill();

        return canvas;
    }
}
