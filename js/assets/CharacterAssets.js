export class CharacterAssets {
    static generateWarrior() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cloak (Behind)
        ctx.fillStyle = '#800000';
        ctx.fillRect(20, 20, 24, 34);

        // Armor (Body)
        const gradient = ctx.createLinearGradient(0, 0, 64, 64);
        gradient.addColorStop(0, '#ccc');
        gradient.addColorStop(1, '#999');
        ctx.fillStyle = gradient;
        ctx.fillRect(20, 20, 24, 30);
        ctx.strokeStyle = '#555';
        ctx.strokeRect(20, 20, 24, 30);

        // Helmet
        ctx.fillStyle = '#777';
        ctx.fillRect(20, 8, 24, 14);
        // Helmet plume
        ctx.fillStyle = 'red';
        ctx.fillRect(28, 2, 8, 6);

        // Face area
        ctx.fillStyle = '#f5c6a5';
        ctx.fillRect(24, 14, 16, 6);
        // Eyes
        ctx.fillStyle = 'black';
        ctx.fillRect(26, 16, 2, 2);
        ctx.fillRect(36, 16, 2, 2);

        // Sword (Right Hand)
        ctx.fillStyle = '#bbb';
        ctx.fillRect(48, 10, 6, 30);
        ctx.fillStyle = '#5c3a21'; // Grip
        ctx.fillRect(46, 36, 10, 4);
        ctx.fillStyle = 'gold'; // Pommel
        ctx.fillRect(47, 40, 8, 6);

        // Shield (Left Hand)
        ctx.fillStyle = '#3a4a5c';
        ctx.beginPath();
        ctx.arc(14, 34, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d4af37'; // Gold rim
        ctx.lineWidth = 2;
        ctx.stroke();

        return canvas;
    }

    static generateMage() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Robe (Blue/Purple)
        ctx.fillStyle = '#4B0082'; // Indigo
        ctx.beginPath();
        ctx.moveTo(32, 10);
        ctx.lineTo(50, 60);
        ctx.lineTo(14, 60);
        ctx.fill();

        // Hat
        ctx.fillStyle = '#4B0082';
        ctx.beginPath();
        ctx.moveTo(20, 18);
        ctx.lineTo(44, 18);
        ctx.lineTo(32, 2);
        ctx.fill();

        // Staff
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(50, 60);
        ctx.stroke();

        // Orb on staff
        ctx.fillStyle = '#00FFFF';
        ctx.beginPath();
        ctx.arc(50, 20, 4, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    }

    static generateArcher() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cloak (Green)
        ctx.fillStyle = '#2E8B57'; // SeaGreen
        ctx.fillRect(20, 20, 24, 34);

        // Leather Armor
        const gradient = ctx.createLinearGradient(0, 0, 64, 64);
        gradient.addColorStop(0, '#8B4513'); // SaddleBrown
        gradient.addColorStop(1, '#A0522D'); // Sienna
        ctx.fillStyle = gradient;
        ctx.fillRect(20, 20, 24, 30);
        ctx.strokeStyle = '#3E2723';
        ctx.strokeRect(20, 20, 24, 30);

        // Hood
        ctx.fillStyle = '#006400'; // DarkGreen
        ctx.beginPath();
        ctx.moveTo(20, 30);
        ctx.lineTo(32, 5);
        ctx.lineTo(44, 30);
        ctx.fill();

        // Face area
        ctx.fillStyle = '#f5c6a5';
        ctx.fillRect(24, 18, 16, 8);
        // Eyes
        ctx.fillStyle = 'black';
        ctx.fillRect(26, 20, 2, 2);
        ctx.fillRect(36, 20, 2, 2);

        // Bow (Left Hand)
        ctx.strokeStyle = '#D2691E'; // Chocolate
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(16, 32, 16, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        // Bow String
        ctx.strokeStyle = '#DDD';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(16, 16);
        ctx.lineTo(16, 48);
        ctx.stroke();

        return canvas;
    }

    static generateBarbarian() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // 1. Body (Muscular, Shirtless)
        ctx.fillStyle = '#d4a373'; // Tan skin
        // Torso
        ctx.fillRect(20, 20, 24, 25);
        // Arms (Thick & Visible)
        ctx.fillRect(12, 22, 8, 20); // Left arm
        ctx.fillRect(44, 22, 8, 20); // Right arm

        // Muscles detail/shading
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(31, 24, 2, 20); // Abs line
        ctx.fillRect(22, 30, 20, 2); // Pec line

        // 2. Loincloth (Tanguinha) & Boots
        ctx.fillStyle = '#5D4037'; // Leather brown
        ctx.beginPath();
        ctx.moveTo(20, 45);
        ctx.lineTo(44, 45);
        ctx.lineTo(32, 58); // Pointy end
        ctx.fill();

        // Belt
        ctx.fillStyle = '#3E2723'; // Darker belt
        ctx.fillRect(20, 42, 24, 4);
        // Skull Buckle
        ctx.fillStyle = '#ccc';
        ctx.fillRect(30, 42, 4, 4);

        // Boots
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(22, 50, 8, 12); // Left
        ctx.fillRect(34, 50, 8, 12); // Right

        // 3. Head & Face
        // Helmet Base
        ctx.fillStyle = '#546E7A'; // Blue-ish Steel
        ctx.beginPath();
        ctx.arc(32, 14, 11, Math.PI, 0); // Dome
        ctx.fill();
        ctx.fillRect(21, 14, 22, 6); // Band

        // Horns (Big)
        ctx.fillStyle = '#ECEFF1'; // Bone
        ctx.beginPath();
        // Left Horn
        ctx.moveTo(21, 16);
        ctx.quadraticCurveTo(8, 10, 10, 0);
        ctx.lineTo(14, 4);
        ctx.quadraticCurveTo(18, 12, 21, 16);
        // Right Horn
        ctx.moveTo(43, 16);
        ctx.quadraticCurveTo(56, 10, 54, 0);
        ctx.lineTo(50, 4);
        ctx.quadraticCurveTo(46, 12, 43, 16);
        ctx.fill();

        // Face Skin
        ctx.fillStyle = '#d4a373';
        ctx.fillRect(24, 20, 16, 10);

        // Beard (Black & bushy)
        ctx.fillStyle = '#212121';
        ctx.fillRect(24, 26, 16, 10); // Beard Main
        ctx.fillRect(22, 20, 2, 12); // Sideburns
        ctx.fillRect(40, 20, 2, 12);

        // Eyes (White furious dots)
        ctx.fillStyle = 'white';
        ctx.fillRect(26, 22, 3, 2);
        ctx.fillRect(35, 22, 3, 2);

        // 4. TWO Axes
        // Left Axe (Held in left hand)
        ctx.save();
        ctx.translate(16, 40); // Pivot at hand
        ctx.rotate(-Math.PI / 4); // Angle out
        ctx.fillStyle = '#8D6E63'; // Handle
        ctx.fillRect(-2, -10, 4, 24);
        ctx.fillStyle = '#CFD8DC'; // Blade
        ctx.beginPath();
        ctx.arc(0, -10, 8, 0, Math.PI, true);
        ctx.fill();
        ctx.restore();

        // Right Axe (Held in right hand)
        ctx.save();
        ctx.translate(48, 40); // Pivot at hand
        ctx.rotate(Math.PI / 4); // Angle out
        ctx.fillStyle = '#8D6E63'; // Handle
        ctx.fillRect(-2, -10, 4, 24);
        ctx.fillStyle = '#CFD8DC'; // Blade
        ctx.beginPath();
        ctx.arc(0, -10, 8, 0, Math.PI, true);
        ctx.fill();
        ctx.restore();

        return canvas;
    }

    static generateGunslinger() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(32, 58, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Duster Coat (Dark Blue/Grey)
        ctx.fillStyle = '#263238';
        ctx.fillRect(20, 20, 24, 32);
        // Coat tails
        ctx.fillRect(18, 50, 8, 8);
        ctx.fillRect(38, 50, 8, 8);

        // Vest
        ctx.fillStyle = '#37474F';
        ctx.fillRect(24, 22, 16, 20);

        // Scarf/Bandana (Red)
        ctx.fillStyle = '#D32F2F';
        ctx.fillRect(22, 20, 20, 6);

        // Head
        ctx.fillStyle = '#f5c6a5';
        ctx.fillRect(24, 12, 16, 10);

        // Hat (Cowboy - Wide Brim)
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(16, 12, 32, 4); // Brim
        ctx.fillRect(22, 4, 20, 8); // Top

        // Eyes (Determination)
        ctx.fillStyle = 'black';
        ctx.fillRect(26, 16, 2, 2);
        ctx.fillRect(36, 16, 2, 2);

        // Arms (Sleeves)
        ctx.fillStyle = '#263238';
        ctx.fillRect(12, 24, 8, 16); // Left
        ctx.fillRect(44, 24, 8, 16); // Right

        // Hands
        ctx.fillStyle = '#f5c6a5';
        ctx.fillRect(12, 40, 6, 6);
        ctx.fillRect(46, 40, 6, 6);

        // Dual Pistols
        // Left Gun
        ctx.fillStyle = '#CFD8DC'; // Silver barrel
        ctx.fillRect(4, 38, 10, 4);
        ctx.fillStyle = '#5D4037'; // Wooden Grip
        ctx.fillRect(10, 40, 4, 6);

        // Right Gun
        ctx.fillStyle = '#CFD8DC';
        ctx.fillRect(50, 38, 10, 4);
        ctx.fillStyle = '#5D4037'; // Grip
        ctx.fillRect(50, 40, 4, 6);

        return canvas;
    }

    static generateRat() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Body
        ctx.fillStyle = '#6e6e6e';
        ctx.beginPath();
        ctx.ellipse(32, 40, 14, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(44, 34, 8, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = '#eda2ae';
        ctx.beginPath();
        ctx.arc(42, 28, 4, 0, Math.PI * 2);
        ctx.arc(48, 28, 4, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.strokeStyle = '#eda2ae';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(20, 42);
        ctx.quadraticCurveTo(10, 50, 5, 40);
        ctx.stroke();

        return canvas;
    }
}
