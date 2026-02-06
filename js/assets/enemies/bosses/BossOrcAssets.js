export const BossOrcAssets = {
    generateBossOrc() {
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
        const gradient = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 90);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
        ctx.fill();

        // --- Draw Orc (Scaled) ---
        ctx.save();
        ctx.translate(centerX - (32 * scale), centerY - (32 * scale));
        ctx.scale(scale, scale);

        // Body (Darker, War-paint)
        const grd = ctx.createLinearGradient(0, 0, 0, 64);
        grd.addColorStop(0, '#2E7D32'); // Dark Olive
        grd.addColorStop(1, '#000000'); // Black-ish Green
        ctx.fillStyle = grd;

        // Torso
        ctx.fillRect(16, 20, 32, 30);
        // Shoulders
        ctx.beginPath(); ctx.arc(16, 25, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(48, 25, 8, 0, Math.PI * 2); ctx.fill();

        // Head
        ctx.beginPath(); ctx.arc(32, 16, 12, 0, Math.PI * 2); ctx.fill();

        // Jaw/Tusks (Large)
        ctx.fillStyle = '#D7CCC8'; // Dirty bone
        ctx.beginPath(); ctx.moveTo(26, 22); ctx.lineTo(26, 14); ctx.lineTo(29, 22); ctx.fill();
        ctx.beginPath(); ctx.moveTo(38, 22); ctx.lineTo(38, 14); ctx.lineTo(35, 22); ctx.fill();

        // Eyes (Red Glowing)
        ctx.fillStyle = '#FF0000';
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 5;
        ctx.fillRect(26, 14, 4, 2);
        ctx.fillRect(34, 14, 4, 2);
        ctx.shadowBlur = 0;

        // Armor (Chestplate - Gold/Black)
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(20, 24, 24, 20);
        ctx.strokeStyle = '#FFD700'; // Gold Trim
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 24, 24, 20);

        // Metal Studs (Red)
        ctx.fillStyle = '#B71C1C';
        ctx.beginPath(); ctx.arc(24, 28, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(40, 28, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(32, 38, 2, 0, Math.PI * 2); ctx.fill();

        // Big Axe (Double Headed)
        ctx.fillStyle = '#212121'; // Dark Metal
        ctx.beginPath();
        // Left Blade
        ctx.moveTo(50, 40); ctx.lineTo(60, 20); ctx.lineTo(60, 50);
        // Right Blade
        ctx.lineTo(70, 40);
        ctx.lineTo(60, 20);
        ctx.fill();

        ctx.strokeStyle = '#5D4037'; // Handle
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(48, 30); ctx.lineTo(60, 60); ctx.stroke(); // Angled hold

        ctx.restore();

        // --- Crown (Golden) ---
        ctx.save();
        ctx.translate(centerX, centerY - (25 * scale));
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-12, 0);
        ctx.lineTo(-18, -12);
        ctx.lineTo(-6, -6);
        ctx.lineTo(0, -18);
        ctx.lineTo(6, -6);
        ctx.lineTo(18, -12);
        ctx.lineTo(12, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        return c;
    }
};
