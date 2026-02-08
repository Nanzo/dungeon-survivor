export const GoblinAssets = {
    generateGoblin() {
        const c = document.createElement('canvas');
        c.width = 64; // Increased from 48 to allow full body
        c.height = 64;
        const ctx = c.getContext('2d');

        /*
        // --- OLD HEAD-ONLY SPRITE (Backup) ---
        // Skin Gradient
        const grd = ctx.createRadialGradient(24, 24, 5, 24, 24, 20);
        grd.addColorStop(0, '#66BB6A'); // Light Green
        grd.addColorStop(1, '#2E7D32'); // Dark Green
        ctx.fillStyle = grd;

        // Head (Pointy Chin)
        ctx.beginPath();
        ctx.moveTo(14, 15);
        ctx.lineTo(34, 15); // Top
        ctx.lineTo(38, 25); // Cheek R
        ctx.lineTo(24, 38); // Chin
        ctx.lineTo(10, 25); // Cheek L
        ctx.closePath();
        ctx.fill();
        // ... (rest of old code omitted for brevity in comment)
        */

        // --- NEW FULL BODY SPRITE ---

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 14, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Colors
        const skinColor = '#1B5E20'; // Dark Green (High Contrast)
        const skinShadow = '#0D3311';
        const loinClothColor = '#5D4037'; // Brown

        // 1. Legs
        ctx.fillStyle = skinColor;
        // Left Leg
        ctx.fillRect(24, 40, 6, 14);
        // Right Leg
        ctx.fillRect(34, 40, 6, 14);

        // 2. Loincloth
        ctx.fillStyle = loinClothColor;
        ctx.beginPath();
        ctx.moveTo(22, 40);
        ctx.lineTo(42, 40);
        ctx.lineTo(32, 50);
        ctx.fill();

        // 3. Torso
        ctx.fillStyle = skinColor;
        ctx.fillRect(24, 24, 16, 18);

        // Muscle definition (Abs)
        ctx.fillStyle = skinShadow;
        ctx.fillRect(31, 26, 2, 12);

        // 4. Arms
        ctx.fillStyle = skinColor;
        // Left Arm (Holding Dagger)
        ctx.save();
        ctx.translate(24, 26);
        ctx.rotate(Math.PI / 8);
        ctx.fillRect(-4, 0, 4, 14); // Upper arm
        ctx.restore();

        // Right Arm
        ctx.save();
        ctx.translate(40, 26);
        ctx.rotate(-Math.PI / 8);
        ctx.fillRect(0, 0, 4, 14);
        ctx.restore();

        // 5. Head
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        // Pointy chin head shape
        ctx.moveTo(22, 24);
        ctx.lineTo(42, 24); // Jaw line top
        ctx.lineTo(44, 14); // Ear top R
        ctx.lineTo(32, 8);  // Top of head
        ctx.lineTo(20, 14); // Ear top L
        ctx.closePath();
        ctx.fill();

        // Chin/Jaw
        ctx.beginPath();
        ctx.moveTo(22, 24);
        ctx.lineTo(42, 24);
        ctx.lineTo(32, 32); // Chin
        ctx.fill();

        // Big Pointy Ears
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(20, 18); ctx.lineTo(10, 12); ctx.lineTo(20, 14); // Left
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(44, 18); ctx.lineTo(54, 12); ctx.lineTo(44, 14); // Right
        ctx.fill();

        // Earrings (Gold/Yellow) - Closer to head (Base of ears)
        ctx.fillStyle = '#FFD700';
        ctx.beginPath(); ctx.arc(18, 16, 2, 0, Math.PI * 2); ctx.fill(); // Left Earring (moved from 12, 16)
        ctx.beginPath(); ctx.arc(46, 16, 2, 0, Math.PI * 2); ctx.fill(); // Right Earring (moved from 52, 16)

        // Eyes (Yellow/Red - Mean)
        ctx.fillStyle = '#FFEB3B'; // Yellow Sclera
        ctx.beginPath();
        ctx.moveTo(26, 18); ctx.lineTo(30, 20); ctx.lineTo(26, 22); // Left eye triangle
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(38, 18); ctx.lineTo(34, 20); ctx.lineTo(38, 22); // Right eye triangle
        ctx.fill();

        // Pupils
        ctx.fillStyle = 'red';
        ctx.fillRect(27, 20, 1, 1);
        ctx.fillRect(36, 20, 1, 1);

        // 6. Dagger (In Left Hand - viewer's left, goblin's right)
        // Actually, let's put it in the "right" visual hand (x > 32)
        ctx.save();
        ctx.translate(44, 36); // Hand position
        ctx.rotate(-Math.PI / 4);

        // Handle
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(-2, -2, 4, 8);
        // Blade
        ctx.fillStyle = '#90A4AE';
        ctx.beginPath();
        ctx.moveTo(-2, -2);
        ctx.lineTo(0, -12); // Tip
        ctx.lineTo(2, -2);
        ctx.fill();

        // Rusty spots
        ctx.fillStyle = '#D84315';
        ctx.fillRect(-1, -8, 1, 1);

        ctx.restore();

        return c;
    }
};
