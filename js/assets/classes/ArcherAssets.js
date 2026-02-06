export class ArcherAssets {
    static generateArcher() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // 1. Cloak (Dark Green - Ranger style)
        ctx.fillStyle = '#1B5E20'; // Forest Green
        ctx.beginPath();
        ctx.moveTo(32, 5); // Neck
        ctx.lineTo(54, 55); // Right bottom
        ctx.lineTo(10, 55); // Left bottom
        ctx.fill();

        // 2. Leather Armor (Detailing)
        ctx.fillStyle = '#6D4C41'; // Leather
        ctx.fillRect(22, 20, 20, 30);
        // Chest straps
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(22, 24, 20, 4); // Strap across
        ctx.fillRect(22, 34, 20, 4); // Strap across

        // 3. Quiver (On back/shoulder)
        ctx.fillStyle = '#8D6E63';
        ctx.beginPath();
        ctx.moveTo(40, 10);
        ctx.lineTo(46, 10);
        ctx.lineTo(44, 40);
        ctx.lineTo(38, 40);
        ctx.fill();
        // Arrows in quiver
        ctx.fillStyle = '#ECEFF1'; // Feathers
        ctx.beginPath();
        ctx.arc(42, 8, 4, 0, Math.PI * 2);
        ctx.fill();

        // 4. Boots
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(24, 50, 6, 10); // Left
        ctx.fillRect(34, 50, 6, 10); // Right

        // 5. Head & Hood
        // Face
        ctx.fillStyle = '#f5c6a5';
        ctx.fillRect(24, 14, 16, 10);
        // Eyes (Focused)
        ctx.fillStyle = '#1B5E20'; // Green eyes
        ctx.fillRect(26, 18, 2, 2);
        ctx.fillRect(36, 18, 2, 2);
        // Hood (Deep, shadowing face)
        ctx.fillStyle = '#1B5E20'; // Forest Green
        ctx.beginPath();
        ctx.moveTo(20, 30);
        ctx.lineTo(32, 0); // Pointy top
        ctx.lineTo(44, 30);
        ctx.lineTo(32, 6); // Inner point
        ctx.fill();

        // 6. Recurve Bow (More detailed)
        ctx.strokeStyle = '#D7CCC8'; // Light Wood
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Fancy curve
        ctx.moveTo(12, 16);
        ctx.quadraticCurveTo(24, 32, 12, 48);
        ctx.stroke();
        // String
        ctx.strokeStyle = '#EEE';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(12, 16);
        ctx.lineTo(10, 32);
        ctx.lineTo(12, 48);
        ctx.stroke();

        // Arms (Holding bow)
        ctx.fillStyle = '#33691E'; // Armor sleeve
        ctx.fillRect(14, 26, 6, 16); // Left Arm (holding bow)
        ctx.fillRect(44, 24, 6, 20); // Right Arm

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
}
