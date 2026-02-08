export const BossGoblinAssets = {
    generateBossGoblin() {
        const width = 144; // 3x 48
        const height = 144; // 3x 48
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

        /*
        // --- OLD BOSS GOBLIN (Backup) ---
        // (Code omitted for brevity, keeping file clean)
        */

        // --- NEW FULL BODY BOSS GOBLIN (Redesign) ---
        ctx.save();
        ctx.translate(centerX - (32 * scale), centerY - (32 * scale));
        ctx.scale(scale, scale);

        // Palette
        const skinColor = '#2E7D32'; // Forest Green
        const skinShadow = '#1B5E20';
        const leatherColor = '#8D6E63'; // Light Leather (Brown)
        const leatherDark = '#5D4037';
        const goldColor = '#FFD700';
        const woodColor = '#4E342E';
        const spikeColor = '#ECEFF1';

        // 1. Body Shape (Hunched, Wide Stance)

        // Legs (Wide)
        ctx.fillStyle = skinColor;
        // Left Leg
        ctx.beginPath(); ctx.moveTo(20, 40); ctx.lineTo(16, 55); ctx.lineTo(26, 55); ctx.lineTo(28, 40); ctx.fill();
        // Right Leg
        ctx.beginPath(); ctx.moveTo(44, 40); ctx.lineTo(48, 55); ctx.lineTo(38, 55); ctx.lineTo(36, 40); ctx.fill();

        // Leather Boots (Simple wraps)
        ctx.fillStyle = leatherDark;
        ctx.fillRect(16, 50, 10, 5);
        ctx.fillRect(38, 50, 10, 5);

        // Loincloth (Light Leather)
        ctx.fillStyle = leatherColor;
        ctx.beginPath(); ctx.moveTo(16, 40); ctx.lineTo(48, 40); ctx.lineTo(32, 52); ctx.fill();

        // Torso (Inverted Triangle - Muscular)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(18, 25); ctx.lineTo(46, 25); // Shoulders
        ctx.lineTo(40, 42); ctx.lineTo(24, 42); // Waist
        ctx.fill();

        // Chest Armor (Leather Straps/Harness)
        ctx.fillStyle = leatherColor;
        // Cross straps
        ctx.beginPath(); ctx.moveTo(20, 25); ctx.lineTo(40, 42); ctx.lineTo(44, 42); ctx.lineTo(24, 25); ctx.fill();
        ctx.beginPath(); ctx.moveTo(44, 25); ctx.lineTo(24, 42); ctx.lineTo(20, 42); ctx.lineTo(40, 25); ctx.fill();
        // Central studs
        ctx.fillStyle = goldColor;
        ctx.beginPath(); ctx.arc(32, 34, 2, 0, Math.PI * 2); ctx.fill();

        // Arms (Long & Sinewy)
        ctx.fillStyle = skinColor;
        // Left Arm (Hanging down)
        ctx.beginPath(); ctx.moveTo(18, 26); ctx.lineTo(10, 36); ctx.lineTo(14, 36); ctx.lineTo(22, 28); ctx.fill();
        ctx.beginPath(); ctx.moveTo(10, 36); ctx.lineTo(8, 48); ctx.lineTo(14, 48); ctx.lineTo(14, 36); ctx.fill(); // Forearm

        // Right Arm (Raised holding Club)
        ctx.save();
        ctx.translate(46, 26);
        ctx.rotate(-Math.PI / 4);
        ctx.fillStyle = skinColor;
        ctx.fillRect(0, 0, 8, 20); // Arm
        ctx.fillStyle = leatherDark;
        ctx.fillRect(-1, 12, 10, 6); // Wristband
        ctx.restore();

        // Head (Menacing, Hunched forward)
        ctx.fillStyle = skinColor;
        // Jaw/Chin
        ctx.beginPath();
        ctx.moveTo(24, 30); ctx.lineTo(40, 30); ctx.lineTo(32, 38); ctx.fill();
        // Upper Head
        ctx.beginPath();
        ctx.arc(32, 24, 10, Math.PI, 0); // Top dome
        ctx.lineTo(44, 24); ctx.lineTo(44, 30); ctx.lineTo(20, 30); ctx.lineTo(20, 24);
        ctx.fill();

        // Ears (Long & Pointy)
        ctx.fillStyle = skinColor;
        ctx.beginPath(); ctx.moveTo(20, 24); ctx.lineTo(10, 18); ctx.lineTo(20, 28); ctx.fill(); // Left
        ctx.beginPath(); ctx.moveTo(44, 24); ctx.lineTo(54, 18); ctx.lineTo(44, 28); ctx.fill(); // Right

        // Earrings (Gold - Near Head)
        ctx.fillStyle = goldColor;
        ctx.beginPath(); ctx.arc(19, 23, 2.5, 0, Math.PI * 2); ctx.fill(); // Left
        ctx.beginPath(); ctx.arc(45, 23, 2.5, 0, Math.PI * 2); ctx.fill(); // Right

        // Face Details
        // Eyes (Red & Angry)
        ctx.fillStyle = '#D32F2F'; // Red Sclera
        ctx.beginPath(); ctx.moveTo(26, 24); ctx.lineTo(30, 26); ctx.lineTo(26, 28); ctx.fill();
        ctx.beginPath(); ctx.moveTo(38, 24); ctx.lineTo(34, 26); ctx.lineTo(38, 28); ctx.fill();
        // Pupils
        ctx.fillStyle = '#FFEB3B';
        ctx.fillRect(27, 26, 1, 1); ctx.fillRect(36, 26, 1, 1);

        // Mouth (Tooth filled)
        ctx.fillStyle = '#1B5E20';
        ctx.beginPath(); ctx.arc(32, 32, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#FFF'; // Teeth
        ctx.fillRect(30, 32, 1, 3); ctx.fillRect(33, 32, 1, 3);
        ctx.fillRect(31, 29, 1, 3);

        // Crown (Jagged Gold)
        ctx.fillStyle = goldColor;
        ctx.beginPath();
        ctx.moveTo(22, 18); ctx.lineTo(24, 12); ctx.lineTo(28, 18); ctx.lineTo(32, 10);
        ctx.lineTo(36, 18); ctx.lineTo(40, 12); ctx.lineTo(42, 18);
        ctx.lineTo(42, 22); ctx.lineTo(22, 22);
        ctx.fill();
        ctx.strokeStyle = '#F57F17';
        ctx.stroke();

        // Weapon: Spiked Club (In Right Hand)
        ctx.save();
        ctx.translate(56, 16); // Position relative to raised right hand
        ctx.rotate(-Math.PI / 4);

        // Handle
        ctx.fillStyle = woodColor;
        ctx.fillRect(-2, 0, 4, 10);

        // Club Head (Thick wood)
        ctx.beginPath();
        ctx.moveTo(-4, -20); ctx.lineTo(4, -20); ctx.lineTo(6, 0); ctx.lineTo(-6, 0);
        ctx.fill();

        // Spikes
        ctx.fillStyle = spikeColor;
        // Left Spikes
        ctx.beginPath(); ctx.moveTo(-5, -5); ctx.lineTo(-9, -7); ctx.lineTo(-5, -9); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-5, -15); ctx.lineTo(-10, -17); ctx.lineTo(-5, -19); ctx.fill();
        // Right Spikes
        ctx.beginPath(); ctx.moveTo(5, -5); ctx.lineTo(9, -7); ctx.lineTo(5, -9); ctx.fill();
        ctx.beginPath(); ctx.moveTo(5, -15); ctx.lineTo(10, -17); ctx.lineTo(5, -19); ctx.fill();
        // Top Spike
        ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(0, -25); ctx.lineTo(3, -20); ctx.fill();

        ctx.restore();

        ctx.restore();

        return c;
    }
};
