import { jsx as _jsx } from "react/jsx-runtime";
import { Topic } from "@wedo/meta";
import { useState, useEffect } from "react";
export default ({ bridge }) => {
    const [, setV] = useState(0);
    const props = bridge.passProps();
    useEffect(() => {
        bridge.on(Topic.MemorizedDataChanged)?.subscribe(() => {
            setV(x => x + 1);
        });
    }, []);
    const data = bridge.getNodeData();
    console.log('here', props);
    return _jsx("p", { style: {
            color: props?.color,
            fontSize: props?.fontSize,
            fontFamily: props?.fontFamily,
            textAlign: props?.align
        }, children: data || "没有设置文本" });
};
