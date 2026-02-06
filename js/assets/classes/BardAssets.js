export const BardAssets = {
    generateBard() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Cape/Cloak (Behind)
        ctx.fillStyle = '#4B0082'; // Indigo
        ctx.fillRect(20, 28, 24, 34);

        // Body (Chest)
        ctx.fillStyle = '#FFF'; // White shirt
        ctx.fillRect(22, 30, 20, 30);

        // Vest
        ctx.fillStyle = '#800080'; // Purple Vest
        ctx.beginPath();
        ctx.moveTo(22, 30);
        ctx.lineTo(32, 60);
        ctx.lineTo(42, 30);
        ctx.fill();

        // Pants (visible at bottom)
        ctx.fillStyle = '#333';
        ctx.fillRect(24, 55, 6, 8); // Left leg
        ctx.fillRect(34, 55, 6, 8); // Right leg

        // Head
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(32, 18, 9, 0, Math.PI * 2);
        ctx.fill();

        // Face
        ctx.fillStyle = '#333';
        ctx.beginPath(); // Smile/Singing
        ctx.arc(32, 20, 4, 0, Math.PI, false);
        ctx.stroke();

        // Stylish Hair (Blonde/Gold)
        ctx.fillStyle = '#DAA520';
        ctx.beginPath();
        ctx.arc(32, 16, 10, Math.PI, Math.PI * 2); // Top
        ctx.lineTo(44, 22); // Right flow
        ctx.lineTo(42, 14);
        ctx.lineTo(22, 14);
        ctx.lineTo(20, 22); // Left flow
        ctx.fill();

        // Hat (Beret with Feather)
        ctx.fillStyle = '#8A2BE2'; // BlueViolet
        ctx.beginPath();
        ctx.ellipse(32, 10, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // Feather
        ctx.fillStyle = '#FF4500'; // Red Feather
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.quadraticCurveTo(45, 0, 50, 5);
        ctx.lineTo(42, 12);
        ctx.fill();

        // LUTE (The Masterpiece)
        ctx.save();
        ctx.translate(26, 30);
        ctx.rotate(-Math.PI / 4); // Angled

        // Body
        ctx.fillStyle = '#8B4513'; // SaddleBrown
        ctx.beginPath();
        ctx.arc(10, 10, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#CD853F'; // Peru (Wood detail)
        ctx.beginPath();
        ctx.arc(10, 10, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#333'; // Sound hole
        ctx.beginPath();
        ctx.arc(10, 10, 3, 0, Math.PI * 2);
        ctx.fill();

        // Neck
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(8, -15, 4, 18);

        // Strings
        ctx.strokeStyle = '#EEE';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(9, -15);
        ctx.lineTo(9, 5);
        ctx.moveTo(11, -15);
        ctx.lineTo(11, 5);
        ctx.stroke();

        // Headstock (bent back)
        ctx.fillStyle = '#553311';
        ctx.fillRect(7, -20, 6, 5);

        ctx.restore();

        // Arms holding lute
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(28, 42, 4, 0, Math.PI * 2); // Left hand on neck
        ctx.fill();
        ctx.beginPath();
        ctx.arc(40, 48, 4, 0, Math.PI * 2); // Right hand strumming
        ctx.fill();


        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    },

    generateNoteProjectile() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Multi-colored notes
        const colors = ['#FF69B4', '#00BFFF', '#7B68EE'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        ctx.fillStyle = '#FF1493'; // Base Pink
        ctx.font = 'bold 28px "Segoe UI Symbol"'; // Use system font if possible, or standard serif
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Shadow/Glow
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#FF69B4'; // HotPink glow
        ctx.fillText('♫', 16, 16);

        // Stroke
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.strokeText('♫', 16, 16);

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    }
};
