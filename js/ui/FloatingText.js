export class FloatingText {
    constructor(value, x, y, color = '#fff', isCrit = false) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.markedForDeletion = false;
        this.timer = 0;
        this.lifeTime = 1000; // 1 second
        this.dy = -20; // Float up distance
        this.isCrit = isCrit;

        this.color = color;
        this.fontSize = 'bold 20px';

        if (this.isCrit) {
            this.color = '#FFD700'; // Gold override for Crits? Or just Big Red? User asked for Red. Let's keep Gold for Crit as it's special.
            // User request: "1 damage red".
            // Let's defer to caller. If caller sends red, it's red. If isCrit, maybe we emphasize size.
            // But usually Crits have their own color. Let's keep Gold for Crit for now, or maybe Orange-Red.
            this.color = '#FFD700'; // Gold
            this.fontSize = 'bold 30px';
            this.dy = -40; // Float higher
            this.value = value + '!';
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
