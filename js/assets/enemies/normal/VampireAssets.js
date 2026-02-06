export const VampireAssets = {
    generateVampire() {
        const c = document.createElement('canvas');
        c.width = 48;
        c.height = 48;
        const ctx = c.getContext('2d');

        // Cape (High Collar)
        ctx.fillStyle = '#000'; // Outside
        ctx.beginPath();
        ctx.moveTo(10, 10); // Left Collar Tip
        ctx.quadraticCurveTo(15, 30, 5, 45); // Cape drape
        ctx.lineTo(43, 45);
        ctx.quadraticCurveTo(33, 30, 38, 10); // Right Collar Tip
        ctx.lineTo(24, 20); // Back of neck
        ctx.fill();

        // Red Lining
        ctx.fillStyle = '#B71C1C';
        ctx.beginPath();
        ctx.moveTo(10, 10); ctx.lineTo(24, 20); ctx.lineTo(14, 25); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(38, 10); ctx.lineTo(24, 20); ctx.lineTo(34, 25); ctx.fill();

        // Face
        ctx.fillStyle = '#FFEBEE'; // Pale
        ctx.beginPath(); ctx.ellipse(24, 22, 8, 10, 0, 0, Math.PI * 2); ctx.fill();

        // Hair (Slick back)
        ctx.fillStyle = '#212121';
        ctx.beginPath();
        ctx.moveTo(16, 20);
        ctx.quadraticCurveTo(24, 10, 32, 20);
        ctx.lineTo(30, 14);
        ctx.quadraticCurveTo(24, 8, 18, 14);
        ctx.fill();

        // Eyes (Glowing Red)
        ctx.fillStyle = '#FF0000';
        ctx.beginPath(); ctx.arc(22, 22, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(26, 22, 1.5, 0, Math.PI * 2); ctx.fill();

        // Fangs
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.moveTo(22, 28); ctx.lineTo(22.5, 31); ctx.lineTo(23, 28); ctx.fill();
        ctx.beginPath(); ctx.moveTo(26, 28); ctx.lineTo(25.5, 31); ctx.lineTo(25, 28); ctx.fill();

        return c;
    }
};
