export class MageAssets {
    static generateMage() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // 1. Tunic (Dark Purple/Blue Mystic)
        ctx.fillStyle = '#311B92'; // Deep Purple
        // Robe Body
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.lineTo(52, 60);
        ctx.lineTo(12, 60);
        ctx.fill();

        // 2. Staff (Behind hand, but in front of body part)
        // Draw Shaft
        ctx.strokeStyle = '#5D4037'; // Wood
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(52, 15);
        ctx.lineTo(52, 60);
        ctx.stroke();
        // Crystal/Gem
        ctx.fillStyle = '#00E5FF'; // Cyan Glowing Gem
        ctx.beginPath();
        ctx.arc(52, 15, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillRect(50, 13, 2, 2); // Shine

        // 3. Head & Face
        // Face (Pale/Old)
        ctx.fillStyle = '#FFCCBC';
        ctx.fillRect(26, 16, 12, 12);

        // Beard (Long White) - The defining feature!
        ctx.fillStyle = '#F5F5F5'; // White/Grey
        ctx.beginPath();
        ctx.moveTo(26, 22);
        ctx.lineTo(38, 22);
        ctx.lineTo(32, 42); // Long pointy beard
        ctx.fill();

        // Eyes (Small, under hood shadow)
        ctx.fillStyle = '#1A237E'; // Shadowy eye sockets
        ctx.fillRect(27, 20, 3, 2);
        ctx.fillRect(34, 20, 3, 2);

        // Hood (Casting shadow)
        ctx.fillStyle = '#311B92'; // Same as tunic
        ctx.beginPath();
        // Hood shape
        ctx.moveTo(22, 28); // Neck left
        ctx.quadraticCurveTo(20, 4, 32, 4); // Top curve
        ctx.quadraticCurveTo(44, 4, 42, 28); // Neck right
        ctx.lineTo(32, 16); // Point down over forehead
        ctx.fill();

        // Arms (Sleeves)
        ctx.fillStyle = '#4527A0'; // Slightly lighter purple
        ctx.fillRect(16, 24, 8, 20); // Left Arm
        ctx.fillRect(40, 24, 8, 20); // Right Arm (holding staff)

        // Hands
        ctx.fillStyle = '#FFCCBC';
        ctx.fillRect(16, 40, 6, 6); // Left Hand
        ctx.fillRect(48, 30, 8, 6); // Right Hand (Holding staff higher up)

        return canvas;
    }

    static generateFireball() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(16, 16, 2, 16, 16, 16);
        gradient.addColorStop(0, 'yellow');
        gradient.addColorStop(0.5, 'orange');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }
}
