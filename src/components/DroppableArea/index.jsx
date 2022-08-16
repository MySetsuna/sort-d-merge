import { createContext, useEffect, useImperativeHandle, useState, forwardRef } from "react";
import useMousePosition from "../../hooks/useMousePosition";
import DraggableAreaStore from "../../state/DraggableAreaStore";
import { observer } from 'mobx-react';
import DraggableBox from "../DraggableBox";
import styles from './style.module.scss'

export const PositionContext = createContext();

const DroppableArea = forwardRef(function ({ draggableItems, className }, ref) {
  const [store] = useState(new DraggableAreaStore())
  const [dragabbleBoxlist, setDraggingBoxList] = useState()
  const getStore = () => {
    return store
  }
  useImperativeHandle(ref, () => {
    return { getStore }
  })


  // const [store, setStore] = useState()
  const [position, mousePositionAction] = useMousePosition()
  useEffect(() => {
    store?.setMousePositionAction(mousePositionAction)
  }, [])

  useEffect(() => {
    if (draggableItems?.length > 0) {
      const dragabbleBoxlist = draggableItems.map((item, index) => ({ dragabbleBoxKey: `dragabbleBox${index}`, value: item }))
      dragabbleBoxlist.unshift({ dragabbleBoxKey: 'dragabbleBoxStart', value: 'emptyBox' })
      dragabbleBoxlist.push({ dragabbleBoxKey: 'dragabbleBoxEnd', value: 'emptyBox' })
      setDraggingBoxList(dragabbleBoxlist)
    }

  }, [draggableItems])

  // store.setMousePositionObj(mousePositionAction)
  // store.setMousePosition(mousePositionAction.position)

  // useEffect(() => {
  //   autorun(() => {
  //     if (store.positionActiving) {
  //       store.mousePositionAction?.active()
  //     } else {
  //       store.mousePositionAction?.inActive()
  //     }
  //   })
  // }, [store])

  useEffect(() => {
    if (store && position) {
      // store.setMousePositionObj(mousePositionAction)
      store.setMousePosition(position)
    }
  }, [position, store])

  // useEffect(() => {
  //   if (mousePositionAction) {
  //     store?.setMousePositionAction(mousePositionAction)
  //   }
  // }, [])

  return (
    <div ref={ref} className={[className, styles.droppableArea].join(' ')}>
      <PositionContext.Provider value={store || {}}>
        {dragabbleBoxlist?.map(({ dragabbleBoxKey, value }, index) => {
          return <DraggableBox id={index} key={dragabbleBoxKey}>{value !== 'emptyBox' ? value : null}</DraggableBox>
        })}
      </PositionContext.Provider>
    </div>
  )
});
export default observer(DroppableArea)