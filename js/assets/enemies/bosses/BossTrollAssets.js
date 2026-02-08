export const BossTrollAssets = {
    generateBossTroll() {
        const width = 192; // 3x 64
        const height = 192;
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 3;

        // --- Red Aura ---
        const gradient = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 100);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
        ctx.fill();

        /*
        // --- OLD BOSS TROLL (Backup) ---
        // (Code omitted)
        */

        // --- NEW FULL BODY BOSS TROLL (Redesign V2) ---
        ctx.save();
        ctx.translate(centerX - (40 * scale), centerY - (32 * scale));
        ctx.scale(scale, scale);

        // Palette
        const skinColor = '#546E7A'; // Blue-Grey (Base)
        const skinShadow = '#37474F'; // Darker
        const skinHighlight = '#78909C'; // Lighter
        const loinColor = '#3E2723';
        const beltColor = '#000';
        const boneColor = '#ECEFF1';
        const woodColor = '#4E342E';
        const stoneColor = '#90A4AE';

        // 1. Rear Leg (Right visual)
        ctx.fillStyle = skinShadow;
        ctx.beginPath();
        ctx.moveTo(45, 35);
        ctx.lineTo(55, 35);
        ctx.lineTo(52, 55); // Foot position
        ctx.lineTo(42, 55);
        ctx.fill();
        // Foot
        ctx.beginPath(); ctx.moveTo(42, 55); ctx.lineTo(54, 55); ctx.lineTo(56, 60); ctx.lineTo(40, 60); ctx.fill();

        // 2. Front Leg (Left visual)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(25, 35);
        ctx.lineTo(38, 35);
        ctx.lineTo(36, 55); // Foot position
        ctx.lineTo(22, 55);
        ctx.fill();
        // Knee highlight
        ctx.fillStyle = skinHighlight;
        ctx.beginPath(); ctx.arc(30, 42, 4, 0, Math.PI * 2); ctx.fill();
        // Foot
        ctx.fillStyle = skinColor;
        ctx.beginPath(); ctx.moveTo(22, 55); ctx.lineTo(38, 55); ctx.lineTo(40, 60); ctx.lineTo(20, 60); ctx.fill();
        // Toenails
        ctx.fillStyle = '#111';
        ctx.fillRect(20, 58, 3, 2); ctx.fillRect(26, 58, 3, 2); ctx.fillRect(32, 58, 3, 2);

        // 3. Loincloth
        ctx.fillStyle = loinColor;
        ctx.beginPath();
        ctx.moveTo(20, 35); ctx.lineTo(50, 35); ctx.lineTo(35, 50); ctx.fill();
        // Belt with Skulls
        ctx.fillStyle = beltColor;
        ctx.fillRect(20, 33, 30, 4);
        // Skull Buckle
        ctx.fillStyle = boneColor;
        ctx.beginPath(); ctx.arc(35, 35, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000';
        ctx.fillRect(34, 34, 1, 1); ctx.fillRect(36, 34, 1, 1);

        // 4. Torso (Hunched, Massive Chest)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(20, 35); // Hip L
        ctx.lineTo(50, 35); // Hip R
        ctx.lineTo(60, 15); // Shoulder R
        ctx.lineTo(10, 15); // Shoulder L
        ctx.fill();

        // Pectorals
        ctx.fillStyle = skinHighlight;
        ctx.beginPath(); ctx.arc(25, 22, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(45, 22, 8, 0, Math.PI * 2); ctx.fill();

        // Abs
        ctx.fillStyle = skinShadow;
        ctx.fillRect(30, 28, 4, 2); ctx.fillRect(36, 28, 4, 2);
        ctx.fillRect(30, 32, 4, 2); ctx.fillRect(36, 32, 4, 2);

        // 5. Head (Low, sunken into shoulders)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(35, 12, 10, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Jaw (Big underbite)
        ctx.beginPath();
        ctx.moveTo(28, 16); ctx.lineTo(42, 16); ctx.lineTo(40, 24); ctx.lineTo(30, 24); ctx.fill();

        // Tusks (Huge, sticking up)
        ctx.fillStyle = boneColor;
        ctx.beginPath(); ctx.moveTo(29, 18); ctx.lineTo(28, 10); ctx.lineTo(32, 18); ctx.fill(); // L
        ctx.beginPath(); ctx.moveTo(41, 18); ctx.lineTo(42, 10); ctx.lineTo(38, 18); ctx.fill(); // R

        // Eyes (Small, red)
        ctx.fillStyle = '#D50000';
        ctx.fillRect(30, 12, 2, 2); ctx.fillRect(38, 12, 2, 2);

        // Brow Ridge (Heavy)
        ctx.strokeStyle = skinShadow;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(28, 10); ctx.lineTo(42, 10); ctx.stroke();

        // 6. Arms

        // Right Arm (Background, straight down)
        ctx.fillStyle = skinShadow;
        ctx.fillRect(56, 15, 12, 25);
        ctx.beginPath(); ctx.arc(62, 40, 8, 0, Math.PI * 2); ctx.fill(); // Fist

        // Left Arm (Foreground, holding Giant Club)
        ctx.fillStyle = skinColor;
        // Shoulder
        ctx.beginPath(); ctx.arc(12, 16, 10, 0, Math.PI * 2); ctx.fill();
        // Bicep/Forearm (Angled out)
        ctx.save();
        ctx.translate(12, 16);
        ctx.rotate(-Math.PI / 6);
        ctx.fillRect(-6, 0, 12, 20); // Arm
        ctx.beginPath(); ctx.arc(0, 20, 8, 0, Math.PI * 2); ctx.fill(); // Hand

        // 7. Weapon: Giant Stone-Studded Club
        ctx.rotate(Math.PI / 2); // Perpendicular to arm
        ctx.translate(-5, 0); // Grip adjustment

        // Handle
        ctx.fillStyle = woodColor;
        ctx.fillRect(0, -2, 40, 6);

        // Club Head (Stone Block)
        ctx.fillStyle = stoneColor;
        ctx.beginPath();
        ctx.moveTo(25, -10); ctx.lineTo(55, -12);
        ctx.lineTo(58, 12); ctx.lineTo(28, 14);
        ctx.fill();

        // Cracks/Texture
        ctx.strokeStyle = '#546E7A';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(40, -5); ctx.stroke();

        // Spikes on Club
        ctx.fillStyle = boneColor;
        ctx.beginPath(); ctx.moveTo(28, -10); ctx.lineTo(26, -16); ctx.lineTo(34, -10); ctx.fill();
        ctx.beginPath(); ctx.moveTo(50, -12); ctx.lineTo(52, -18); ctx.lineTo(54, -12); ctx.fill();
        ctx.beginPath(); ctx.moveTo(40, 13); ctx.lineTo(42, 19); ctx.lineTo(46, 13); ctx.fill();

        ctx.restore();

        ctx.restore();

        return c;
    }
};
