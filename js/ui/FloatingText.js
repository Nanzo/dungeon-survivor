export class FloatingText {
    constructor(value, x, y, isCrit = false) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.markedForDeletion = false;
        this.timer = 0;
        this.lifeTime = 1000; // 1 second
        this.dy = -20; // Float up distance
        this.isCrit = isCrit;

        if (this.isCrit) {
            this.color = '#FFD700'; // Gold
            this.fontSize = 'bold 30px';
            this.dy = -40; // Float higher
            this.value = value + '!';
        } else {
            this.color = 'white';
            this.fontSize = 'bold 20px';
        }
    }

    update(deltaTime) {
        this.timer += deltaTime;
        if (this.timer > this.lifeTime) {
            this.markedForDeletion = true;
        }
        // Float up slowly
        this.y -= 0.5;
    }

    draw(ctx) {
        ctx.font = `${this.fontSize} "Courier New", monospace`;
        ctx.fillStyle = this.color;
        ctx.textAlign = 'center';

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText(this.value, this.x, this.y);
        ctx.fillText(this.value, this.x, this.y);
    }
}
