export var Topic;
(function (Topic) {
    Topic[Topic["RemoteComponentsLoaded"] = 0] = "RemoteComponentsLoaded";
    Topic[Topic["PropertyChanged"] = 1] = "PropertyChanged";
    Topic[Topic["NodePropUpdated"] = 2] = "NodePropUpdated";
    Topic[Topic["Resized"] = 3] = "Resized";
    Topic[Topic["NodeMoved"] = 4] = "NodeMoved";
    Topic[Topic["ShadowReceiverChanged"] = 5] = "ShadowReceiverChanged";
    // 添加新节点
    Topic[Topic["NewNodeAdded"] = 6] = "NewNodeAdded";
    // 选中节点变化
    Topic[Topic["SelectionChanged"] = 7] = "SelectionChanged";
    Topic[Topic["DragDataUpdated"] = 8] = "DragDataUpdated";
    Topic[Topic["NodeChildrenUpdated"] = 9] = "NodeChildrenUpdated";
    Topic[Topic["NodePositionMoved"] = 10] = "NodePositionMoved";
})(Topic || (Topic = {}));
