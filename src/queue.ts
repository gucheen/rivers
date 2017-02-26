class ExtendArray {
    isEmpty(arr: any[]): boolean {
        return arr.length === 0;
    }

    peek(array: any[]): any {
        return array[array.length - 1];
    }

    contains(arr: any[], obj: any): boolean {
        return arr.indexOf(obj) >= 0;
    }

    remove(arr: any[], obj: any): boolean {
        const i = arr.indexOf(obj);
        let rv;
        if ((rv = i >= 0)) {
            arr.splice(i, 1);
        }
        return rv;
    }

    removeLast(arr: any[], obj: any): boolean {
        var i = arr.lastIndexOf(obj);
        if (i >= 0) {
            arr.splice(i, 1);
            return true;
        }
        return false;
    }
}

/**
 * Queue inspired by Google Closure Libaray(goog.sturcts.Queue)
 */
export class Queue {
    private extendArray = new ExtendArray();
    private front: any[] = [];
    private back: any[] = [];

    private maybeFlip() {
        if (this.front.length === 0) {
            this.front = this.back;
            this.front.reverse();
            this.back = [];
        }
    }

    enqueue(element: any) {
        this.back.push(element);
    }

    dequeue(): any {
        this.maybeFlip();
        return this.front.pop();
    }

    peek(): any {
        this.maybeFlip();
        return this.extendArray.peek(this.front);
    }

    getCount(): number {
        return this.front.length + this.back.length;
    }

    isEmpty(): boolean {
        return this.extendArray.isEmpty(this.front) && this.extendArray.isEmpty(this.back);
    }

    clear() {
        this.front = [];
        this.back = [];
    }

    contains(obj: any): boolean {
        return this.extendArray.contains(this.front, obj) ||
            this.extendArray.contains(this.back, obj);
    }

    remove(obj: any): boolean {
        return this.extendArray.removeLast(this.front, obj) ||
            this.extendArray.remove(this.back, obj);
    }

    getValues() {
        const res = [];
        // Add the front array in reverse, then the back array.
        for (let i = this.front.length - 1; i >= 0; --i) {
            res.push(this.front[i]);
        }
        const len = this.back.length;
        for (var i = 0; i < len; ++i) {
            res.push(this.back[i]);
        }
        return res;
    }
}