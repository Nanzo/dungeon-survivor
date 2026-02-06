import { EnvironmentAssets } from '../assets/environment/EnvironmentAssets.js';

export class Map {
    constructor(game) {
        this.game = game;
        this.tileSize = 64;
        this.chunkSize = 16; // 16x16 tiles per chunk
        this.chunks = new globalThis.Map();

        // Generate Assets
        console.log("[Map] Generating Tileset Assets...");
        this.tileImages = EnvironmentAssets.generateTileset();
    }

    getChunkHash(cx, cy) {
        return `${cx},${cy}`;
    }

    // Deterministic random for consistent terrain generation
    // Simple hash function for pseudo-random numbers based on position
    random(x, y) {
        const sin = Math.sin(x * 12.9898 + y * 78.233);
        const rand = sin * 43758.5453123;
        return rand - Math.floor(rand);
    }

    generateChunk(cx, cy) {
        // console.log(`[Map] Generating Chunk ${cx},${cy}`); // Too verbose for every chunk, but good if needed
        const chunk = [];
        for (let y = 0; y < this.chunkSize; y++) {
            for (let x = 0; x < this.chunkSize; x++) {
                // World coordinates for noise
                const wx = cx * this.chunkSize + x;
                const wy = cy * this.chunkSize + y;

                // Simple Perlin-ish noise approximation
                // 0: Grass, 1: Water, 2: Stone
                let r = this.random(wx, wy);

                // Add some coherence by mixing with neighbors (simplified for performance)
                // For now, pure random based on position is good enough for a basic infinite world

                // Safe zone around 0,0
                if (Math.abs(wx) < 5 && Math.abs(wy) < 5) {
                    chunk.push(0); // Always grass
                    continue;
                }

                let tile = 0; // Grass
                if (r < 0.03) tile = 1; // Water (3% chance)
                else if (r < 0.06) tile = 2; // Stone (3% chance)

                chunk.push(tile);
            }
        }
        return chunk;
    }

    getTile(x, y) {
        // Tile coordinates
        const tx = Math.floor(x / this.tileSize);
        const ty = Math.floor(y / this.tileSize);

        // Chunk coordinates
        const cx = Math.floor(tx / this.chunkSize);
        const cy = Math.floor(ty / this.chunkSize);

        const hash = this.getChunkHash(cx, cy);

        // Load or generate chunk
        if (!this.chunks.has(hash)) {
            this.chunks.set(hash, this.generateChunk(cx, cy));
        }

        const chunk = this.chunks.get(hash);

        // Local coordinates within chunk
        let lx = tx % this.chunkSize;
        let ly = ty % this.chunkSize;

        // Handle negative coordinates correctly
        if (lx < 0) lx += this.chunkSize;
        if (ly < 0) ly += this.chunkSize;

        const index = ly * this.chunkSize + lx;
        return chunk[index];
    }

    draw(ctx) {
        // Calculate visible range in world coordinates
        const startX = this.game.camera.x;
        const endX = startX + this.game.width;
        const startY = this.game.camera.y;
        const endY = startY + this.game.height;

        // Convert to tile coordinates
        const startTileX = Math.floor(startX / this.tileSize);
        const endTileX = Math.floor(endX / this.tileSize) + 1;
        const startTileY = Math.floor(startY / this.tileSize);
        const endTileY = Math.floor(endY / this.tileSize) + 1;

        for (let y = startTileY; y < endTileY; y++) {
            for (let x = startTileX; x < endTileX; x++) {
                const tile = this.getTile(x * this.tileSize, y * this.tileSize);

                let img = this.tileImages.grass;
                if (tile === 1) img = this.tileImages.water;
                else if (tile === 2) img = this.tileImages.stone;

                ctx.drawImage(img, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    isSolid(x, y) {
        const tile = this.getTile(x, y);
        // 1: Water, 2: Stone are solid
        return tile === 1 || tile === 2;
    }
}
