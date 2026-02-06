export const RatAssets = {
    generateRat() {
        const c = document.createElement('canvas');
        c.width = 40;
        c.height = 30; // Slightly shorter
        const ctx = c.getContext('2d');

        // Body Gradient (Fur)
        const grd = ctx.createLinearGradient(10, 10, 30, 30);
        grd.addColorStop(0, '#5D4037'); // Brown
        grd.addColorStop(1, '#3E2723'); // Dark Brown
        ctx.fillStyle = grd;

        // Body Shape (Oval-ish)
        ctx.beginPath();
        ctx.ellipse(20, 15, 12, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head (Snout)
        ctx.beginPath();
        ctx.moveTo(30, 15);
        ctx.lineTo(40, 15); // Nose tip
        ctx.lineTo(30, 20);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#5D4037';
        ctx.ellipse(30, 15, 6, 6, 0, 0, Math.PI * 2); // Head base
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(30, 10); ctx.lineTo(42, 15); ctx.lineTo(30, 20); // Snout
        ctx.fill();

        // Ears (Round)
        ctx.fillStyle = '#8D6E63'; // Lighter ear
        ctx.beginPath(); ctx.arc(25, 8, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(32, 8, 4, 0, Math.PI * 2); ctx.fill();

        // Eyes (Red tiny)
        ctx.fillStyle = 'red';
        ctx.beginPath(); ctx.arc(36, 12, 1.5, 0, Math.PI * 2); ctx.fill();

        // Tail (Pinkish)
        ctx.strokeStyle = '#E57373';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(10, 15);
        ctx.quadraticCurveTo(0, 15, 0, 25);
        ctx.stroke();

        // Whiskers
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(42, 15); ctx.lineTo(48, 12);
        ctx.moveTo(42, 15); ctx.lineTo(48, 18);
        ctx.stroke();

        return c;
    }
};
