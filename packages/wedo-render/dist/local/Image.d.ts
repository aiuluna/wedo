/// <reference types="react" />
import { Bridge } from '@wedo/meta';
interface ImageProps {
    img: string;
    bridge: Bridge;
}
declare const Image: ({ img, bridge }: ImageProps) => JSX.Element;
export default Image;
