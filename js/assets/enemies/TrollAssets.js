export const TrollAssets = {
    generateTroll() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');

        // Skin (Blue-Grey bumpy)
        ctx.fillStyle = '#546E7A';
        ctx.beginPath();
        ctx.ellipse(32, 36, 20, 18, 0, 0, Math.PI * 2); // Head/Body fused
        ctx.fill();

        // Warts
        ctx.fillStyle = '#37474F';
        ctx.beginPath(); ctx.arc(20, 30, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(44, 40, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(32, 45, 2, 0, Math.PI * 2); ctx.fill();

        // Mohawk (Punk)
        ctx.fillStyle = '#E91E63';
        ctx.beginPath();
        ctx.moveTo(32, 18);
        ctx.lineTo(20, 5); ctx.lineTo(25, 16);
        ctx.lineTo(32, 2); ctx.lineTo(39, 16);
        ctx.lineTo(44, 5); ctx.lineTo(32, 20);
        ctx.fill();

        // Big Nose
        ctx.fillStyle = '#78909C';
        ctx.beginPath(); ctx.arc(32, 34, 6, 0, Math.PI * 2); ctx.fill();

        // Tusks showing up
        ctx.fillStyle = '#FFF9C4';
        ctx.beginPath(); ctx.moveTo(28, 40); ctx.lineTo(28, 30); ctx.lineTo(30, 40); ctx.fill();
        ctx.beginPath(); ctx.moveTo(36, 40); ctx.lineTo(36, 30); ctx.lineTo(34, 40); ctx.fill();

        // Eyes (Dull)
        ctx.fillStyle = '#263238';
        ctx.beginPath(); ctx.arc(26, 28, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(38, 28, 2, 0, Math.PI * 2); ctx.fill();

        return c;
    }
};
