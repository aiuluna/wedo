export var Topic;
(function (Topic) {
    Topic[Topic["RemoteComponentsLoaded"] = 0] = "RemoteComponentsLoaded";
    Topic[Topic["PropertyChanged"] = 1] = "PropertyChanged";
    Topic[Topic["NodePropUpdated"] = 2] = "NodePropUpdated";
    Topic[Topic["Resized"] = 3] = "Resized";
    Topic[Topic["NodeMoved"] = 4] = "NodeMoved";
    Topic[Topic["DragDataUpdated"] = 5] = "DragDataUpdated";
    Topic[Topic["NodeChildrenUpdated"] = 6] = "NodeChildrenUpdated";
    Topic[Topic["NodePositionMoved"] = 7] = "NodePositionMoved";
})(Topic || (Topic = {}));
