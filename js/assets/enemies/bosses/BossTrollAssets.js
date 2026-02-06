export const BossTrollAssets = {
    generateBossTroll() {
        const width = 192; // 3x 64
        const height = 192;
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 3;

        // --- Red Aura ---
        const gradient = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 100);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
        ctx.fill();

        // --- Draw Troll (Scaled) ---
        ctx.save();
        ctx.translate(centerX - (32 * scale), centerY - (32 * scale));
        ctx.scale(scale, scale);

        // Skin (Darker Grey/Blue)
        ctx.fillStyle = '#37474F';
        ctx.beginPath();
        ctx.ellipse(32, 36, 20, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // Warts (Red/Gross)
        ctx.fillStyle = '#C62828';
        ctx.beginPath(); ctx.arc(20, 30, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(44, 40, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(32, 45, 2, 0, Math.PI * 2); ctx.fill();

        // Mohawk (Fiery Red)
        ctx.fillStyle = '#D50000'; // Bright Red
        ctx.beginPath();
        ctx.moveTo(32, 18);
        ctx.lineTo(20, 5); ctx.lineTo(25, 16);
        ctx.lineTo(32, 2); ctx.lineTo(39, 16);
        ctx.lineTo(44, 5); ctx.lineTo(32, 20);
        ctx.fill();

        // Big Nose
        ctx.fillStyle = '#546E7A';
        ctx.beginPath(); ctx.arc(32, 34, 6, 0, Math.PI * 2); ctx.fill();

        // Tusks (Huge)
        ctx.fillStyle = '#FFF59D';
        ctx.beginPath(); ctx.moveTo(28, 42); ctx.lineTo(26, 28); ctx.lineTo(30, 42); ctx.fill();
        ctx.beginPath(); ctx.moveTo(36, 42); ctx.lineTo(38, 28); ctx.lineTo(34, 42); ctx.fill();

        // Eyes (Red)
        ctx.fillStyle = '#FF0000';
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 5;
        ctx.beginPath(); ctx.arc(26, 28, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(38, 28, 2, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();

        // --- Crown (Crude Iron/Gold) ---
        ctx.save();
        ctx.translate(centerX, centerY - (28 * scale));
        ctx.fillStyle = '#B8860B'; // Dark Gold
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(-10, -8);
        ctx.lineTo(-5, -4);
        ctx.lineTo(0, -10);
        ctx.lineTo(5, -4);
        ctx.lineTo(10, -8);
        ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        return c;
    }
};
