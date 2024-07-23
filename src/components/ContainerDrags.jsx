import React from 'react'
import Draggable from './Draggable';

function ContainerDrags({drags}) {

    const draggables = drags;

  return (
    <div>
        {
            draggables.map((drag)=>{
                return drag.isDropped ? null : <Draggable key={drag.id} id={drag.id} > {drag.task} </Draggable>
            })
        }
    </div>
  )
}

export default ContainerDrags