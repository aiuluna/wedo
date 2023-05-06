export enum States {
  Start,
  DragStart,
  Moving,
  Stoped,
  Selected,
  PlacingComponent,
  AddingComponent
}

export enum Actions {
  AUTO = '<auto>',
  EvtDragStart = 0,
  EvtDrag,
  EvtDrop,
  EvtDragEnd,
  StartAddComponent,
}

export type Meta = {
  type : string,
  w : number,
  h : number
}
