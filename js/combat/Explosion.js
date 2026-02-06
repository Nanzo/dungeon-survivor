export class Explosion {
    constructor(game, x, y, radius) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = 10; // Start small
        this.maxRadius = radius;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.lifeTime = 500; // 0.5 seconds
        this.timer = 0;
    }

    update(deltaTime) {
        this.timer += deltaTime;
        if (this.timer > this.lifeTime) {
            this.markedForDeletion = true;
        } else {
            // Expand quickly
            if (this.radius < this.maxRadius) {
                this.radius += deltaTime * 0.5;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 1 - (this.timer / this.lifeTime); // Fade out

        // Inner fire
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();

        // Outer rim
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();

        ctx.restore();
    }
}
