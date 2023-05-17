import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import getLocalComponentByURL from '../getLocalComponentByURL';
import { Bridge, Topic } from '@wedo/meta';
import RenderContext from './RenderContext';
import classes from './render.module.scss';
function __render(node, options) {
    const reactElement = (_jsx(NodeRender, { node: node, inheritProps: options.childrenProps }, options.key));
    if (options.ele) {
        ReactDOM.render(reactElement, options.ele);
        return null;
    }
    return reactElement;
}
const Styled = ({ node, children, style }) => {
    const ref = useRef(null);
    const context = useContext(RenderContext);
    const box = node.getBox();
    useEffect(() => {
        node.mount(ref.current, context.cord);
    }, []);
    return _jsx("div", { ref: ref, className: classes['wedo-' + node.getName()], style: {
            left: box.left.toString(),
            top: box.top.toString(),
            width: box.width.toString(),
            height: box.height.toString(),
            overflow: "hidden",
            ...style,
            ...node.getStyleObject(),
        }, children: React.cloneElement(children, {
            ...children.props
        }) });
};
const InnerRender = ({ node, C, inheritProps }) => {
    const page = useContext(RenderContext).page;
    const bridge = new Bridge(node, page, "render");
    bridge.renderForReact = __render;
    const passProps = node.getPassProps().toJS();
    const [_, setVer] = useState(0);
    useEffect(() => {
        node.on(Topic.MemorizedDataChanged).subscribe(() => {
            setVer(x => x + 1);
        });
    }, []);
    return _jsx(Styled, { node: node, style: { position: node.getBox().position, ...inheritProps?.style }, children: _jsx(C, { bridge: bridge, ...passProps }) });
};
export const NodeRender = ({ node, inheritProps }) => {
    if (node.getName() === 'root') {
        node = node.getChildren()[0];
        node.setXY([0, 0]);
    }
    const [localComponent, setLocalComponent] = useState(null);
    useEffect(() => {
        loadLocal();
    }, []);
    const loadLocal = () => {
        if (node.meta.url) {
            const lcomp = getLocalComponentByURL(node.meta.url);
            if (lcomp) {
                setLocalComponent(React.memo(lcomp));
            }
        }
    };
    if (!localComponent)
        return null;
    return _jsx(InnerRender, { node: node, C: localComponent, inheritProps: inheritProps });
};
