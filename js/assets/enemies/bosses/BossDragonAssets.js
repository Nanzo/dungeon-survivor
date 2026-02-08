export const BossDragonAssets = {
    generateBossDragon() {
        const width = 288; // 3x 96
        const height = 288;
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 3;

        // --- Red Aura ---
        const gradient = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 120);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.7)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.scale(scale, scale);

        // --- Dragon Wings (Massive) ---
        ctx.fillStyle = '#8E0000'; // Darker Red Membrane
        ctx.beginPath();
        // Left Wing
        ctx.moveTo(48, 50);
        ctx.lineTo(0, 0); // Extended
        ctx.quadraticCurveTo(20, 50, 48, 65);
        // Right Wing
        ctx.moveTo(48, 50);
        ctx.lineTo(96, 0); // Extended
        ctx.quadraticCurveTo(76, 50, 48, 65);
        ctx.fill();

        // Bone structure
        ctx.strokeStyle = '#540000';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(48, 50); ctx.lineTo(0, 0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(48, 50); ctx.lineTo(96, 0); ctx.stroke();

        // Body (Black/Red Scales)
        ctx.fillStyle = '#B71C1C';
        ctx.beginPath();
        ctx.ellipse(48, 60, 18, 25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.strokeStyle = '#B71C1C';
        ctx.lineWidth = 10;
        ctx.beginPath(); ctx.moveTo(48, 70); ctx.quadraticCurveTo(10, 90, 48, 95); ctx.stroke(); // Larger sweep
        // Tail Spikes
        ctx.fillStyle = 'gold'; // Gold tips
        ctx.beginPath(); ctx.moveTo(48, 95); ctx.lineTo(44, 98); ctx.lineTo(52, 98); ctx.fill();

        // Neck
        ctx.strokeStyle = '#B71C1C';
        ctx.lineWidth = 12;
        ctx.beginPath(); ctx.moveTo(48, 50); ctx.lineTo(48, 25); ctx.stroke();

        // Head
        ctx.fillStyle = '#D50000';
        ctx.beginPath();
        ctx.moveTo(48, 25);
        ctx.lineTo(60, 15); // Snout
        ctx.lineTo(48, 5); // Top head
        ctx.lineTo(36, 15); // Back head
        ctx.fill();

        // Horns (Golden Crown-like)
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(38, 12); ctx.lineTo(30, 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(48, 8); ctx.lineTo(48, 0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(58, 12); ctx.lineTo(66, 2); ctx.stroke();

        // Eyes (Fiery)
        ctx.fillStyle = '#FFEB3B';
        ctx.shadowColor = 'orange';
        ctx.shadowBlur = 5;
        ctx.beginPath(); ctx.arc(52, 16, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Breath (Fire Particle Hint)
        ctx.fillStyle = 'rgba(255, 87, 34, 0.6)'; // Orange fire
        ctx.beginPath(); ctx.arc(65, 18, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255, 235, 59, 0.6)'; // Yellow core
        ctx.beginPath(); ctx.arc(63, 17, 3, 0, Math.PI * 2); ctx.fill();

        ctx.restore();

        return c;
    }
};
