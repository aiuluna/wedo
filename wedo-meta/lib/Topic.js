export var Topic;
(function (Topic) {
    Topic[Topic["RemoteComponentsLoaded"] = 0] = "RemoteComponentsLoaded";
    Topic[Topic["PropertyChanged"] = 1] = "PropertyChanged";
    Topic[Topic["NodePropUpdated"] = 2] = "NodePropUpdated";
    Topic[Topic["Resized"] = 3] = "Resized";
    Topic[Topic["NodeMoved"] = 4] = "NodeMoved";
    Topic[Topic["ShadowReceiverChanged"] = 5] = "ShadowReceiverChanged";
    Topic[Topic["DragDataUpdated"] = 6] = "DragDataUpdated";
    Topic[Topic["NodeChildrenUpdated"] = 7] = "NodeChildrenUpdated";
    Topic[Topic["NodePositionMoved"] = 8] = "NodePositionMoved";
})(Topic || (Topic = {}));
