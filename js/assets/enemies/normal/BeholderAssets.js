export const BeholderAssets = {
    generateBeholder() {
        const c = document.createElement('canvas');
        c.width = 72;
        c.height = 72;
        const ctx = c.getContext('2d');

        // Main Body (Orb)
        const grd = ctx.createRadialGradient(36, 36, 10, 36, 36, 30);
        grd.addColorStop(0, '#7B1FA2'); // Purple
        grd.addColorStop(1, '#4A148C'); // Dark Purple
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(36, 36, 25, 0, Math.PI * 2); ctx.fill();

        // Main Eye (Cyclops)
        // Sclera
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.ellipse(36, 36, 12, 12, 0, 0, Math.PI * 2); ctx.fill();
        // Iris
        ctx.fillStyle = '#00C853'; // Green Eye
        ctx.beginPath(); ctx.arc(36, 36, 7, 0, Math.PI * 2); ctx.fill();
        // Pupil (Slit)
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(36, 36, 2, 7, 0, 0, Math.PI * 2); ctx.fill();
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath(); ctx.arc(38, 33, 2, 0, Math.PI * 2); ctx.fill();

        // Eye Stalks
        ctx.strokeStyle = '#4A148C';
        ctx.lineWidth = 3;
        const stalkCount = 8;
        for (let i = 0; i < stalkCount; i++) {
            const angle = (i / stalkCount) * Math.PI * 2;
            const sx = 36 + Math.cos(angle) * 22; // Start on body
            const ex = 36 + Math.cos(angle) * 34; // End tip
            const sy = 36 + Math.sin(angle) * 22;
            const ey = 36 + Math.sin(angle) * 34;

            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();

            // Small Eye on Tip
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#D50000'; // Evil red
            ctx.beginPath(); ctx.arc(ex, ey, 1.5, 0, Math.PI * 2); ctx.fill();
        }

        // Mouth (Gaping Maw)
        ctx.fillStyle = '#3E2723';
        ctx.beginPath();
        ctx.arc(36, 50, 10, Math.PI, 0); // Under main eye?
        // Beholder anatomy varies, mouth usually under big eye.
        // Let's draw it simple.
        ctx.fill();
        // Teeth
        ctx.fillStyle = '#FFECB3';
        ctx.beginPath(); ctx.moveTo(28, 50); ctx.lineTo(30, 45); ctx.lineTo(32, 50); ctx.fill();
        ctx.beginPath(); ctx.moveTo(32, 50); ctx.lineTo(34, 45); ctx.lineTo(36, 50); ctx.fill();
        ctx.beginPath(); ctx.moveTo(40, 50); ctx.lineTo(42, 45); ctx.lineTo(44, 50); ctx.fill();

        return c;
    }
};
