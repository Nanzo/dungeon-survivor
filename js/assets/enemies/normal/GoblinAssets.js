export const GoblinAssets = {
    generateGoblin() {
        const c = document.createElement('canvas'); // Helper usage? No, standalone.
        c.width = 48;
        c.height = 48;
        const ctx = c.getContext('2d');

        // Skin Gradient
        const grd = ctx.createRadialGradient(24, 24, 5, 24, 24, 20);
        grd.addColorStop(0, '#66BB6A'); // Light Green
        grd.addColorStop(1, '#2E7D32'); // Dark Green
        ctx.fillStyle = grd;

        // Head (Pointy Chin)
        ctx.beginPath();
        ctx.moveTo(14, 15);
        ctx.lineTo(34, 15); // Top
        ctx.lineTo(38, 25); // Cheek R
        ctx.lineTo(24, 38); // Chin
        ctx.lineTo(10, 25); // Cheek L
        ctx.closePath();
        ctx.fill();

        // Big Ears
        ctx.beginPath();
        ctx.moveTo(10, 20); ctx.lineTo(2, 15); ctx.lineTo(12, 28); // Left
        ctx.moveTo(38, 20); ctx.lineTo(46, 15); ctx.lineTo(36, 28); // Right
        ctx.fill();

        // Eyes (Mean Yellow)
        ctx.fillStyle = '#FFEB3B';
        ctx.beginPath();
        ctx.moveTo(18, 22); ctx.lineTo(22, 22); ctx.lineTo(20, 25); // Left
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(26, 22); ctx.lineTo(30, 22); ctx.lineTo(28, 25); // Right
        ctx.fill();

        // Pupils
        ctx.fillStyle = 'red';
        ctx.fillRect(19, 23, 1, 1);
        ctx.fillRect(27, 23, 1, 1);

        // Mouth (Snarl)
        ctx.fillStyle = '#1B5E20';
        ctx.beginPath();
        ctx.arc(24, 32, 5, Math.PI, 0); // Frown
        ctx.fill();

        // Teeth
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.moveTo(22, 32); ctx.lineTo(23, 35); ctx.lineTo(24, 32); ctx.fill();
        ctx.beginPath(); ctx.moveTo(24, 32); ctx.lineTo(25, 35); ctx.lineTo(26, 32); ctx.fill();

        // Dagger (Rusty)
        ctx.fillStyle = '#8D6E63'; // Handle
        ctx.fillRect(35, 30, 4, 10);
        ctx.fillStyle = '#B0BEC5'; // Blade
        ctx.beginPath();
        ctx.moveTo(37, 30); ctx.lineTo(45, 20); ctx.lineTo(39, 30);
        ctx.fill();

        return c;
    }
};
