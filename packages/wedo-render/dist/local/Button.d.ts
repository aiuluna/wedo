/// <reference types="react" />
import { Bridge } from '@wedo/meta';
interface ButtonProps {
    text: string;
    bridge: Bridge;
    color: string;
    fontFamily: string;
    fontStyle: Set<string>;
    align: "left" | "right" | "center";
    fontSize: number;
}
declare const Button: ({ text, fontSize, fontStyle, align, color, fontFamily, bridge, }: ButtonProps) => JSX.Element;
export default Button;
