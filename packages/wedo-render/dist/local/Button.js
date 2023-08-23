import { jsx as _jsx } from "react/jsx-runtime";
import styles from './component.module.scss';
const Button = ({ text, fontSize, fontStyle = new Set(), align, color, fontFamily, bridge, }) => {
    const style = {
        fontFamily: fontFamily,
        fontSize,
        textAlign: align,
        color
    };
    return (_jsx("div", { onClick: () => {
            bridge.notify("click");
        }, className: styles.button, style: style, children: _jsx("button", { children: text }) }));
};
export default Button;
