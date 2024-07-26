import React from 'react'
import Droppable from './Droppable'
import Draggable from './Draggable'



function ContainerDrops({drops, auth, setDrags, setDrops}) {
  return (
    <div className='dropss'>
        {
            drops.map((drop)=>{
                return <Droppable key={drop.id} id={drop.id}> {drop.isDropped ? <Draggable authUser={auth} setDroppables={setDrops} setDraggables={setDrags} id={drop.task.id} > {drop.task.task} </Draggable> : ''} </Droppable>
            })
        }
    </div>
  )
}

export default ContainerDrops