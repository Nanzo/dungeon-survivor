
export class ArcherAssets {
    static generateArcher() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Dynamic Pose: Aiming slightly forward

        // 1. Cape (Deep Forest Green, flowing back)
        ctx.fillStyle = '#1B5E20';
        ctx.beginPath();
        ctx.moveTo(28, 20); // Neck
        ctx.quadraticCurveTo(10, 40, 5, 50); // Flow left
        ctx.lineTo(40, 50);
        ctx.lineTo(36, 20);
        ctx.fill();

        // 2. Leather Armor (Detailed Tunic)
        ctx.fillStyle = '#5D4037'; // Dark Leather
        ctx.fillRect(24, 22, 16, 28);

        // Chest Belt
        ctx.fillStyle = '#3E2723';
        ctx.beginPath();
        ctx.moveTo(24, 22);
        ctx.lineTo(40, 35);
        ctx.lineTo(40, 38);
        ctx.lineTo(24, 25);
        ctx.fill();

        // 3. Quiver (Visible over shoulder)
        ctx.fillStyle = '#8D6E63';
        ctx.beginPath();
        ctx.moveTo(42, 15);
        ctx.lineTo(48, 15);
        ctx.lineTo(46, 35);
        ctx.lineTo(40, 35);
        ctx.fill();
        // Fletchings stick out
        ctx.fillStyle = '#ECEFF1';
        ctx.beginPath();
        ctx.arc(45, 13, 3, 0, Math.PI * 2);
        ctx.arc(43, 11, 3, 0, Math.PI * 2);
        ctx.fill();

        // 4. Head (Hooded Ranger)
        // Face
        ctx.fillStyle = '#FFCC80';
        ctx.fillRect(26, 15, 12, 10);

        // Mask/Scarf (Mystery)
        ctx.fillStyle = '#2E7D32';
        ctx.fillRect(26, 20, 12, 5);

        // Eyes (Sharp)
        ctx.fillStyle = '#111';
        ctx.fillRect(28, 18, 2, 2);
        ctx.fillRect(34, 18, 2, 2);

        // Hood
        ctx.fillStyle = '#1B5E20';
        ctx.beginPath();
        ctx.moveTo(20, 25);
        ctx.quadraticCurveTo(32, -5, 44, 25); // Pointy hood
        ctx.lineTo(32, 12); // Front dip
        ctx.fill();

        // 5. Longbow (Held vertically/diagonally)
        ctx.save();
        ctx.translate(20, 30);
        ctx.rotate(-0.2); // Slight tilt

        // Bow Limbs
        ctx.strokeStyle = '#D7CCC8'; // Light Wood
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 25, 1.5 * Math.PI, 0.5 * Math.PI, false); // C shape
        ctx.stroke();

        // String
        ctx.strokeStyle = '#EEE';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(0, 25);
        ctx.stroke();
        ctx.restore();

        // 6. Arms holding bow
        ctx.fillStyle = '#33691E';
        ctx.beginPath();
        ctx.arc(20, 32, 4, 0, Math.PI * 2); // Hand on bow
        ctx.fill();

        // Drawing hand
        ctx.fillStyle = '#FFCC80'; // Skin
        ctx.beginPath();
        ctx.arc(38, 30, 3, 0, Math.PI * 2); // Drawing string
        ctx.fill();


        return canvas;
    }

    static generateArrow() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 10;
        const ctx = canvas.getContext('2d');

        // Shaft
        ctx.fillStyle = '#5D4037'; // Oak
        ctx.fillRect(4, 4, 20, 2);

        // Head (Steel)
        ctx.fillStyle = '#CFD8DC';
        ctx.beginPath();
        ctx.moveTo(28, 5);
        ctx.lineTo(24, 2);
        ctx.lineTo(24, 8);
        ctx.fill();

        // Fletching (Green Ranger style)
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.moveTo(6, 5);
        ctx.lineTo(0, 1);
        ctx.lineTo(2, 5);
        ctx.lineTo(0, 9);
        ctx.fill();

        return canvas;
    }
}
