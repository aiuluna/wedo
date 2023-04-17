import { Rect } from "@wedo/utils";
import { Node } from "./instance/Node";
import { BoxDescriptorInput, SizeUnitInput, SizeMode, CSSPosition, CSSDisplay, FlexDirection } from "./standard.types";
import { ComponentMeta } from "./meta/ComponentMeta";
type Unit = 'px' | '%';
export declare class SizeUnit {
    private value;
    private unit;
    private mode;
    private parent;
    private key;
    constructor(value: number, unit: Unit, mode: SizeMode, key: string);
    setMode(mode: SizeMode): void;
    getMode(): SizeMode;
    getValue(): number;
    /**
     * @param val
     * @returns
     */
    setValue(val: number): void;
    static parse(ipt: string | number | SizeUnitInput | undefined, key: string): SizeUnit;
    getUnit(): Unit;
    getMax(rect: Rect): number;
    setUnit(unit: Unit): void;
    setParent(parent: BoxDescriptor): void;
    toString(unit?: string): string;
    toPxNumberWithRect(rect: Rect): number;
    toPxNumber(node: Node): number;
    toNumber(): number;
    toJSON(): SizeUnitInput;
    private getPrect;
    clone(): SizeUnit;
}
export declare class BoxDescriptor {
    movable: boolean;
    resizable: boolean;
    selectable: boolean;
    position: CSSPosition;
    display: CSSDisplay;
    flexDirection: FlexDirection;
    container: boolean;
    node: Node;
    left: SizeUnit;
    top: SizeUnit;
    width: SizeUnit;
    height: SizeUnit;
    marginTop: SizeUnit;
    marginRight: SizeUnit;
    marginBottom: SizeUnit;
    marginLeft: SizeUnit;
    constructor(box?: BoxDescriptorInput, meta?: ComponentMeta);
    private parseSizeUnit;
    setNode(node: Node): void;
    clone(): BoxDescriptor;
}
export {};
