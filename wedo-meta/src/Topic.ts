export enum Topic {
  RemoteComponentsLoaded,

  PropertyChanged,
  NodePropUpdated,

  Resized,
  NodeMoved,

  ShadowReceiverChanged,
  // 添加新节点
  NewNodeAdded,
  // 选中节点变化
  SelectionChanged,
  DragDataUpdated,
  NodeChildrenUpdated,
  NodePositionMoved
}