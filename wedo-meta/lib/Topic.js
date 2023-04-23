export var Topic;
(function (Topic) {
    Topic[Topic["RemoteComponentsLoaded"] = 0] = "RemoteComponentsLoaded";
    Topic[Topic["PropertyChanged"] = 1] = "PropertyChanged";
    Topic[Topic["NodePropUpdated"] = 2] = "NodePropUpdated";
    Topic[Topic["Resized"] = 3] = "Resized";
    Topic[Topic["NodeMoved"] = 4] = "NodeMoved";
    Topic[Topic["ShadowReceiverChanged"] = 5] = "ShadowReceiverChanged";
    Topic[Topic["NewNodeAdded"] = 6] = "NewNodeAdded";
    Topic[Topic["SelectionChanged"] = 7] = "SelectionChanged";
    Topic[Topic["NodeGapIndexChanged"] = 8] = "NodeGapIndexChanged";
    Topic[Topic["NodePositionMoved"] = 9] = "NodePositionMoved";
    Topic[Topic["MouseMoveEventPass"] = 10] = "MouseMoveEventPass";
    Topic[Topic["MouseUpEventPass"] = 11] = "MouseUpEventPass";
    Topic[Topic["MemorizedDataChanged"] = 12] = "MemorizedDataChanged";
    Topic[Topic["DragDataUpdated"] = 13] = "DragDataUpdated";
    Topic[Topic["NodeChildrenUpdated"] = 14] = "NodeChildrenUpdated";
})(Topic || (Topic = {}));
