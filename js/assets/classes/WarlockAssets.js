export class WarlockAssets {
    static generateWarlock() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Robe (Dark Purple)
        ctx.fillStyle = '#4B0082';
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.lineTo(10, 60);
        ctx.lineTo(54, 60);
        ctx.fill();

        // Hood (Black/Darker)
        ctx.fillStyle = '#2e0050';
        ctx.beginPath();
        ctx.arc(32, 20, 12, Math.PI, 0); // Top half
        ctx.lineTo(32, 35);
        ctx.fill();

        // Hand holding magic
        ctx.fillStyle = '#0f0'; // Green glow
        ctx.beginPath();
        ctx.arc(48, 35, 5, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }

    static generatePoisonBolt() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Green blob
        ctx.fillStyle = '#32CD32';
        ctx.beginPath();
        ctx.arc(16, 16, 8, 0, Math.PI * 2);
        ctx.fill();

        // Bubbles
        ctx.fillStyle = '#98FB98';
        ctx.beginPath();
        ctx.arc(12, 12, 3, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }
}
