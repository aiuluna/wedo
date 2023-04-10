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


  public setValue(val: number) {
    if (this.mode === "fixed") {
      return
    }
    if (this.unit === 'px') {
      this.value = val
    } else if (this.unit === '%') {

    }
  }

  public getUnit() {
    return this.unit
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

  public toJSON() : SizeUnitInput{
    return {
      value: this.value,
      unit: this.unit,
      mode: this.mode
    }
  }

  private getPrect(node? : Node){
		const parent = node?.getParent()
    const prect = parent ? parent.getRect : node?.getRect()
    return prect || Rect.ZERO
	}


}

export class BoxDescriptor {
  movable: boolean;
  resizable: boolean;
  selectable: boolean;
  position: CSSPosition;
  dispaly: CSSDisplay;
  flexDirection: FlexDirection;
  container: boolean;
  node!: Node;
  left: SizeUnit;


}