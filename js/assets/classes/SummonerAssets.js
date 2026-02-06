export const SummonerAssets = {
    // --- PLAYERS ---
    generateNecromancer() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Aura (Green Haze)
        const gradient = ctx.createRadialGradient(32, 32, 10, 32, 32, 30);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        // Robes (Midnight Blue / Black)
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(20, 25, 24, 39);

        // Tabard / Runes (Green)
        ctx.fillStyle = '#104d10'; // Dark Green
        ctx.fillRect(28, 25, 8, 39);

        // Shoulders (Bone/Spikes)
        ctx.fillStyle = '#bdc3c7'; // Bone white
        ctx.beginPath();
        ctx.moveTo(16, 25);
        ctx.lineTo(22, 20); // Left Spike
        ctx.lineTo(24, 25);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(48, 25);
        ctx.lineTo(42, 20); // Right Spike
        ctx.lineTo(40, 25);
        ctx.fill();

        // Head (Hood - Rounder, not pointy)
        ctx.fillStyle = '#0f0f1b'; // Darker
        ctx.beginPath();
        ctx.arc(32, 18, 11, Math.PI, 0); // Top
        ctx.lineTo(43, 35);
        ctx.lineTo(21, 35);
        ctx.fill();

        // Face Shadow
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(32, 22, 7, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (Vibrant Neon Green)
        ctx.fillStyle = '#00ff00';
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 5;
        ctx.fillRect(29, 21, 2, 2);
        ctx.fillRect(33, 21, 2, 2);
        ctx.shadowBlur = 0; // Reset

        // Staff (Detailed Bone Staff)
        ctx.strokeStyle = '#D3D3D3';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 10);
        ctx.lineTo(50, 60);
        ctx.stroke();

        // Staff Head (Green Orb)
        ctx.fillStyle = '#32CD32'; // Lime Green
        ctx.beginPath();
        ctx.arc(50, 10, 4, 0, Math.PI * 2);
        ctx.fill();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    },

    generateDruid() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Robes (Earth/Green)
        ctx.fillStyle = '#556B2F'; // Dark Olive Green
        ctx.fillRect(20, 20, 24, 42);

        // Cloak (Brown)
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(18, 20, 4, 35);
        ctx.fillRect(42, 20, 4, 35);

        // Head (Hood/Hair)
        ctx.fillStyle = '#556B2F';
        ctx.beginPath();
        ctx.arc(32, 18, 10, 0, Math.PI * 2);
        ctx.fill();

        // Face
        ctx.fillStyle = '#E0AC69';
        ctx.beginPath();
        ctx.arc(32, 20, 7, 0, Math.PI, false);
        ctx.fill();

        // Antlers/Horns
        ctx.strokeStyle = '#D2B48C'; // Tan
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(25, 12);
        ctx.lineTo(20, 5); // Left Antler
        ctx.moveTo(39, 12);
        ctx.lineTo(44, 5); // Right Antler
        ctx.stroke();

        // Staff (Wood)
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(16, 15);
        ctx.lineTo(16, 60);
        ctx.stroke();

        // Leaf on Staff
        ctx.fillStyle = '#32CD32';
        ctx.beginPath();
        ctx.arc(16, 12, 4, 0, Math.PI * 2);
        ctx.fill();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    },

    // --- MINIONS ---
    generateSkeleton() {
        const canvas = document.createElement('canvas');
        canvas.width = 48; // Smaller than player
        canvas.height = 48;
        const ctx = canvas.getContext('2d');

        // Bones (White/Grey)
        ctx.strokeStyle = '#DDD';
        ctx.lineWidth = 2;

        // Spine
        ctx.beginPath();
        ctx.moveTo(24, 20);
        ctx.lineTo(24, 35);
        ctx.stroke();

        // Ribs
        ctx.beginPath();
        ctx.moveTo(20, 24); ctx.lineTo(28, 24);
        ctx.moveTo(20, 28); ctx.lineTo(28, 28);
        ctx.moveTo(20, 32); ctx.lineTo(28, 32);
        ctx.stroke();

        // Arms
        ctx.beginPath();
        ctx.moveTo(20, 24); ctx.lineTo(14, 30); // Left
        ctx.moveTo(28, 24); ctx.lineTo(34, 30); // Right
        ctx.stroke();

        // Legs
        ctx.beginPath();
        ctx.moveTo(24, 35); ctx.lineTo(20, 44); // Left
        ctx.moveTo(24, 35); ctx.lineTo(28, 44); // Right
        ctx.stroke();

        // Skull
        ctx.fillStyle = '#EEE';
        ctx.beginPath();
        ctx.arc(24, 16, 6, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = 'black';
        ctx.fillRect(22, 14, 1, 1);
        ctx.fillRect(25, 14, 1, 1);

        // Sword (Rusty)
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(34, 30);
        ctx.lineTo(42, 22);
        ctx.stroke();
        ctx.strokeStyle = '#654321'; // Handle
        ctx.beginPath();
        ctx.moveTo(34, 30);
        ctx.lineTo(32, 32);
        ctx.stroke();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    },

    generateBear() {
        const canvas = document.createElement('canvas');
        canvas.width = 64; // Big
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Body (Brown)
        ctx.fillStyle = '#8B4513'; // SaddleBrown
        ctx.beginPath();
        ctx.ellipse(32, 36, 18, 14, 0, 0, Math.PI * 2); // Chunky body
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.arc(32, 22, 10, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.beginPath();
        ctx.arc(24, 16, 3, 0, Math.PI * 2);
        ctx.arc(40, 16, 3, 0, Math.PI * 2);
        ctx.fill();

        // Legs (Stumpy)
        ctx.fillRect(18, 40, 6, 12);
        ctx.fillRect(40, 40, 6, 12);
        ctx.fillRect(20, 42, 6, 12); // Back legs visual trick
        ctx.fillRect(38, 42, 6, 12);

        // Claws
        ctx.fillStyle = '#EEE';
        ctx.fillRect(18, 52, 2, 2);
        ctx.fillRect(22, 52, 2, 2);
        ctx.fillRect(40, 52, 2, 2);
        ctx.fillRect(44, 52, 2, 2);

        // Face
        ctx.fillStyle = 'black';
        ctx.fillRect(29, 20, 2, 2); // Eye
        ctx.fillRect(33, 20, 2, 2); // Eye
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(32, 26, 3, 0, Math.PI * 2); // Nose
        ctx.fill();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    }
};
