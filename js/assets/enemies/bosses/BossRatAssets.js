export const BossRatAssets = {
    generateBossRat() {
        const width = 120; // 3x 40
        const height = 90; // 3x 30
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 3;

        // --- Red Aura ---
        const gradient = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 60);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.fill();

        // --- Draw Rat (Scaled) ---
        ctx.save();
        ctx.translate(centerX - (20 * scale), centerY - (15 * scale)); // Center the drawing logic
        ctx.scale(scale, scale);

        // Body Gradient (Darker for Boss)
        const grd = ctx.createLinearGradient(10, 10, 30, 30);
        grd.addColorStop(0, '#3E2723'); // Darker Brown
        grd.addColorStop(1, '#1A100E'); // Almost Black
        ctx.fillStyle = grd;

        // Body Shape
        ctx.beginPath();
        ctx.ellipse(20, 15, 12, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head (Snout)
        ctx.beginPath();
        ctx.moveTo(30, 15);
        ctx.lineTo(40, 15);
        ctx.lineTo(30, 20);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#3E2723';
        ctx.ellipse(30, 15, 6, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(30, 10); ctx.lineTo(42, 15); ctx.lineTo(30, 20);
        ctx.fill();

        // Ears (Darker)
        ctx.fillStyle = '#5D4037';
        ctx.beginPath(); ctx.arc(25, 8, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(32, 8, 4, 0, Math.PI * 2); ctx.fill();

        // Eyes (Glowing Red)
        ctx.fillStyle = '#FF0000';
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 5;
        ctx.beginPath(); ctx.arc(36, 12, 2, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; // Reset

        // Tail (Dark Red)
        ctx.strokeStyle = '#8E2424';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(10, 15);
        ctx.quadraticCurveTo(0, 15, 0, 25);
        ctx.stroke();

        // Whiskers
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(42, 15); ctx.lineTo(48, 12);
        ctx.moveTo(42, 15); ctx.lineTo(48, 18);
        ctx.stroke();

        ctx.restore();

        // --- Crown (Golden) ---
        ctx.save();
        ctx.translate(centerX + (10 * scale), centerY - (10 * scale)); // Position on head
        ctx.fillStyle = '#FFD700'; // Gold
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-5, -10);
        ctx.lineTo(0, -5);
        ctx.lineTo(5, -12);
        ctx.lineTo(10, -5);
        ctx.lineTo(15, -10);
        ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        return c;
    }
};
