import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export default ({ bridge }) => {
    const [, setV] = useState(0);
    const props = bridge.passProps();
    useEffect(() => {
        bridge.onDataChange(() => {
            setV(x => x + 1);
        });
    }, [bridge]);
    const data = bridge.getNodeData();
    console.log('here', props, data);
    return _jsx("p", { style: {
            color: props?.color,
            fontSize: props?.fontSize,
            fontFamily: props?.fontFamily,
            textAlign: props?.align
        }, children: data || "没有设置文本" });
};
