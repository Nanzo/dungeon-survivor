export class EnvironmentAssets {
    static generateTileset() {
        const tiles = {
            grass: EnvironmentAssets.createTile('grass'),
            water: EnvironmentAssets.createTile('water'),
            stone: EnvironmentAssets.createTile('stone')
        };
        return tiles;
    }

    static createTile(type) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        if (type === 'grass') {
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(0, 0, 64, 64);
            // Detail
            ctx.fillStyle = '#388E3C';
            for (let i = 0; i < 5; i++) {
                const x = Math.random() * 64;
                const y = Math.random() * 64;
                ctx.fillRect(x, y, 4, 4);
            }
        } else if (type === 'water') {
            ctx.fillStyle = '#2196F3';
            ctx.fillRect(0, 0, 64, 64);
            // Waves
            ctx.strokeStyle = '#64B5F6';
            ctx.beginPath();
            ctx.moveTo(10, 20);
            ctx.lineTo(30, 20);
            ctx.stroke();
        } else if (type === 'stone') {
            ctx.fillStyle = '#9E9E9E';
            ctx.fillRect(0, 0, 64, 64);
            // Cracks
            ctx.strokeStyle = '#616161';
            ctx.beginPath();
            ctx.moveTo(10, 10);
            ctx.lineTo(20, 30);
            ctx.stroke();
        }

        return canvas;
    }
}
