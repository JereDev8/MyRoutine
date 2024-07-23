import { useDroppable } from "@dnd-kit/core"



function Droppable(props) {


    const {setNodeRef, isOver} = useDroppable({
        id: props.id
    })

    const style= {
        backgroundColor: isOver ? "#15193F" : "#272D4A",
        width:"300px",
        height:"40px",
        textAlign:"center",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    }

  return (
    <div ref={setNodeRef} style={style} >
        { props.children }
    </div>
  )



}

export default Droppable