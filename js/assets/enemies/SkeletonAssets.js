export const SkeletonAssets = {
    generateSkeleton() {
        const c = document.createElement('canvas');
        c.width = 48;
        c.height = 48;
        const ctx = c.getContext('2d');

        // Bones Color
        ctx.fillStyle = '#ECEFF1'; // White-ish Grey

        // Skull
        ctx.beginPath();
        ctx.ellipse(24, 15, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Jaw holes / Cheekbones
        ctx.fillStyle = '#CFD8DC';
        ctx.beginPath(); ctx.arc(18, 18, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(30, 18, 2, 0, Math.PI * 2); ctx.fill();

        // Eye Sockets (Dark)
        ctx.fillStyle = '#263238';
        ctx.beginPath();
        ctx.ellipse(20, 15, 3, 4, -0.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath();
        ctx.ellipse(28, 15, 3, 4, 0.2, 0, Math.PI * 2); ctx.fill();

        // Spine
        ctx.strokeStyle = '#ECEFF1';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(24, 27); ctx.lineTo(24, 42); ctx.stroke();

        // Ribs
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(18, 30); ctx.lineTo(30, 30); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20, 34); ctx.lineTo(28, 34); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(22, 38); ctx.lineTo(26, 38); ctx.stroke();

        // Arms (Holding invisible bow?)
        ctx.strokeStyle = '#ECEFF1';
        ctx.beginPath(); ctx.moveTo(18, 30); ctx.lineTo(10, 38); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(30, 30); ctx.lineTo(38, 38); ctx.stroke();

        // Rusty Sword
        ctx.strokeStyle = '#546E7A';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(10, 38); ctx.lineTo(10, 20); ctx.stroke();
        ctx.fillStyle = '#455A64';
        ctx.fillRect(8, 36, 4, 2); // Guard

        return c;
    }
};
