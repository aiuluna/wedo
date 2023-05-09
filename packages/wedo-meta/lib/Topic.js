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
    Topic[Topic["MouseMoveEventPass"] = 8] = "MouseMoveEventPass";
    Topic[Topic["MouseUpEventPass"] = 9] = "MouseUpEventPass";
    Topic[Topic["MemorizedDataChanged"] = 10] = "MemorizedDataChanged";
    Topic[Topic["PropertyChanged"] = 11] = "PropertyChanged";
    Topic[Topic["PropertyModelUpdated"] = 12] = "PropertyModelUpdated";
    Topic[Topic["ExternalEventNotify"] = 13] = "ExternalEventNotify";
    Topic[Topic["DragDataUpdated"] = 14] = "DragDataUpdated";
    Topic[Topic["NodeChildrenUpdated"] = 15] = "NodeChildrenUpdated";
})(Topic || (Topic = {}));
