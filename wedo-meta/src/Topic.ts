export enum Topic {
  RemoteComponentsLoaded,

  NodePropUpdated, // node属性已更新

  Resized, // 调整大小的结束状态
  NodeMoved, // 节点已完成移动

  ShadowReceiverChanged,
  NewNodeAdded, // 添加新节点
  SelectionChanged, // 选中节点变化
  NodeGapIndexChanged, // Node的children需要重新排序
  NodePositionMoved, // 节点位置变化

  MouseMoveEventPass, // 鼠标移动事件
  MouseUpEventPass, // 鼠标抬起事件
  MemorizedDataChanged, //缓存数据变更 
  
  PropertyChanged, // 属性值PropItem已更新
  PropertyModelUpdated, // 属性模型PropEditor已更新

  DragDataUpdated,
  NodeChildrenUpdated,
}