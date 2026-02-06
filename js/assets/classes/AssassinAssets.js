
export class AssassinAssets {
    static generateAssassin() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 18, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // 1. Cloak (Dark Grey/Black)
        ctx.fillStyle = '#212121'; // Almost black
        // Body (Slimmer)
        ctx.fillRect(24, 20, 16, 35);

        // 2. Head
        ctx.fillStyle = '#424242'; // Dark Grey Hood
        ctx.beginPath();
        ctx.arc(32, 20, 12, Math.PI, 0); // Top of hood
        ctx.lineTo(44, 30);
        ctx.lineTo(20, 30);
        ctx.fill();

        // Face Shadow (Hidden)
        ctx.fillStyle = '#000000';
        ctx.fillRect(26, 18, 12, 10);

        // Eyes (Red glowing dots)
        ctx.fillStyle = '#D50000';
        ctx.fillRect(28, 22, 2, 2);
        ctx.fillRect(34, 22, 2, 2);

        // 3. Arms / Daggers
        ctx.fillStyle = '#212121';
        ctx.fillRect(16, 25, 8, 15); // Left Arm
        ctx.fillRect(40, 25, 8, 15); // Right Arm

        // Daggers
        ctx.fillStyle = '#E0E0E0'; // Steel
        // Left Dagger
        ctx.beginPath();
        ctx.moveTo(18, 40);
        ctx.lineTo(22, 40);
        ctx.lineTo(20, 55); // Point down
        ctx.fill();
        // Right Dagger
        ctx.beginPath();
        ctx.moveTo(42, 40);
        ctx.lineTo(46, 40);
        ctx.lineTo(44, 55); // Point down
        ctx.fill();

        // Red tip (Poison/Blood?)
        ctx.fillStyle = '#B71C1C';
        ctx.fillRect(19, 50, 2, 5);
        ctx.fillRect(43, 50, 2, 5);

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

        // Dagger Blade
        ctx.fillStyle = '#BDBDBD'; // Silver
        ctx.beginPath();
        ctx.moveTo(14, 4);
        ctx.lineTo(18, 4);
        ctx.lineTo(16, 24); // Sharp point
        ctx.fill();

        // Handle
        ctx.fillStyle = '#3E2723'; // Dark Wood
        ctx.fillRect(13, 2, 6, 4);

        // Guard
        ctx.fillStyle = '#FFD700'; // Gold accent
        ctx.fillRect(10, 4, 12, 2);

        return canvas;
    }
}
