export var Topic;
(function (Topic) {
    Topic[Topic["RemoteComponentsLoaded"] = 0] = "RemoteComponentsLoaded";
    Topic[Topic["NodePropUpdated"] = 1] = "NodePropUpdated";
    Topic[Topic["Resized"] = 2] = "Resized";
    Topic[Topic["NodeMoved"] = 3] = "NodeMoved";
    Topic[Topic["ShadowReceiverChanged"] = 4] = "ShadowReceiverChanged";
    Topic[Topic["NewNodeAdded"] = 5] = "NewNodeAdded";
    Topic[Topic["SelectionChanged"] = 6] = "SelectionChanged";
    Topic[Topic["NodeGapIndexChanged"] = 7] = "NodeGapIndexChanged";
    Topic[Topic["NodePositionMoved"] = 8] = "NodePositionMoved";
    Topic[Topic["MouseMoveEventPass"] = 9] = "MouseMoveEventPass";
    Topic[Topic["MouseUpEventPass"] = 10] = "MouseUpEventPass";
    Topic[Topic["MemorizedDataChanged"] = 11] = "MemorizedDataChanged";
    Topic[Topic["PropertyChanged"] = 12] = "PropertyChanged";
    Topic[Topic["PropertyModelUpdated"] = 13] = "PropertyModelUpdated";
    Topic[Topic["DragDataUpdated"] = 14] = "DragDataUpdated";
    Topic[Topic["NodeChildrenUpdated"] = 15] = "NodeChildrenUpdated";
})(Topic || (Topic = {}));
