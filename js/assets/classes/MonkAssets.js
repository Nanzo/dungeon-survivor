export const MonkAssets = {
    generateMonk() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Robes (Saffron/Orange)
        ctx.fillStyle = '#FF8C00'; // DarkOrange
        ctx.fillRect(20, 28, 24, 34);

        // Sash / Belt
        ctx.fillStyle = '#8B0000'; // DarkRed
        ctx.fillRect(20, 45, 24, 6);

        // Pants (visible at bottom)
        ctx.fillStyle = '#333';
        ctx.fillRect(24, 55, 6, 8); // Left leg
        ctx.fillRect(34, 55, 6, 8); // Right leg

        // Head (Bald/Skin)
        ctx.fillStyle = '#E0AC69'; // Tanned Skin
        ctx.beginPath();
        ctx.arc(32, 18, 9, 0, Math.PI * 2);
        ctx.fill();

        // Face
        ctx.fillStyle = '#333';
        ctx.beginPath(); // Serious/Focused look
        // Straight line or slight frown
        ctx.moveTo(30, 22);
        ctx.lineTo(34, 22);
        ctx.stroke();

        // Eyebrows (Angry/Focused)
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(27, 15);
        ctx.lineTo(30, 17); // Slant down
        ctx.moveTo(37, 15);
        ctx.lineTo(34, 17); // Slant down
        ctx.stroke();

        // Eyes (Bandana or Focus?) -> Just eyes
        ctx.fillRect(28, 16, 2, 2);
        ctx.fillRect(34, 16, 2, 2);

        // Prayer Beads (Necklace)
        ctx.strokeStyle = '#8B4513';
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.arc(32, 28, 11, 0, Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);

        // Arms (Sleeveless/Muscular)
        ctx.fillStyle = '#E0AC69';
        ctx.fillRect(14, 28, 6, 20); // Left Arm
        ctx.fillRect(44, 28, 6, 20); // Right Arm

        // Hands (Fists)
        ctx.fillStyle = '#CD853F';
        ctx.beginPath();
        ctx.arc(17, 48, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(47, 48, 4, 0, Math.PI * 2);
        ctx.fill();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    },

    generateFistProjectile() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Fist Shape
        ctx.fillStyle = '#E0AC69'; // Skin
        ctx.beginPath();
        // Main fist block
        ctx.fillRect(6, 8, 16, 16);

        // Knuckles
        ctx.fillStyle = '#CD853F'; // Darker for knuckles
        ctx.beginPath();
        ctx.arc(8, 10, 3, 0, Math.PI * 2);
        ctx.arc(12, 9, 3, 0, Math.PI * 2);
        ctx.arc(16, 9, 3, 0, Math.PI * 2);
        ctx.arc(20, 10, 3, 0, Math.PI * 2);
        ctx.fill();

        // Thumb
        ctx.fillStyle = '#E0AC69';
        ctx.fillRect(8, 20, 12, 6);

        // Motion Lines
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(2, 10);
        ctx.lineTo(0, 22);
        ctx.stroke();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    }
};
