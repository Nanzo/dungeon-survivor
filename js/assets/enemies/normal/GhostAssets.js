export const GhostAssets = {
    generateGhost() {
        const c = document.createElement('canvas');
        c.width = 48;
        c.height = 48;
        const ctx = c.getContext('2d');

        // Ethereal Glow
        const grd = ctx.createRadialGradient(24, 20, 5, 24, 24, 24);
        grd.addColorStop(0, 'rgba(224, 247, 250, 0.9)'); // Center Opaque
        grd.addColorStop(1, 'rgba(0, 188, 212, 0.1)'); // Edge Transparent
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

        // Eyes (Hollow)
        ctx.fillStyle = '#006064';
        ctx.beginPath();
        ctx.ellipse(19, 18, 3, 5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath();
        ctx.ellipse(29, 18, 3, 5, 0, 0, Math.PI * 2); ctx.fill();

        // Mouth (Oooo)
        ctx.beginPath();
        ctx.arc(24, 28, 3, 0, Math.PI * 2); ctx.fill();

        return c;
    }
};
