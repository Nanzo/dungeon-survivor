export const BossHydraAssets = {
    generateBossHydra() {
        const width = 240; // 3x 80
        const height = 240;
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 3;

        // --- Red Aura ---
        const gradient = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 100);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.scale(scale, scale);

        // --- Hydra Body ---
        ctx.fillStyle = '#1B5E20'; // Darker Body
        ctx.beginPath(); ctx.ellipse(40, 60, 25, 20, 0, 0, Math.PI * 2); ctx.fill();

        // Scales
        ctx.strokeStyle = '#004D40';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(40, 60, 15, 0, Math.PI * 2); ctx.stroke();

        // Heads Helper
        const drawHead = (x, y, neckControlX, neckControlY, isMain = false) => {
            // Neck
            ctx.strokeStyle = '#2E7D32';
            ctx.lineWidth = isMain ? 8 : 6;
            ctx.beginPath();
            ctx.moveTo(40, 60); // Body center
            ctx.quadraticCurveTo(neckControlX, neckControlY, x, y);
            ctx.stroke();

            // Head
            ctx.fillStyle = isMain ? '#43A047' : '#66BB6A';
            ctx.beginPath(); ctx.ellipse(x, y, isMain ? 10 : 8, isMain ? 8 : 6, 0, 0, Math.PI * 2); ctx.fill();

            // Eye (Red for boss)
            ctx.fillStyle = '#D50000';
            ctx.beginPath(); ctx.arc(x - 2, y - 2, 2, 0, Math.PI * 2); ctx.fill();

            // Crown for Main Head
            if (isMain) {
                ctx.fillStyle = 'gold';
                ctx.beginPath();
                ctx.moveTo(x - 6, y - 6);
                ctx.lineTo(x - 3, y - 12);
                ctx.lineTo(x, y - 8);
                ctx.lineTo(x + 3, y - 12);
                ctx.lineTo(x + 6, y - 6);
                ctx.fill();
            }
        };

        // 5 Heads for Boss!
        drawHead(10, 30, 0, 50); // Far Left
        drawHead(25, 20, 20, 40); // Left
        drawHead(40, 10, 40, 30, true); // Center (Main)
        drawHead(55, 20, 60, 40); // Right
        drawHead(70, 30, 80, 50); // Far Right

        ctx.restore();

        return c;
    }
};
