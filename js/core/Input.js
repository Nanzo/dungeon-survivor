export class Input {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        });
    }

    // Helper to check if a specific key is pressed
    isDown(key) {
        return this.keys.includes(key);
    }
}
