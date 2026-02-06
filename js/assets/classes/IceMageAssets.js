
export class IceMageAssets {
    static generateIceMage() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // 1. Tunic (Cyan/Ice Blue)
        ctx.fillStyle = '#00ACC1'; // Cyan
        // Robe Body
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.lineTo(52, 60);
        ctx.lineTo(12, 60);
        ctx.fill();

        // 2. Staff (Ice Crystal)
        ctx.strokeStyle = '#B0BEC5'; // Silver Wood
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(52, 15);
        ctx.lineTo(52, 60);
        ctx.stroke();

        // Ice Crystal Tip
        ctx.fillStyle = '#E0F7FA'; // White/Blue Ice
        ctx.beginPath();
        ctx.moveTo(52, 5);
        ctx.lineTo(56, 15);
        ctx.lineTo(52, 25);
        ctx.lineTo(48, 15);
        ctx.fill();

        // 3. Head & Face
        // Face
        ctx.fillStyle = '#E1F5FE'; // Pale skin
        ctx.fillRect(26, 16, 12, 12);

        // Hood (Darker Cyan)
        ctx.fillStyle = '#00838F';
        ctx.beginPath();
        ctx.moveTo(22, 28);
        ctx.quadraticCurveTo(20, 4, 32, 4);
        ctx.quadraticCurveTo(44, 4, 42, 28);
        ctx.lineTo(32, 16);
        ctx.fill();

        // Eyes (Glowing Blue)
        ctx.fillStyle = '#00E5FF';
        ctx.fillRect(27, 20, 3, 2);
        ctx.fillRect(34, 20, 3, 2);

        // Arms
        ctx.fillStyle = '#0097A7';
        ctx.fillRect(16, 24, 8, 20);
        ctx.fillRect(40, 24, 8, 20);

        // Hands
        ctx.fillStyle = '#E1F5FE';
        ctx.fillRect(16, 40, 6, 6);
        ctx.fillRect(48, 30, 8, 6);

        return canvas;
    }

    static generateIceShard() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Rotate for projectile visual (pointing right)
        ctx.translate(16, 16);
        ctx.rotate(Math.PI / 4);
        ctx.translate(-16, -16);

        // Shard Body
        ctx.fillStyle = '#E0F7FA'; // Ice White
        ctx.beginPath();
        ctx.moveTo(16, 4);
        ctx.lineTo(22, 16);
        ctx.lineTo(16, 28);
        ctx.lineTo(10, 16);
        ctx.fill();

        // Inner blue core
        ctx.fillStyle = '#4DD0E1';
        ctx.beginPath();
        ctx.moveTo(16, 8);
        ctx.lineTo(20, 16);
        ctx.lineTo(16, 24);
        ctx.lineTo(12, 16);
        ctx.fill();

        return canvas;
    }
}
