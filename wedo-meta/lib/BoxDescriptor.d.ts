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
    setUnit(unit: Unit): void;
    setParent(parent: BoxDescriptor): void;
    toString(unit?: string): string;
    toJSON(): SizeUnitInput;
    private getPrect;
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
}
export {};
