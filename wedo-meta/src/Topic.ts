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
  // Node的children需要重新排序
  NodeGapIndexChanged,
  DragDataUpdated,
  NodeChildrenUpdated,
  NodePositionMoved
}