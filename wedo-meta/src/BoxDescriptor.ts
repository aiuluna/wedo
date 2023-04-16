import { Rect } from "@wedo/utils";
import { Node } from "./instance/Node";
import {
  BoxDescriptorInput,
  SizeUnitInput,
  SizeMode,
  CSSPosition,
  CSSDisplay,
  FlexDirection
} from "./standard.types"
import { ComponentMeta } from "./meta/ComponentMeta";

type Unit = 'px' | '%';
export class SizeUnit {
  private value: number = 0;
  private unit: Unit = 'px';
  private mode: SizeMode;
  private parent!: BoxDescriptor;
  private key: string;

  constructor(value: number, unit: Unit, mode: SizeMode, key: string) {
    this.key = key;
    this.value = value;
    this.unit = unit;
    this.mode = mode;
  }

  public setMode(mode: SizeMode) {
    this.mode = mode;
  }

  public getMode(): SizeMode {
    return this.mode;
  }

  public getValue() {
    return this.value
  }

  /** 
   * @param val
   * @returns 
   */
  public setValue(val: number) {
    if (this.mode === "fixed") {
      return
    }
    if (this.unit === 'px') {
      this.value = val
    } else if (this.unit === '%') {
      const prect = this.getPrect();
      const parentWidth = prect.getWidth();
      const parentHeight = prect.getHeight();
      if (['marginTop', 'marginBottom', 'top', 'height'].includes(this.key)) {
        this.value = 100 * (val / parentHeight)
      } else {
        this.value = 100 * (val / parentWidth)
      }
    }
  }

  static parse(ipt: string | number | SizeUnitInput | undefined, key: string): SizeUnit {
    if (typeof ipt === 'object') {
      return new SizeUnit(ipt.value, ipt.unit as Unit, ipt.mode, key);
    }

    if (ipt === 'fill') {
      return new SizeUnit(100, '%', 'fill', key)
    }
    if (ipt === 'auto') {
      return new SizeUnit(100, '%', 'auto', key)
    }
    if (typeof ipt === "undefined" || ipt === '') {
      return new SizeUnit(0, 'px', 'value', key)
    }
    if (typeof ipt === 'number') {
      return new SizeUnit(ipt, 'px', 'value', key)
    }
    if (typeof ipt === 'string') {
      if (ipt.match(/^d+(px|%)$/)) {
        let num = Number.parseFloat(ipt.replace(/(px|%)/, ''))
        const unit = ipt.match(/(px|%)/)?.[0] || 'px'
        if (isNaN(num)) num = 0;
        return new SizeUnit(num, unit as Unit, 'value', key)
      }

      const val = parseFloat(ipt);
      if (!isNaN(val)) {
        return new SizeUnit(val, 'px', 'value', key)
      }
    }
    throw new Error('Invalid size value:' + ipt)
  }

  public getUnit() {
    return this.unit
  }

  public getMax(rect: Rect) {
    if (["marginTop",
      "marginBottom",
      "top",
      "height"].includes(this.key)) {
      return rect.getHeight()
    }
    else {
      return rect.getWidth()
    }
  }

  public setUnit(unit: Unit) {
    this.unit = unit
  }

  public setParent(parent: BoxDescriptor) {
    this.parent = parent
  }

  public toString(unit = ''): string {
    if (this.mode === 'auto') {
      return ''
    }
    if (this.mode === 'fill') {
      return '100%'
    }
    if (unit) {
      return this.value + unit
    }
    return this.value + this.unit
  }

  public toPxNumberWithRect(rect: Rect) {
    const realtiveMax = this.getMax(rect);
    if (this.mode === 'fill') {
      return realtiveMax
    } 
    if (this.unit === 'px') {
      return this.value
    } else if (this.unit === '%') {
      return this.value / 100 * realtiveMax
    }

    throw new Error("invalid sizeunit.")	

  }

  public toPxNumber(node: Node) {
    const prect = this.getPrect(node);
    return this.toPxNumberWithRect(prect)

  }

  public toNumber(): number {
    return this.toPxNumber(this.parent?.node)
  }

  public toJSON(): SizeUnitInput {
    return {
      value: this.value,
      unit: this.unit,
      mode: this.mode
    }
  }

  private getPrect(node?: Node): Rect {
    const parent = node?.getParent()
    const prect = parent ? parent.getRect() : node?.getRect()
    return prect || Rect.ZERO
  }

}

export class BoxDescriptor {
  movable: boolean;
  resizable: boolean;
  selectable: boolean;
  position: CSSPosition;
  display: CSSDisplay;
  flexDirection: FlexDirection;
  container: boolean;
  node!: Node;

  left: SizeUnit;
  top: SizeUnit;
  width: SizeUnit;
  height: SizeUnit;

  marginTop: SizeUnit;
  marginRight: SizeUnit;
  marginBottom: SizeUnit;
  marginLeft: SizeUnit;

  constructor(box?: BoxDescriptorInput, meta?: ComponentMeta) {
    if (!box) {
      box = {
        left: '',
        top: '',
        width: '',
        height: ''
      }
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

  private parseSizeUnit(ipt: string | number | SizeUnitInput | undefined, key: string): SizeUnit {
    const unit = SizeUnit.parse(ipt, key);
    unit.setParent(this)
    return unit;
  }

  public setNode(node: Node): void {
    this.node = node;
  }
}

function defineOr(val: any, defaultValue: any) {
  if (typeof val === 'undefined') {
    return defaultValue
  }
  return val
}