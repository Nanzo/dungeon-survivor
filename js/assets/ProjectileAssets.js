export class ProjectileAssets {
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

    static generateArrow() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 10;
        const ctx = canvas.getContext('2d');

        // Shaft (Wood)
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(4, 4, 20, 2);

        // Arrowhead (Metal/Silver)
        ctx.fillStyle = '#B0BEC5'; // Silver
        ctx.beginPath();
        ctx.moveTo(28, 5);
        ctx.lineTo(24, 2);
        ctx.lineTo(24, 8);
        ctx.fill();
        ctx.strokeStyle = '#78909C';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fletching (White feathers)
        ctx.fillStyle = '#ECEFF1';
        ctx.beginPath();
        ctx.moveTo(4, 5);
        ctx.lineTo(0, 2);
        ctx.lineTo(0, 8);
        ctx.fill();

        return canvas;
    }

    static generateSword() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Rotate for projectile visual (pointing right)
        ctx.translate(16, 16);
        ctx.rotate(Math.PI / 4); // 45 degrees
        ctx.translate(-16, -16);

        // Blade
        ctx.fillStyle = '#CFD8DC'; // Light Silver
        ctx.fillRect(14, 4, 4, 18);
        ctx.strokeStyle = '#90A4AE';
        ctx.lineWidth = 1;
        ctx.strokeRect(14, 4, 4, 18);

        // Grid/Guard
        ctx.fillStyle = '#5D4037'; // Wood/Leather
        ctx.fillRect(10, 22, 12, 3);

        // Handle
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(14, 25, 4, 6);

        // Pommel
        ctx.fillStyle = '#FFD700'; // Gold
        ctx.beginPath();
        ctx.arc(16, 32, 2, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }

    static generateBullet() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');

        // Simple fast projectile
        ctx.fillStyle = '#FFD700'; // Gold casing/trail
        ctx.beginPath();
        ctx.arc(8, 8, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFF'; // Shine
        ctx.beginPath();
        ctx.arc(6, 6, 2, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }

    static generateAxe() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Center
        ctx.translate(16, 16);

        // Handle
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(-2, -10, 4, 20);

        // Blades (Double headed)
        ctx.fillStyle = '#B0BEC5';
        ctx.beginPath();
        // Left blade
        ctx.moveTo(-2, -6);
        ctx.quadraticCurveTo(-12, -10, -12, 0);
        ctx.quadraticCurveTo(-12, 10, -2, 6);
        // Right blade
        ctx.moveTo(2, -6);
        ctx.quadraticCurveTo(12, -10, 12, 0);
        ctx.quadraticCurveTo(12, 10, 2, 6);
        ctx.fill();

        return canvas;
    }
}
