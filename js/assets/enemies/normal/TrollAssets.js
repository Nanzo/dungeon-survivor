export const TrollAssets = {
    generateTroll() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');

        /*
        // --- OLD BLOB TROLL (Backup) ---
        // (Code omitted)
        */

        // --- NEW FULL BODY TROLL (Redesign for Club) ---

        const skinColor = '#546E7A'; // Blue-Grey
        const skinShadow = '#37474F';
        const mohawkColor = '#E91E63'; // Punk Pink
        const tuskColor = '#FFF9C4';
        const woodColor = '#5D4037';

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 16, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // 1. Legs (Short & Thick)
        ctx.fillStyle = skinColor;
        ctx.fillRect(20, 40, 10, 16); // L
        ctx.fillRect(34, 40, 10, 16); // R

        // 2. Loincloth (Visible "Tanguinha")
        ctx.fillStyle = '#3E2723'; // Dark Brown Leather
        ctx.beginPath();
        ctx.moveTo(18, 40);
        ctx.lineTo(46, 40);
        ctx.lineTo(32, 54); // Pointy
        ctx.fill();
        // Belt
        ctx.fillStyle = '#4E342E';
        ctx.fillRect(18, 38, 28, 4);

        // 3. Torso (Big gut/chest)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(32, 32, 14, 16, 0, 0, Math.PI * 2);
        ctx.fill();

        // Warts on body
        ctx.fillStyle = skinShadow;
        ctx.beginPath(); ctx.arc(28, 30, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(36, 36, 1.5, 0, Math.PI * 2); ctx.fill();

        // 4. Arms
        ctx.fillStyle = skinColor;

        // Left Arm (Holding Club)
        ctx.save();
        ctx.translate(20, 26);
        ctx.rotate(Math.PI / 6); // Angled forward
        ctx.fillRect(-4, 0, 8, 18); // Bicep/Forearm
        ctx.restore();

        // Right Arm (Hanging)
        ctx.fillRect(40, 26, 8, 18);

        // 5. Head
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(32, 18, 10, 0, Math.PI * 2);
        ctx.fill();

        // (Mohawk removed by user request)
        /*
        // Mohawk
        ctx.fillStyle = mohawkColor;
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.quadraticCurveTo(20, 5, 26, 18); // Left curve
        ctx.lineTo(32, 18);
        ctx.lineTo(38, 18);
        ctx.quadraticCurveTo(44, 5, 32, 10); // Right curve
        ctx.fill();
        // Spikes on mohawk
        ctx.beginPath();
        ctx.moveTo(28, 8); ctx.lineTo(30, 0); ctx.lineTo(32, 8);
        ctx.moveTo(32, 8); ctx.lineTo(34, 0); ctx.lineTo(36, 8);
        ctx.fill();
        */

        // Add some hair sparsely or just bald?
        // Let's make him bald with some spots
        ctx.fillStyle = skinShadow;
        ctx.beginPath(); ctx.arc(32, 12, 1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(28, 14, 1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(36, 14, 1, 0, Math.PI * 2); ctx.fill();

        // Face Features
        // Big Nose
        ctx.fillStyle = '#78909C';
        ctx.beginPath(); ctx.arc(32, 20, 3, 0, Math.PI * 2); ctx.fill();

        // Eyes
        ctx.fillStyle = '#263238';
        ctx.beginPath(); ctx.arc(29, 16, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(35, 16, 1.5, 0, Math.PI * 2); ctx.fill();

        // Tusks (Protruding Up)
        ctx.fillStyle = tuskColor;
        ctx.beginPath(); ctx.moveTo(29, 24); ctx.lineTo(28, 18); ctx.lineTo(30, 24); ctx.fill();
        ctx.beginPath(); ctx.moveTo(35, 24); ctx.lineTo(36, 18); ctx.lineTo(34, 24); ctx.fill();

        // 6. Weapon: Wooden Club (Left Hand)
        ctx.save();
        ctx.translate(14, 38); // Near left hand
        ctx.rotate(-Math.PI / 4);

        // Handle
        ctx.fillStyle = '#4E342E';
        ctx.fillRect(0, 0, 4, 10);

        // Club Head (Thick wood)
        ctx.fillStyle = woodColor;
        ctx.beginPath();
        ctx.moveTo(-2, -15); ctx.lineTo(6, -15); // Top width
        ctx.lineTo(4, 0); ctx.lineTo(0, 0); // Bottom width
        ctx.fill();
        // Round top
        ctx.beginPath(); ctx.arc(2, -15, 4, Math.PI, 0); ctx.fill();

        ctx.restore();

        return c;
    }
};
