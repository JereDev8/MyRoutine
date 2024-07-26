import React from 'react'
import Draggable from './Draggable';

function ContainerDrags({drags, setDrags, setDrops, auth}) {

    const draggables = drags;

  return (
    <div className='cont-drags'>
        {
            draggables.map((drag)=>{
                return drag.isDropped ? null : <Draggable authUser={auth} setDroppables={setDrops} setDraggables={setDrags}  key={drag.id} id={drag.id} > {drag.task} </Draggable>
            })
        }
    </div>
  )
}

export default ContainerDrags