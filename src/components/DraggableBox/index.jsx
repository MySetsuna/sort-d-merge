import { observer } from "mobx-react"
import React, { useContext, useState } from "react"
import { PositionContext } from "../DroppableArea"
import styles from './style.module.scss'


const DraggableBox = observer(function (props) {
  /**
   * {store?.mousePosition?.x}{store?.mousePosition?.y}
      <button onClick={() => {
        store?.setPositionActiving(!store?.positionActiving)

      }}>点击</button>
   */
  const store = useContext(PositionContext)
  const [boxPosition, setBoxPosition] = useState()
  // useEffect(() => {
  //   if (store?.positionActiving) {
  //     console.log(8888);
  //     setDragStyle({ position: 'fixed', left: store?.mousePosition?.x, top: store?.mousePosition?.y })
  //   } else {
  //     setDragStyle({})
  //   }
  // }, [store?.positionActiving])
  return (
    <>
      <div draggable
        className={store?.draggingItem === props.id && store?.positionActiving ? styles.draggingBox : styles.dragabbleBox}
        onMouseDown={(e) => {
          console.log(e);
          store?.setMousePosition({ x: e.clientX, y: e.clientY })
        }}
        onDragStart={(e) => {
          console.log();
          e.preventDefault()
          setBoxPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
          store?.setPositionActiving(true)
          store?.setDraggingItem(props.id)
        }}
        onMouseUp={(e) => {
          store?.setPositionActiving(false)
          store?.setDraggingItem(null)
        }}
        onDrop={() => {
          console.log(props.id);
        }}
        style={{
          height: 'max-content',
          width: 'max-content',
          display: 'flex',
          // background: 'pink',
          zIndex: store?.draggingItem === props.id && store?.positionActiving ? 9999 : 'unset',
          position: store?.draggingItem === props.id && store?.positionActiving ? 'fixed' : 'unset',
          transform: `translate(${store?.draggingItem === props.id && store?.positionActiving ? store?.mousePosition?.x - (boxPosition?.x || 0) : 0}px, ${store?.draggingItem === props.id && store?.positionActiving ? store?.mousePosition?.y - (boxPosition?.y || 0) : 0}px)`,
          // left: store?.draggingItem === props.id && store?.positionActiving ? store?.mousePosition?.x - (boxPosition?.x || 0) : 0,
          // top: store?.draggingItem === props.id && store?.positionActiving ? store?.mousePosition?.y - (boxPosition?.y || 0) : 0
        }}>{props.children}
      </div>
      {store?.draggingItem === props.id && React.cloneElement(props.children, { style: { ...props.children.props.style, background: 'pink', pointerEvents: 'none', } })}
    </>
  )
})
export default DraggableBox