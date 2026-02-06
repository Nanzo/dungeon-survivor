export const BossGoblinAssets = {
    generateBossGoblin() {
        const width = 144; // 3x 48
        const height = 144; // 3x 48
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 3;

        // --- Red Aura ---
        const gradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 70);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fill();

        // --- Draw Goblin (Scaled) ---
        ctx.save();
        ctx.translate(centerX - (24 * scale), centerY - (24 * scale));
        ctx.scale(scale, scale);

        // Skin Gradient (Darker Green)
        const grd = ctx.createRadialGradient(24, 24, 5, 24, 24, 20);
        grd.addColorStop(0, '#388E3C'); // Darker Green
        grd.addColorStop(1, '#1B5E20'); // Very Dark Green
        ctx.fillStyle = grd;

        // Head
        ctx.beginPath();
        ctx.moveTo(14, 15);
        ctx.lineTo(34, 15);
        ctx.lineTo(38, 25);
        ctx.lineTo(24, 38);
        ctx.lineTo(10, 25);
        ctx.closePath();
        ctx.fill();

        // Big Ears
        ctx.beginPath();
        ctx.moveTo(10, 20); ctx.lineTo(2, 15); ctx.lineTo(12, 28);
        ctx.moveTo(38, 20); ctx.lineTo(46, 15); ctx.lineTo(36, 28);
        ctx.fill();

        // Eyes (Glowing Red)
        ctx.fillStyle = '#FF0000';
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(18, 22); ctx.lineTo(22, 22); ctx.lineTo(20, 25);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(26, 22); ctx.lineTo(30, 22); ctx.lineTo(28, 25);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Mouth (Snarl)
        ctx.fillStyle = '#1B5E20'; // Dark
        ctx.beginPath();
        ctx.arc(24, 32, 5, Math.PI, 0);
        ctx.fill();

        // Teeth (Sharp)
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.moveTo(22, 32); ctx.lineTo(23, 36); ctx.lineTo(24, 32); ctx.fill();
        ctx.beginPath(); ctx.moveTo(24, 32); ctx.lineTo(25, 36); ctx.lineTo(26, 32); ctx.fill();

        // Dagger (Gold/Blood)
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(35, 30, 4, 10);
        ctx.fillStyle = '#D32F2F'; // Blood Red Blade
        ctx.beginPath();
        ctx.moveTo(37, 30); ctx.lineTo(45, 20); ctx.lineTo(39, 30);
        ctx.fill();

        ctx.restore();

        // --- Crown (Golden) ---
        ctx.save();
        ctx.translate(centerX, centerY - (15 * scale));
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(-15, -10);
        ctx.lineTo(-5, -5);
        ctx.lineTo(0, -15);
        ctx.lineTo(5, -5);
        ctx.lineTo(15, -10);
        ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        return c;
    }
};
