export const blobToImage = function (blob, callback) {
    const image = new Image()
    image.src = blob
    image.onload = () => {
        callback(image)
    }
}

/**
 * left1 -----> right1
 *   x   -----> right
 */
export class RuleOfThirds {
    /**
     * @param {number} left
     * @param {number} right
     */
    constructor(left, right) {
        this.left1 = left
        this.right1 = right
    }

    /**
     * @param {number} right
     * @param {boolean} round
     */
    getLeftWithRight(right, round = true) {
        const x = this.left1 * right / this.right1
        return round ? Math.round(x) : x
    }

    static fromLeftToRight = (left, right) => new RuleOfThirds(left, right)
}
