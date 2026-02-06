export class WarlockAssets {
    static generateWarlock() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow/Aura
        ctx.fillStyle = 'rgba(75, 0, 130, 0.4)';
        ctx.beginPath();
        ctx.arc(32, 40, 25, 0, Math.PI * 2);
        ctx.fill();

        // Robe Body (Dark Purple)
        ctx.fillStyle = '#2a0a3b';
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.lineTo(12, 60);
        ctx.lineTo(52, 60);
        ctx.fill();

        // Robe Trim (Gold/Dark)
        ctx.strokeStyle = '#4B0082';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.lineTo(32, 60);
        ctx.stroke();

        // Hood (Black)
        ctx.fillStyle = '#1a0525';
        ctx.beginPath();
        ctx.arc(32, 20, 14, Math.PI, 0); // Top
        ctx.lineTo(18, 20);
        ctx.lineTo(32, 38); // Point down
        ctx.lineTo(46, 20);
        ctx.fill();

        // Face (Shadow)
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(32, 22, 8, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Eyes (Green)
        ctx.fillStyle = '#0f0';
        ctx.shadowColor = '#0f0';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(29, 22, 2, 0, Math.PI * 2); // Left
        ctx.arc(35, 22, 2, 0, Math.PI * 2); // Right
        ctx.fill();
        ctx.shadowBlur = 0;

        // Staff (Right Hand)
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(52, 20);
        ctx.lineTo(52, 60);
        ctx.stroke();

        // Staff Orb (Green Glow)
        ctx.fillStyle = '#0f0';
        ctx.shadowColor = '#0f0';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(52, 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        return canvas;
    }

    static generatePoisonBolt() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Glowing Core
        ctx.shadowColor = '#0f0';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#32CD32';
        ctx.beginPath();
        ctx.arc(16, 16, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Skull Shape (Vague)
        ctx.fillStyle = '#006400';
        ctx.beginPath();
        ctx.arc(16, 16, 4, 0, Math.PI * 2);
        ctx.fill();

        // Bubbles / Trail
        ctx.fillStyle = 'rgba(50, 205, 50, 0.6)';
        ctx.beginPath();
        ctx.arc(8, 16, 3, 0, Math.PI * 2);
        ctx.arc(12, 10, 2, 0, Math.PI * 2);
        ctx.arc(10, 22, 2, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }
}
