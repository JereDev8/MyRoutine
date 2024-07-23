import { useDraggable } from "@dnd-kit/core"

function Draggable(props) {

    const draggable = useDraggable({
        id: props.id
    })

    // console.log(draggable)

    const style = draggable.transform ? {
        transform: `translate3d(${draggable.transform.x}px, ${draggable.transform.y}px, 0)`,
      } : undefined;

  return (
    <div className="draggable" ref={draggable.setNodeRef} style={style} {...draggable.listeners} {...draggable.attributes}>
        {props.children}
    </div>
  )
}

export default Draggable