export const DragonAssets = {
    generateDragon() {
        const c = document.createElement('canvas');
        c.width = 96;
        c.height = 96;
        const ctx = c.getContext('2d');

        // Wings (Back)
        ctx.fillStyle = '#B71C1C'; // Red Membrane
        ctx.beginPath();
        // Left Wing
        ctx.moveTo(48, 50);
        ctx.lineTo(10, 10);
        ctx.quadraticCurveTo(20, 50, 48, 60);
        // Right Wing
        ctx.moveTo(48, 50);
        ctx.lineTo(86, 10);
        ctx.quadraticCurveTo(76, 50, 48, 60);
        ctx.fill();

        // Wing Arms/Bone
        ctx.strokeStyle = '#7F0000';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(48, 50); ctx.lineTo(10, 10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(48, 50); ctx.lineTo(86, 10); ctx.stroke();

        // Body (Serpentine curled)
        ctx.fillStyle = '#D32F2F'; // Bright Red
        ctx.beginPath();
        ctx.ellipse(48, 60, 15, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.strokeStyle = '#D32F2F';
        ctx.lineWidth = 8;
        ctx.beginPath(); ctx.moveTo(48, 70); ctx.quadraticCurveTo(20, 80, 48, 90); ctx.stroke();
        // Tail Tip (Spike)
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.moveTo(48, 90); ctx.lineTo(44, 94); ctx.lineTo(52, 94); ctx.fill();

        // Neck
        ctx.strokeStyle = '#D32F2F';
        ctx.lineWidth = 10;
        ctx.beginPath(); ctx.moveTo(48, 50); ctx.lineTo(48, 30); ctx.stroke();

        // Head
        ctx.fillStyle = '#B71C1C';
        ctx.beginPath();
        ctx.moveTo(48, 30);
        ctx.lineTo(58, 20); // Snout
        ctx.lineTo(48, 15); // Top head
        ctx.lineTo(38, 20); // Back head
        ctx.fill();

        // Horns
        ctx.strokeStyle = '#FFC107'; // Gold
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(40, 18); ctx.lineTo(35, 10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(48, 16); ctx.lineTo(48, 8); ctx.stroke();

        // Eye
        ctx.fillStyle = '#FFEB3B';
        ctx.beginPath(); ctx.arc(50, 22, 2, 0, Math.PI * 2); ctx.fill();

        // Smoke/Fire breath hint
        ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
        ctx.beginPath(); ctx.arc(62, 22, 4, 0, Math.PI * 2); ctx.fill();

        return c;
    }
};
