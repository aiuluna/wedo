import { Rect } from "@wedo/utils";
import { CubeType } from "./uiModel.types";

export default class Resizer {
  cubeType: CubeType; // 调整类型
  x: number = 0;
  y: number = 0;

  constructor(cubeType: CubeType) {
    this.cubeType = cubeType;
  }

  /**
   * 从左上角开始依次是topleft, topmiddle, topright, middleright, bottomright, bottommiddle, bottomleft and middleleft
   * 将diffx,diffy改变正负值的数组
   * 向左移动diffx都是负数
   * 向右移动diffx都是正数
   * 向上移动diffy都是负数
   * 向下移动diffy都是正数
   */
  static resizerdata = [
    ['topleft', CubeType.TOPLEFT, [1, 1, -1, -1]],
    ['topmiddle', CubeType.TOPMIDDLE, [0, 1, 0, -1]],
    ['topright', CubeType.TOPRIGHT, [0, 1, 1, -1]],
    ['middleright', CubeType.MIDDLERIGHT, [0, 0, 1, 0]],
    ['bottomright', CubeType.BOTTOMRIGHT, [0, 0, 1, 1]],
    ['bottommiddle', CubeType.BOTTOMMIDDLE, [0, 0, 0, 1]],
    ['bottomleft', CubeType.BOTTOMLEFT, [1, 0, -1, 1]],
    ['middleleft', CubeType.MIDDLELEFT, [1, 0, -1, 0]]
  ]

  /**
   * 根据当前rect和diffX,diffY计算新的rect
   * @param rect 
   * @param vec [diffx, diffy]
   */
  public nextRect(rect: Rect, vec: [number, number]) {
    const [diffx, diffy] = vec;
    
    const nvec = Resizer.resizerdata[this.cubeType - 1][2] as Array<number>;

  
    const left = nvec[0] * diffx + rect.left;
    const top = nvec[1] * diffy + rect.top;
    const width = nvec[2] * diffx + rect.width;
    const height = nvec[3] * diffy + rect.height;

    return new Rect(left, top, width, height);

  }

}