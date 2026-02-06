export const BestiaryAssets = {
    // --- HELPERS ---
    createCanvas(w, h) {
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        return c;
    },

    // --- MONSTERS ---

    generateGoblin() {
        const c = this.createCanvas(40, 40);
        const ctx = c.getContext('2d');

        // Skin
        ctx.fillStyle = '#4CA64C'; // Green
        ctx.beginPath();
        ctx.arc(20, 20, 15, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.beginPath();
        ctx.moveTo(5, 15); ctx.lineTo(0, 10); ctx.lineTo(10, 20); // Left
        ctx.moveTo(35, 15); ctx.lineTo(40, 10); ctx.lineTo(30, 20); // Right
        ctx.fill();

        // Eyes (Yellow)
        ctx.fillStyle = 'yellow';
        ctx.beginPath(); ctx.arc(15, 18, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(25, 18, 3, 0, Math.PI * 2); ctx.fill();

        // Dagger
        ctx.fillStyle = '#ccc';
        ctx.fillRect(28, 25, 10, 3);

        return c;
    },

    generateOrc() {
        // Bigger Green Guy
        const c = this.createCanvas(50, 50);
        const ctx = c.getContext('2d');

        // Body
        ctx.fillStyle = '#2E7D32'; // Dark Green
        ctx.fillRect(10, 10, 30, 30);

        // Armor
        ctx.fillStyle = '#5D4037'; // Leather
        ctx.fillRect(10, 25, 30, 15);

        // Tusks
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(15, 25); ctx.lineTo(15, 15); ctx.lineTo(18, 25);
        ctx.moveTo(35, 25); ctx.lineTo(35, 15); ctx.lineTo(32, 25);
        ctx.fill();

        // Eyes (Red)
        ctx.fillStyle = 'red';
        ctx.fillRect(18, 15, 4, 4);
        ctx.fillRect(28, 15, 4, 4);

        return c;
    },

    generateSkeleton() {
        // Humanoid Bones
        const c = this.createCanvas(40, 40);
        const ctx = c.getContext('2d');

        // Skull
        ctx.fillStyle = '#eee';
        ctx.beginPath(); ctx.arc(20, 12, 10, 0, Math.PI * 2); ctx.fill();

        // Ribs
        ctx.fillRect(15, 22, 10, 12);

        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.arc(17, 12, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(23, 12, 2, 0, Math.PI * 2); ctx.fill();

        // Bow or Sword? Keeping generic.
        return c;
    },

    generateGhost() {
        const c = this.createCanvas(40, 40);
        const ctx = c.getContext('2d');

        ctx.globalAlpha = 0.6;
        ctx.fillStyle = '#E0F7FA'; // Cyan-ish white
        ctx.beginPath();
        ctx.arc(20, 15, 15, Math.PI, 0); // Head
        ctx.lineTo(35, 35);
        ctx.lineTo(30, 30);
        ctx.lineTo(25, 35);
        ctx.lineTo(20, 30);
        ctx.lineTo(15, 35);
        ctx.lineTo(10, 30);
        ctx.lineTo(5, 35);
        ctx.lineTo(5, 15);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Spooky Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.arc(15, 15, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(25, 15, 3, 0, Math.PI * 2); ctx.fill();

        return c;
    },

    generateTroll() {
        // Big Blue/Grey Regenerator
        const c = this.createCanvas(60, 60);
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#546E7A'; // Blue Grey
        ctx.fillRect(10, 10, 40, 40);

        // Mohawk
        ctx.fillStyle = '#E91E63'; // Pink Hair
        ctx.beginPath();
        ctx.moveTo(30, 10); ctx.lineTo(30, 0); ctx.lineTo(40, 10);
        ctx.fill();

        return c;
    },

    generateVampire() {
        const c = this.createCanvas(40, 40);
        const ctx = c.getContext('2d');

        // Cape
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(20, 5); ctx.lineTo(35, 35); ctx.lineTo(5, 35);
        ctx.fill();

        // Face
        ctx.fillStyle = '#FFCDD2'; // Pale
        ctx.beginPath(); ctx.arc(20, 15, 8, 0, Math.PI * 2); ctx.fill();

        // Red Eyes
        ctx.fillStyle = '#D32F2F';
        ctx.beginPath(); ctx.arc(18, 14, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(22, 14, 2, 0, Math.PI * 2); ctx.fill();

        return c;
    },

    generateBeholder() {
        // Eye tyrant
        const c = this.createCanvas(60, 60);
        const ctx = c.getContext('2d');

        // Main Body
        ctx.fillStyle = '#7B1FA2'; // Purple
        ctx.beginPath(); ctx.arc(30, 30, 20, 0, Math.PI * 2); ctx.fill();

        // Big Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(30, 30, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.arc(30, 30, 3, 0, Math.PI * 2); ctx.fill();

        // Tentacles
        ctx.strokeStyle = '#7B1FA2';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const ang = (i / 8) * Math.PI * 2;
            const x = 30 + Math.cos(ang) * 28;
            const y = 30 + Math.sin(ang) * 28;
            ctx.beginPath(); ctx.moveTo(30, 30); ctx.lineTo(x, y); ctx.stroke();
            // Small eyes
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
        }

        return c;
    },

    generateDragon() {
        // Big Red Boss
        const c = this.createCanvas(80, 80);
        const ctx = c.getContext('2d');

        // Wings
        ctx.fillStyle = '#B71C1C';
        ctx.beginPath();
        ctx.moveTo(40, 40); ctx.lineTo(10, 10); ctx.lineTo(10, 40); // Left
        ctx.moveTo(40, 40); ctx.lineTo(70, 10); ctx.lineTo(70, 40); // Right
        ctx.fill();

        // Body
        ctx.fillStyle = '#D32F2F';
        ctx.beginPath(); ctx.ellipse(40, 50, 15, 25, 0, 0, Math.PI * 2); ctx.fill();

        // Head
        ctx.beginPath();
        ctx.moveTo(35, 30); ctx.lineTo(45, 30); ctx.lineTo(40, 10);
        ctx.fill();

        return c;
    },

    generateHydra() {
        // Multi-headed Green
        const c = this.createCanvas(70, 70);
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#64DD17'; // Light Green

        // Body
        ctx.beginPath(); ctx.arc(35, 50, 15, 0, Math.PI * 2); ctx.fill();

        // Heads (3)
        const heads = [[20, 20], [35, 10], [50, 20]];
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#64DD17';

        heads.forEach(([hx, hy]) => {
            ctx.beginPath(); ctx.moveTo(35, 50); ctx.lineTo(hx, hy); ctx.stroke();
            ctx.beginPath(); ctx.arc(hx, hy, 8, 0, Math.PI * 2); ctx.fill();
            // Tongue
            ctx.fillStyle = 'red';
            ctx.fillRect(hx - 2, hy, 4, 10);
            ctx.fillStyle = '#64DD17'; // Reset
        });

        return c;
    }
};
