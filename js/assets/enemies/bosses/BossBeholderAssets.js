export const BossBeholderAssets = {
    generateBossBeholder() {
        const width = 216; // 3x 72
        const height = 216;
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

        // --- Beholder Body ---
        // Main Body (Orb) - Darker Purple
        const grd = ctx.createRadialGradient(36, 36, 10, 36, 36, 30);
        grd.addColorStop(0, '#6A1B9A');
        grd.addColorStop(1, '#311B92'); // Deep Indigo
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(36, 36, 25, 0, Math.PI * 2); ctx.fill();

        // Main Eye (Cyclops) - Red/Orange for Boss
        // Sclera
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.ellipse(36, 36, 12, 12, 0, 0, Math.PI * 2); ctx.fill();
        // Iris
        ctx.fillStyle = '#D50000'; // Red Eye
        ctx.beginPath(); ctx.arc(36, 36, 8, 0, Math.PI * 2); ctx.fill();
        // Pupil (Slit)
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(36, 36, 2, 8, 0, 0, Math.PI * 2); ctx.fill();
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath(); ctx.arc(38, 33, 2, 0, Math.PI * 2); ctx.fill();

        // Eye Stalks (More of them!)
        ctx.strokeStyle = '#311B92';
        ctx.lineWidth = 3;
        const stalkCount = 12; // More stalks for Boss
        for (let i = 0; i < stalkCount; i++) {
            const angle = (i / stalkCount) * Math.PI * 2;
            const sx = 36 + Math.cos(angle) * 22;
            const ex = 36 + Math.cos(angle) * 36; // Longer stalks
            const sy = 36 + Math.sin(angle) * 22;
            const ey = 36 + Math.sin(angle) * 36;

            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();

            // Small Eye on Tip
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#FFD600'; // Yellow/Gold small eyes
            ctx.beginPath(); ctx.arc(ex, ey, 1.5, 0, Math.PI * 2); ctx.fill();
        }

        // Mouth (Gaping Maw)
        ctx.fillStyle = '#263238';
        ctx.beginPath();
        ctx.arc(36, 50, 10, Math.PI, 0);
        ctx.fill();
        // Teeth (Gold?)
        ctx.fillStyle = '#FFECB3';
        ctx.beginPath(); ctx.moveTo(28, 50); ctx.lineTo(30, 44); ctx.lineTo(32, 50); ctx.fill();
        ctx.beginPath(); ctx.moveTo(32, 50); ctx.lineTo(34, 44); ctx.lineTo(36, 50); ctx.fill();
        ctx.beginPath(); ctx.moveTo(36, 50); ctx.lineTo(38, 44); ctx.lineTo(40, 50); ctx.fill();
        ctx.beginPath(); ctx.moveTo(40, 50); ctx.lineTo(42, 44); ctx.lineTo(44, 50); ctx.fill();

        ctx.restore();

        // Crown (Floating above)
        ctx.save();
        ctx.translate(centerX, centerY - (35 * scale));
        ctx.scale(scale, scale);
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        // Simple crown
        ctx.moveTo(-10, 0); ctx.lineTo(-5, -8); ctx.lineTo(0, -4); ctx.lineTo(5, -8); ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        return c;
    }
};
