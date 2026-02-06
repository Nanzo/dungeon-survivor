export const OrcAssets = {
    generateOrc() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');

        // Body (Hulking Green)
        const grd = ctx.createLinearGradient(0, 0, 0, 64);
        grd.addColorStop(0, '#33691E'); // Light Olive
        grd.addColorStop(1, '#1B5E20'); // Dark Green
        ctx.fillStyle = grd;

        // Torso
        ctx.fillRect(16, 20, 32, 30);
        // Shoulders
        ctx.beginPath(); ctx.arc(16, 25, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(48, 25, 8, 0, Math.PI * 2); ctx.fill();

        // Head
        ctx.beginPath(); ctx.arc(32, 16, 12, 0, Math.PI * 2); ctx.fill();

        // Jaw/Tusks
        ctx.fillStyle = '#F5F5F5';
        ctx.beginPath(); ctx.moveTo(26, 22); ctx.lineTo(26, 16); ctx.lineTo(28, 22); ctx.fill();
        ctx.beginPath(); ctx.moveTo(38, 22); ctx.lineTo(38, 16); ctx.lineTo(36, 22); ctx.fill();

        // Eyes (Red Warpaint?)
        ctx.fillStyle = '#D32F2F';
        ctx.fillRect(26, 14, 4, 2);
        ctx.fillRect(34, 14, 4, 2);

        // Armor (Chestplate)
        ctx.fillStyle = '#5D4037'; // Leather
        ctx.fillRect(20, 24, 24, 20);
        ctx.strokeStyle = '#3E2723';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 24, 24, 20);
        // Metal Studs
        ctx.fillStyle = '#BCAAA4';
        ctx.beginPath(); ctx.arc(24, 28, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(40, 28, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(32, 38, 2, 0, Math.PI * 2); ctx.fill();

        // Big Axe
        ctx.fillStyle = '#424242'; // Metal
        ctx.beginPath();
        ctx.moveTo(50, 40); ctx.lineTo(60, 20); ctx.lineTo(60, 50);
        ctx.fill();
        ctx.strokeStyle = '#8D6E63'; // Handle
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(48, 35); ctx.lineTo(48, 55); ctx.stroke();

        return c;
    }
};
