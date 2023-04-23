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
<<<<<<< HEAD
    Topic[Topic["MouseMoveEventPass"] = 10] = "MouseMoveEventPass";
=======
    Topic[Topic["MemorizedDataChanged"] = 10] = "MemorizedDataChanged";
>>>>>>> b5aea0ee0dd6f8de5ee09d790eabfd6f7e938511
    Topic[Topic["DragDataUpdated"] = 11] = "DragDataUpdated";
    Topic[Topic["NodeChildrenUpdated"] = 12] = "NodeChildrenUpdated";
})(Topic || (Topic = {}));
