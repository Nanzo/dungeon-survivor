export const BossGhostAssets = {
    generateBossGhost() {
        const width = 144; // 3x 48
        const height = 144;
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 3;

        // --- Red Aura (Ethereal) ---
        const gradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 70);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fill();

        // --- Draw Ghost (Scaled) ---
        ctx.save();
        ctx.translate(centerX - (24 * scale), centerY - (24 * scale));
        ctx.scale(scale, scale);

        // Ethereal Glow (Darker Cyan/Red mix)
        const grd = ctx.createRadialGradient(24, 20, 5, 24, 24, 24);
        grd.addColorStop(0, 'rgba(224, 247, 250, 0.95)');
        grd.addColorStop(1, 'rgba(0, 96, 100, 0.2)');
        ctx.fillStyle = grd;

        // Shape
        ctx.beginPath();
        ctx.arc(24, 18, 14, Math.PI, 0); // Head
        // Wavy Bottom
        ctx.lineTo(38, 40);
        ctx.quadraticCurveTo(32, 35, 28, 42);
        ctx.quadraticCurveTo(24, 35, 20, 42);
        ctx.quadraticCurveTo(16, 35, 10, 40);
        ctx.lineTo(10, 18);
        ctx.fill();

        // Eyes (Red Glowing Void)
        ctx.fillStyle = '#FF0000';
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.ellipse(19, 18, 3, 5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath();
        ctx.ellipse(29, 18, 3, 5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Mouth (Screaming Large)
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.ellipse(24, 30, 4, 6, 0, 0, Math.PI * 2); ctx.fill();

        ctx.restore();

        // --- Crown (Floating Ethereal Gold) ---
        ctx.save();
        ctx.translate(centerX, centerY - (20 * scale));
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-12, -8);
        ctx.lineTo(-4, -4);
        ctx.lineTo(0, -12);
        ctx.lineTo(4, -4);
        ctx.lineTo(12, -8);
        ctx.lineTo(8, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        return c;
    }
};
