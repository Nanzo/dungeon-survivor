export const BossSkeletonAssets = {
    generateBossSkeleton() {
        const width = 144; // 3x 48
        const height = 144;
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 3;

        // --- Red Aura ---
        const gradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 70);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fill();

        // --- Draw Skeleton (Scaled) ---
        ctx.save();
        ctx.translate(centerX - (24 * scale), centerY - (13 * scale));
        ctx.scale(scale, scale);

        // Bones Color (Darker/Ancient)
        ctx.fillStyle = '#B0BEC5';

        // Skull
        ctx.beginPath();
        ctx.ellipse(24, 15, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Jaw holes / Cheekbones
        ctx.fillStyle = '#78909C';
        ctx.beginPath(); ctx.arc(18, 18, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(30, 18, 2, 0, Math.PI * 2); ctx.fill();

        // Eye Sockets (Glowing Red)
        ctx.fillStyle = '#FF0000';
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.ellipse(20, 15, 3, 4, -0.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath();
        ctx.ellipse(28, 15, 3, 4, 0.2, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Spine
        ctx.strokeStyle = '#B0BEC5';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(24, 27); ctx.lineTo(24, 42); ctx.stroke();

        // Ribs
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(18, 30); ctx.lineTo(30, 30); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20, 34); ctx.lineTo(28, 34); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(22, 38); ctx.lineTo(26, 38); ctx.stroke();

        // Arms (Holding Giant Sword)
        ctx.strokeStyle = '#B0BEC5';
        ctx.beginPath(); ctx.moveTo(18, 30); ctx.lineTo(10, 38); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(30, 30); ctx.lineTo(38, 38); ctx.stroke();

        // Ancient Sword (Much bigger)
        ctx.strokeStyle = '#455A64';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(10, 38); ctx.lineTo(10, 10); ctx.stroke();
        ctx.fillStyle = '#37474F';
        ctx.fillRect(8, 36, 6, 2); // Guard

        ctx.restore();

        // --- Crown (Golden) ---
        ctx.save();
        ctx.translate(centerX, centerY - (10 * scale));
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(-15, -10);
        ctx.lineTo(-5, -5);
        ctx.lineTo(0, -15);
        ctx.lineTo(5, -5);
        ctx.lineTo(15, -10);
        ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        return c;
    }
};
