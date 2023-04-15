export var Topic;
(function (Topic) {
    Topic[Topic["RemoteComponentsLoaded"] = 0] = "RemoteComponentsLoaded";
    Topic[Topic["DragDataUpdated"] = 1] = "DragDataUpdated";
    Topic[Topic["NodeChildrenUpdated"] = 2] = "NodeChildrenUpdated";
    Topic[Topic["NodePositionMoved"] = 3] = "NodePositionMoved";
})(Topic || (Topic = {}));
