import './App.css';
import DroppableArea from './components/DroppableArea';
import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import LineBarChart from './LineBarChart';

function App() {
  // const ref = useRef(null)
  // const fref = useRef()
  // const [areaStore, setStore] = useState()
  // useEffect(() => {
  //   if (ref.current.getStore?.()) {
  //     const store = ref.current.getStore?.()
  //     setStore(store)
  //   }
  // }, [ref.current?.getStore])
  return (
    <div className="App" >
      {/* {/* {ref.current.getStore?.()?.mousePosition?.x}{ref.current?.getStore?.()?.mousePosition?.y}
      <button onClick={() => {
        ref.current?.getStore?.()?.setPositionActiving(!ref.current?.getStore?.()?.positionActiving)

      }}>点击</button> */}

      {/* <DroppableArea ref={ref} draggableItems={[666, 777].map((item) => <div id={item} style={{ height: 246, width: 120, background: 'red', top: 0, left: 0, transition: 'all ' }}>{item}</div>)} /> */}
      {/* {areaStore?.draggingItem} */} <LineBarChart />
    </div>
  );
}

export default observer(App);
