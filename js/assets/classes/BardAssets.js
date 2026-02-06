
export const BardAssets = {
    generateBard() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // 1. Cape (Flowing Magenta)
        ctx.fillStyle = '#8B008B'; // Dark Magenta
        ctx.beginPath();
        ctx.moveTo(20, 25);
        ctx.quadraticCurveTo(10, 45, 12, 58);
        ctx.lineTo(52, 58); // Cape bottom
        ctx.quadraticCurveTo(54, 45, 44, 25);
        ctx.fill();

        // 2. Body / Shirt (White silk)
        ctx.fillStyle = '#F8F8FF'; // GhostWhite
        ctx.fillRect(22, 28, 20, 30);

        // 3. Vest (Purple Velvet)
        ctx.fillStyle = '#4B0082'; // Indigo/Purple
        ctx.beginPath();
        ctx.moveTo(22, 28);
        ctx.lineTo(22, 58);
        ctx.lineTo(28, 58);
        ctx.lineTo(28, 48); // Vest opening
        ctx.lineTo(36, 48);
        ctx.lineTo(36, 58);
        ctx.lineTo(42, 58);
        ctx.lineTo(42, 28);
        ctx.fill();

        // Gold buttons
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(25, 35, 1, 0, Math.PI * 2);
        ctx.arc(25, 42, 1, 0, Math.PI * 2);
        ctx.arc(39, 35, 1, 0, Math.PI * 2);
        ctx.arc(39, 42, 1, 0, Math.PI * 2);
        ctx.fill();

        // 4. Head
        ctx.fillStyle = '#FFE0BD'; // Skin
        ctx.beginPath();
        ctx.arc(32, 20, 9, 0, Math.PI * 2);
        ctx.fill();

        // Face (Singing)
        ctx.strokeStyle = '#3E2723';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(32, 22, 3, 0, Math.PI, false); // Mouth open/singing
        ctx.stroke();

        // Eyes (Closed/Into the music)
        ctx.beginPath();
        ctx.moveTo(28, 18);
        ctx.lineTo(31, 18);
        ctx.moveTo(33, 18);
        ctx.lineTo(36, 18);
        ctx.stroke();

        // 5. Hat (Big Fabulous Feathered Cap)
        ctx.fillStyle = '#800080'; // Purple
        ctx.beginPath();
        ctx.ellipse(32, 14, 14, 6, 0, 0, Math.PI * 2); // Brim
        ctx.fill();
        ctx.beginPath();
        ctx.arc(32, 12, 8, Math.PI, Math.PI * 2); // Dome
        ctx.fill();

        // Feather (Huge Magenta Plume)
        ctx.fillStyle = '#FF00FF'; // Magenta
        ctx.beginPath();
        ctx.moveTo(40, 14);
        ctx.quadraticCurveTo(55, 5, 50, 20); // Curl down
        ctx.quadraticCurveTo(45, 18, 40, 14);
        ctx.fill();


        // 6. GUITAR / LUTE (Lowered to Body)
        ctx.save();
        ctx.translate(32, 42); // Centered on stomach
        ctx.rotate(-Math.PI / 6); // Slightly tilted up

        // Body
        ctx.fillStyle = '#8D6E63'; // Wood
        ctx.beginPath();
        ctx.ellipse(0, 5, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sound hole
        ctx.fillStyle = '#3E2723';
        ctx.beginPath();
        ctx.arc(0, 5, 4, 0, Math.PI * 2);
        ctx.fill();

        // Neck
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(-3, -15, 6, 20); // Going up

        // Headstock
        ctx.fillStyle = '#8D6E63';
        ctx.fillRect(-4, -20, 8, 6);

        // Strings
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-1, -20);
        ctx.lineTo(-1, 10);
        ctx.moveTo(1, -20);
        ctx.lineTo(1, 10);
        ctx.stroke();

        ctx.restore();

        // 7. Hands (Playing)
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(24, 38, 4, 0, Math.PI * 2); // Fret hand
        ctx.fill();
        ctx.beginPath();
        ctx.arc(42, 45, 4, 0, Math.PI * 2); // Strum hand
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
        const colors = ['#FF00FF', '#9400D3', '#FFFFFF']; // Magenta, Violet, White
        const color = colors[Math.floor(Math.random() * colors.length)];

        ctx.fillStyle = color;
        ctx.font = 'bold 26px "Arial"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fillText('♫', 16, 16);

        // Outline
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.strokeText('♫', 16, 16);

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    }
};
