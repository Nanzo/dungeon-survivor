export class BarbarianAssets {
    static generateBarbarian() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // 1. Body (Muscular, Shirtless)
        ctx.fillStyle = '#d4a373'; // Tan skin
        // Torso
        ctx.fillRect(20, 20, 24, 25);
        // Arms (Thick & Visible)
        ctx.fillRect(12, 22, 8, 20); // Left arm
        ctx.fillRect(44, 22, 8, 20); // Right arm

        // Muscles detail/shading
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(31, 24, 2, 20); // Abs line
        ctx.fillRect(22, 30, 20, 2); // Pec line

        // 2. Loincloth (Tanguinha) & Boots
        ctx.fillStyle = '#5D4037'; // Leather brown
        ctx.beginPath();
        ctx.moveTo(20, 45);
        ctx.lineTo(44, 45);
        ctx.lineTo(32, 58); // Pointy end
        ctx.fill();

        // Belt
        ctx.fillStyle = '#3E2723'; // Darker belt
        ctx.fillRect(20, 42, 24, 4);
        // Skull Buckle
        ctx.fillStyle = '#ccc';
        ctx.fillRect(30, 42, 4, 4);

        // Boots
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(22, 50, 8, 12); // Left
        ctx.fillRect(34, 50, 8, 12); // Right

        // 3. Head & Face
        // Helmet Base
        ctx.fillStyle = '#546E7A'; // Blue-ish Steel
        ctx.beginPath();
        ctx.arc(32, 14, 11, Math.PI, 0); // Dome
        ctx.fill();
        ctx.fillRect(21, 14, 22, 6); // Band

        // Horns (Big)
        ctx.fillStyle = '#ECEFF1'; // Bone
        ctx.beginPath();
        // Left Horn
        ctx.moveTo(21, 16);
        ctx.quadraticCurveTo(8, 10, 10, 0);
        ctx.lineTo(14, 4);
        ctx.quadraticCurveTo(18, 12, 21, 16);
        // Right Horn
        ctx.moveTo(43, 16);
        ctx.quadraticCurveTo(56, 10, 54, 0);
        ctx.lineTo(50, 4);
        ctx.quadraticCurveTo(46, 12, 43, 16);
        ctx.fill();

        // Face Skin
        ctx.fillStyle = '#d4a373';
        ctx.fillRect(24, 20, 16, 10);

        // Beard (Black & bushy)
        ctx.fillStyle = '#212121';
        ctx.fillRect(24, 26, 16, 10); // Beard Main
        ctx.fillRect(22, 20, 2, 12); // Sideburns
        ctx.fillRect(40, 20, 2, 12);

        // Eyes (White furious dots)
        ctx.fillStyle = 'white';
        ctx.fillRect(26, 22, 3, 2);
        ctx.fillRect(35, 22, 3, 2);

        // 4. TWO Axes
        // Left Axe (Held in left hand)
        ctx.save();
        ctx.translate(16, 40); // Pivot at hand
        ctx.rotate(-Math.PI / 4); // Angle out
        ctx.fillStyle = '#8D6E63'; // Handle
        ctx.fillRect(-2, -10, 4, 24);
        ctx.fillStyle = '#CFD8DC'; // Blade
        ctx.beginPath();
        ctx.arc(0, -10, 8, 0, Math.PI, true);
        ctx.fill();
        ctx.restore();

        // Right Axe (Held in right hand)
        ctx.save();
        ctx.translate(48, 40); // Pivot at hand
        ctx.rotate(Math.PI / 4); // Angle out
        ctx.fillStyle = '#8D6E63'; // Handle
        ctx.fillRect(-2, -10, 4, 24);
        ctx.fillStyle = '#CFD8DC'; // Blade
        ctx.beginPath();
        ctx.arc(0, -10, 8, 0, Math.PI, true);
        ctx.fill();
        ctx.restore();

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
