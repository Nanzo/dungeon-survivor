export const ClericAssets = {
    generateCleric() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Body (Robe)
        ctx.fillStyle = '#EEE'; // White
        ctx.fillRect(20, 30, 24, 30);

        // Head
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(32, 20, 10, 0, Math.PI * 2);
        ctx.fill();

        // Hat / Halo equivalent (Gold Band)
        ctx.strokeStyle = 'gold';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(32, 16, 12, 0, Math.PI * 2);
        ctx.stroke();

        // Staff
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(46, 25);
        ctx.lineTo(46, 60);
        ctx.stroke();

        // Staff Gem
        ctx.fillStyle = 'cyan';
        ctx.beginPath();
        ctx.arc(46, 22, 5, 0, Math.PI * 2);
        ctx.fill();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    },

    generateHolyBolt() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Glowing Ball
        ctx.fillStyle = '#FFFFE0'; // Light Yellow
        ctx.beginPath();
        ctx.arc(16, 16, 8, 0, Math.PI * 2);
        ctx.fill();

        // Aura
        ctx.strokeStyle = 'gold';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(16, 16, 12, 0, Math.PI * 2);
        ctx.stroke();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    }
};
