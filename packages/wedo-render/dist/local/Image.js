import { jsx as _jsx } from "react/jsx-runtime";
import classes from './component.module.scss';
const Image = ({ img, bridge }) => {
    // const data = bridge.getNodeData()
    return _jsx("img", { className: classes.img, src: img });
};
export default Image;
