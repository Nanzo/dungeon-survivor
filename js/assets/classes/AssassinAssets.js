
export class AssassinAssets {
    static generateAssassin() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Dynamic Pose: Crouched / Ready to strike

        // 1. Cloak (Midnight Blue/Black)
        ctx.fillStyle = '#212121';
        ctx.beginPath();
        // Flowing cape/coat
        ctx.moveTo(28, 20);
        ctx.bezierCurveTo(10, 40, 5, 50, 15, 58); // Left flow
        ctx.lineTo(49, 58);
        ctx.bezierCurveTo(55, 50, 50, 40, 36, 20); // Right flow
        ctx.fill();

        // 2. Armor/Body (Tight leather)
        ctx.fillStyle = '#424242'; // Dark Grey
        ctx.fillRect(26, 25, 12, 30);

        // Belt
        ctx.fillStyle = '#B71C1C'; // Red Sash
        ctx.fillRect(26, 40, 12, 4);

        // 3. Head (Deep Hood)
        ctx.fillStyle = '#212121';
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.quadraticCurveTo(45, 10, 42, 30); // Right side
        ctx.lineTo(32, 35); // Chin point
        ctx.lineTo(22, 30); // Left side
        ctx.quadraticCurveTo(19, 10, 32, 10); // Top
        ctx.fill();

        // Face Shadow
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(32, 22, 7, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (Glowing Red Slits)
        ctx.fillStyle = '#FF1744';
        ctx.shadowColor = '#FF1744';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(28, 20); ctx.lineTo(30, 22); ctx.lineTo(28, 22); ctx.fill(); // Left
        ctx.beginPath();
        ctx.moveTo(36, 20); ctx.lineTo(34, 22); ctx.lineTo(36, 22); ctx.fill(); // Right
        ctx.shadowBlur = 0;

        // 4. Arms & Dual Daggers (Reverse Grip)

        // Left Arm (Extended Side)
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(26, 28);
        ctx.lineTo(12, 35); // Elbow/Wrist
        ctx.stroke(); // Just kidding, fill rect
        ctx.fill();
        ctx.fillRect(12, 28, 14, 6); // Arm

        // Left Dagger (Reverse Grip - Pointing Back/Down)
        ctx.translate(12, 32);
        ctx.rotate(0.5); // Tilt
        ctx.fillStyle = '#CFD8DC'; // Blade
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-4, 15); // Point
        ctx.lineTo(4, 0);
        ctx.fill();
        ctx.fillStyle = '#5D4037'; // Handle
        ctx.fillRect(-2, -6, 4, 6);
        ctx.rotate(-0.5); // Reset
        ctx.translate(-12, -32);

        // Right Arm (Extended Side)
        ctx.fillStyle = '#333';
        ctx.fillRect(38, 28, 14, 6);

        // Right Dagger (Reverse Grip)
        ctx.translate(52, 32);
        ctx.rotate(-0.5); // Tilt
        ctx.fillStyle = '#CFD8DC'; // Blade
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(4, 15); // Point
        ctx.lineTo(-4, 0);
        ctx.fill();
        ctx.fillStyle = '#5D4037'; // Handle
        ctx.fillRect(-2, -6, 4, 6);
        ctx.rotate(0.5); // Reset
        ctx.translate(-52, -32);


        return canvas;
    }

    static generateDagger() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Rotate for projectile visual
        ctx.translate(16, 16);
        ctx.rotate(Math.PI / 4);
        ctx.translate(-16, -16);

        // Dagger Blade (Wicked Curved)
        ctx.fillStyle = '#B0BEC5'; // Silver
        ctx.beginPath();
        ctx.moveTo(14, 4);
        ctx.quadraticCurveTo(6, 15, 16, 28); // Curved edge
        ctx.quadraticCurveTo(26, 15, 18, 4);
        ctx.fill();

        // Blood Groove
        ctx.fillStyle = '#78909C';
        ctx.fillRect(15.5, 6, 1, 14);

        // Handle
        ctx.fillStyle = '#212121'; // Black Grip
        ctx.fillRect(13, 2, 6, 4);

        // Pommel
        ctx.fillStyle = '#B71C1C'; // Red Gem
        ctx.beginPath();
        ctx.arc(16, 2, 2, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }
}
