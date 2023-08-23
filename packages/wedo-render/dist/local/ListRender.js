import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export default ({ bridge }) => {
    const node = bridge.getNode();
    return _jsx(_Fragment, { children: node.getChildren().map(childNode => {
            return bridge.render('react', childNode, {
                key: childNode.getId() + ""
            });
        }) });
};
