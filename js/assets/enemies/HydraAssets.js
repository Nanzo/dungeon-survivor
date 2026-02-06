export const HydraAssets = {
    generateHydra() {
        const c = document.createElement('canvas');
        c.width = 80;
        c.height = 80;
        const ctx = c.getContext('2d');

        // Body (Central mass)
        ctx.fillStyle = '#2E7D32';
        ctx.beginPath(); ctx.ellipse(40, 60, 20, 15, 0, 0, Math.PI * 2); ctx.fill();

        // Scales Texture
        ctx.strokeStyle = '#1B5E20';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(40, 60, 12, 0, Math.PI * 2);
        ctx.stroke();

        // Heads Helper
        const drawHead = (x, y, neckControlX, neckControlY) => {
            // Neck
            ctx.strokeStyle = '#388E3C';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(40, 60); // Body center
            ctx.quadraticCurveTo(neckControlX, neckControlY, x, y);
            ctx.stroke();

            // Head
            ctx.fillStyle = '#4CAF50';
            ctx.beginPath(); ctx.ellipse(x, y, 8, 6, 0, 0, Math.PI * 2); ctx.fill();

            // Eye
            ctx.fillStyle = 'yellow';
            ctx.beginPath(); ctx.arc(x - 2, y - 2, 2, 0, Math.PI * 2); ctx.fill();

            // Mouth (Hissing)
            ctx.strokeStyle = '#1B5E20';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x - 4, y + 2); ctx.lineTo(x + 4, y + 2); ctx.stroke();

            // Forked Tongue
            ctx.strokeStyle = 'red';
            ctx.beginPath(); ctx.moveTo(x, y + 2); ctx.lineTo(x - 2, y + 8); ctx.stroke();
        };

        // 3 Heads
        drawHead(20, 30, 10, 50); // Left
        drawHead(40, 20, 40, 40); // Center
        drawHead(60, 30, 70, 50); // Right

        return c;
    }
};
