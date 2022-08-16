import { makeAutoObservable, autorun, runInAction } from 'mobx'

class DraggableAreaStore {
  constructor(props) {
    makeAutoObservable(this)
    autorun(() => {
      const { positionActiving, mousePositionAction } = this
      if (positionActiving && mousePositionAction) {
        mousePositionAction?.active()
      } else {
        mousePositionAction?.inActive()
      }
    })
  }

  positionActiving = false;

  draggingItem = undefined
  setDraggingItem(val) {
    this.draggingItem = val
  }
  /**
   * 记录鼠标位置
   */
  mousePositionAction = null;
  setMousePositionAction(val) {
    this.mousePositionAction = val;
  }

  mousePosition = null
  setMousePosition(val) {
    this.mousePosition = val
  }

  setPositionActiving(val) {
    this.positionActiving = val
  }

}

export default DraggableAreaStore