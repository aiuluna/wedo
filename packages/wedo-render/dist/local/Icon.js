import { jsx as _jsx } from "react/jsx-runtime";
// @ts-ignore
import * as Icons from '@ant-design/icons';
import style from './component.module.scss';
const Icon = ({ iconName }) => {
    const list = Icons;
    const IconInstance = list[iconName];
    // @ts-ignore
    return _jsx(IconInstance, { className: style.icon, style: { width: '100%' } });
};
export default Icon;
