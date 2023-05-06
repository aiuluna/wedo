export enum UIStates {
  Start,
  StartAdd,
  Adding,
  Added,
  Selected,
  Moving,
  Moved,
  StartResize,
  Resizing,
  Resized
}

export enum UIEvents {
  AUTO = '<auto>',
  EvtStartDragAdd = 0,
  EvtAddDraging,
  EvtDrop,
  EvtMoving,
  EvtSelected,
  EvtCancelSelect,
  EvtNodeMoved,
  EvtNodeSyncMoving,
  EvtStartResize

}

export enum CubeType {
  TOPLEFT = 1,
  TOPMIDDLE,
  TOPRIGHT,
  MIDDLERIGHT,
  BOTTOMRIGHT,
  BOTTOMMIDDLE,
  BOTTOMLEFT,
  MIDDLELEFT
}