import { Rect } from "./instance/Rect";
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
    getUnit() {
        return this.unit;
    }
    setUnit(unit) {
        this.unit = unit;
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
    toJSON() {
        return {
            value: this.value,
            mode: this.mode,
            unit: this.unit
        };
    }
    setParent(parent) {
        this.parent = parent;
    }
    set(val) {
        if (this.mode === 'fixed') {
            return;
        }
        if (this.unit === 'px') {
            this.value = val;
        }
        else if (this.unit === '%') {
            const prect = this.getPrect();
            const parentWidth = prect.width;
            const parentHeight = prect.height;
            if (['marginTop', 'marginBottom', 'top', 'height'].indexOf(this.key) !== -1) {
                this.value = 100 * val / parentHeight;
            }
            else {
                this.value = 100 * val / parentWidth;
            }
        }
    }
    getMax(rect) {
        if ([
            "marginTop",
            "marginBottom",
            "top",
            "height",
        ].indexOf(this.key) !== -1) {
            return rect.height;
        }
        else {
            return rect.width;
        }
    }
    toPxNumberWithRect(rect) {
        const realtiveMax = this.getMax(rect);
        if (this.mode === 'fill') {
            return realtiveMax;
        }
        if (this.unit === "px") {
            return this.value;
        }
        else if (this.unit === "%") {
            return realtiveMax * this.value / 100;
        }
        throw new Error("invalid sizeunit.");
    }
    getPrect(node) {
        const parent = node?.getParent();
        const prect = parent ? parent.getRect() : node?.getRect();
        return prect || Rect.ZERO;
    }
    toPxNumber(node) {
        const prect = this.getPrect();
        return this.toPxNumberWithRect(prect || Rect.ZERO);
    }
    toNumber() {
        return this.toPxNumber(this.parent?.node);
    }
    getKey() {
        return this.key;
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
        if (typeof ipt === 'undefined' || ipt === '') {
            return new SizeUnit(0, 'px', 'value', key);
        }
        if (typeof ipt === 'number') {
            return new SizeUnit(ipt, 'px', 'value', key);
        }
        if (typeof ipt === 'string') {
            if (ipt.match(/^\d+(px|%)$/)) {
                let num = Number.parseFloat(ipt.replace(/(px | %)/, ""));
                const m = ipt.match(/(px|%)/);
                const unit = m ? m[0] : "px";
                if (isNaN(num)) {
                    num = 0;
                }
                return new SizeUnit(num, unit, 'value', key);
            }
            const val = Number.parseFloat(ipt);
            if (!isNaN(val)) {
                return new SizeUnit(val, 'px', 'value', key);
            }
        }
        throw new Error("Unrecognizable size input:" + ipt);
    }
    clone() {
        const unit = new SizeUnit(this.value, this.unit, this.mode, this.key);
        unit.parent = this.parent;
        return unit;
    }
    setValue(val) {
        this.value = val;
    }
}
function definedOr(val, defaultValue) {
    if (typeof val === 'undefined') {
        return defaultValue;
    }
    return val;
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
    marginLeft;
    marginTop;
    marginBottom;
    marginRight;
    constructor(box, meta) {
        if (!box) {
            box = {
                left: '',
                top: '',
                width: '',
                height: ''
            };
        }
        this.movable = definedOr(box.movable, meta?.box.movable !== false);
        this.resizable = definedOr(box.resizable, meta?.box.resizable !== false);
        this.selectable = definedOr(box.selectable, meta?.box.selectable !== false);
        this.container = definedOr(box.container, meta?.box.container === true);
        this.position = definedOr(box.position, meta?.box.position || 'absolute');
        this.display = definedOr(box.display, meta?.box.display || 'block');
        this.flexDirection = definedOr(box.flexDirection, meta?.box.flexDirection || '');
        this.left = this.parseSizeUnit(box.left, "left");
        this.top = this.parseSizeUnit(box.top, "top");
        this.width = this.parseSizeUnit(box.width, "width");
        this.height = this.parseSizeUnit(box.height, "height");
        this.marginLeft = this.parseSizeUnit(box.marginLeft, "marginLeft");
        this.marginRight = this.parseSizeUnit(box.marginRight, "marginRight");
        this.marginBottom = this.parseSizeUnit(box.marginBottom, "marginBottom");
        this.marginTop = this.parseSizeUnit(box.marginTop, "marginTop");
    }
    parseSizeUnit(ipt, key) {
        const unit = SizeUnit.parse(ipt, key);
        unit.setParent(this);
        return unit;
    }
    toJson() {
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
    setNode(node) {
        this.node = node;
    }
    toRect() {
        return new Rect(this.left.getValue(), this.top.getValue(), this.width.getValue(), this.height.getValue());
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
    toString() {
        return [
            this.left.toString(),
            this.top.toString(),
            this.width.toString(),
            this.height.toString(),
        ].join(",");
    }
}
