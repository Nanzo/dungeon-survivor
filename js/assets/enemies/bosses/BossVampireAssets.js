export const BossVampireAssets = {
    generateBossVampire() {
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

        ctx.save();
        // Centering logic: The original 48x48 sprite is drawn at 0,0. 
        // We want to scale it by 3, so effective size is 144x144.
        ctx.scale(scale, scale);

        // --- Original Vampire Drawing (Enhanced) ---
        // Cape (High Collar) - Darker for Boss
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.quadraticCurveTo(15, 30, 5, 45);
        ctx.lineTo(43, 45);
        ctx.quadraticCurveTo(33, 30, 38, 10);
        ctx.lineTo(24, 20);
        ctx.fill();

        // Blood Red Lining (Brighter)
        ctx.fillStyle = '#D50000';
        ctx.beginPath();
        ctx.moveTo(10, 10); ctx.lineTo(24, 20); ctx.lineTo(14, 25); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(38, 10); ctx.lineTo(24, 20); ctx.lineTo(34, 25); ctx.fill();

        // Face (Pale)
        ctx.fillStyle = '#FFEBEE';
        ctx.beginPath(); ctx.ellipse(24, 22, 8, 10, 0, 0, Math.PI * 2); ctx.fill();

        // Hair (Slick back)
        ctx.fillStyle = '#212121';
        ctx.beginPath();
        ctx.moveTo(16, 20);
        ctx.quadraticCurveTo(24, 10, 32, 20);
        ctx.lineTo(30, 14);
        ctx.quadraticCurveTo(24, 8, 18, 14);
        ctx.fill();

        // Eyes (Glowing Red)
        ctx.fillStyle = '#FF0000';
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 5;
        ctx.beginPath(); ctx.arc(22, 22, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(26, 22, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Fangs (Longer)
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.moveTo(22, 28); ctx.lineTo(22.5, 32); ctx.lineTo(23, 28); ctx.fill();
        ctx.beginPath(); ctx.moveTo(26, 28); ctx.lineTo(25.5, 32); ctx.lineTo(25, 28); ctx.fill();

        // Crown (Gold)
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(18, 14);
        ctx.lineTo(18, 8);
        ctx.lineTo(21, 12);
        ctx.lineTo(24, 6);
        ctx.lineTo(27, 12);
        ctx.lineTo(30, 8);
        ctx.lineTo(30, 14);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        return c;
    }
};
