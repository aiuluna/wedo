import { Rect } from "@wedo/utils";
export class SizeUnit {
    value = 0;
    unit = 'px';
    mode;
    parent;
    key;
    constructor(value, unit, mode, key) {
        this.key = key;
        this.value = value;
        this.unit = unit;
        this.mode = mode;
    }
    setMode(mode) {
        this.mode = mode;
    }
    getMode() {
        return this.mode;
    }
    getValue() {
        return this.value;
    }
    /**
     * @param val
     * @returns
     */
    setValue(val) {
        if (this.mode === "fixed") {
            return;
        }
        if (this.unit === 'px') {
            this.value = val;
        }
        else if (this.unit === '%') {
            const prect = this.getPrect();
            const parentWidth = prect.getWidth();
            const parentHeight = prect.getHeight();
            if (['marginTop', 'marginBottom', 'top', 'height'].includes(this.key)) {
                this.value = 100 * (val / parentHeight);
            }
            else {
                this.value = 100 * (val / parentWidth);
            }
        }
    }
    static parse(ipt, key) {
        if (typeof ipt === 'object') {
            return new SizeUnit(ipt.value, ipt.unit, ipt.mode, key);
        }
        if (ipt === 'fill') {
            return new SizeUnit(100, '%', 'fill', key);
        }
        if (ipt === 'auto') {
            return new SizeUnit(100, '%', 'auto', key);
        }
        if (typeof ipt === "undefined" || ipt === '') {
            return new SizeUnit(0, 'px', 'value', key);
        }
        if (typeof ipt === 'number') {
            return new SizeUnit(ipt, 'px', 'value', key);
        }
        if (typeof ipt === 'string') {
            if (ipt.match(/^d+(px|%)$/)) {
                let num = Number.parseFloat(ipt.replace(/(px|%)/, ''));
                const unit = ipt.match(/(px|%)/)?.[0] || 'px';
                if (isNaN(num))
                    num = 0;
                return new SizeUnit(num, unit, 'value', key);
            }
            const val = parseFloat(ipt);
            if (!isNaN(val)) {
                return new SizeUnit(val, 'px', 'value', key);
            }
        }
        throw new Error('Invalid size value:' + ipt);
    }
    getUnit() {
        return this.unit;
    }
    getMax(rect) {
        if (["marginTop",
            "marginBottom",
            "top",
            "height"].includes(this.key)) {
            return rect.getHeight();
        }
        else {
            return rect.getWidth();
        }
    }
    setUnit(unit) {
        this.unit = unit;
    }
    setParent(parent) {
        this.parent = parent;
    }
    toString(unit = '') {
        if (this.mode === 'auto') {
            return '';
        }
        if (this.mode === 'fill') {
            return '100%';
        }
        if (unit) {
            return this.value + unit;
        }
        return this.value + this.unit;
    }
    toPxNumberWithRect(rect) {
        const realtiveMax = this.getMax(rect);
        if (this.mode === 'fill') {
            return realtiveMax;
        }
        if (this.unit === 'px') {
            return this.value;
        }
        else if (this.unit === '%') {
            return this.value / 100 * realtiveMax;
        }
        throw new Error("invalid sizeunit.");
    }
    toPxNumber(node) {
        const prect = this.getPrect(node);
        return this.toPxNumberWithRect(prect);
    }
    toNumber() {
        return this.toPxNumber(this.parent?.node);
    }
    toJSON() {
        return {
            value: this.value,
            unit: this.unit,
            mode: this.mode
        };
    }
    getPrect(node) {
        const parent = node?.getParent();
        const prect = parent ? parent.getRect() : node?.getRect();
        return prect || Rect.ZERO;
    }
    clone() {
        const unit = new SizeUnit(this.value, this.unit, this.mode, this.key);
        unit.parent = this.parent;
        return unit;
    }
}
export class BoxDescriptor {
    movable;
    resizable;
    selectable;
    position;
    display;
    flexDirection;
    container;
    node;
    left;
    top;
    width;
    height;
    marginTop;
    marginRight;
    marginBottom;
    marginLeft;
    constructor(box, meta) {
        if (!box) {
            box = {
                left: '',
                top: '',
                width: '',
                height: ''
            };
        }
        this.movable = defineOr(box.movable, meta?.box.movable !== false);
        this.resizable = defineOr(box.resizable, meta?.box.resizable !== false);
        this.selectable = defineOr(box.selectable, meta?.box.selectable !== false);
        this.position = defineOr(box.position, meta?.box.position || 'absolute');
        this.display = defineOr(box.display, meta?.box.display || 'block');
        this.flexDirection = defineOr(box.flexDirection, meta?.box.flexDirection || '');
        this.container = defineOr(box.container, meta?.box.container === true);
        this.left = this.parseSizeUnit(box.left, 'left');
        this.top = this.parseSizeUnit(box.top, 'top');
        this.width = this.parseSizeUnit(box.width, 'width');
        this.height = this.parseSizeUnit(box.height, 'height');
        this.marginTop = this.parseSizeUnit(box.marginTop, 'marginTop');
        this.marginRight = this.parseSizeUnit(box.marginRight, 'marginRight');
        this.marginBottom = this.parseSizeUnit(box.marginBottom, 'marginBottom');
        this.marginLeft = this.parseSizeUnit(box.marginLeft, 'marginLeft');
    }
    parseSizeUnit(ipt, key) {
        const unit = SizeUnit.parse(ipt, key);
        unit.setParent(this);
        return unit;
    }
    setNode(node) {
        this.node = node;
    }
    clone() {
        const box = new BoxDescriptor();
        box.left = this.left.clone();
        box.top = this.top.clone();
        box.width = this.width.clone();
        box.height = this.height.clone();
        box.marginBottom = this.marginBottom.clone();
        box.marginLeft = this.marginLeft.clone();
        box.marginRight = this.marginRight.clone();
        box.marginTop = this.marginTop.clone();
        box.movable = this.movable;
        box.container = this.container;
        box.selectable = this.selectable;
        box.resizable = this.resizable;
        box.position = this.position;
        box.flexDirection = this.flexDirection;
        box.display = this.display;
        return box;
    }
    toJSON() {
        return {
            left: this.left.toJSON(),
            top: this.top.toJSON(),
            width: this.width.toJSON(),
            height: this.height.toJSON(),
            marginLeft: this.marginLeft.toJSON(),
            marginTop: this.marginTop.toJSON(),
            marginBottom: this.marginBottom.toJSON(),
            marginRight: this.marginRight.toJSON(),
            resizable: this.resizable,
            position: this.position,
            flexDirection: this.flexDirection,
            movable: this.movable,
            container: this.container,
            display: this.display,
            selectable: this.selectable
        };
    }
}
function defineOr(val, defaultValue) {
    if (typeof val === 'undefined') {
        return defaultValue;
    }
    return val;
}
