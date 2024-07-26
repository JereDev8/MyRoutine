import { useDraggable } from "@dnd-kit/core"
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DiscardButton from "./DiscardButton";



function Draggable({authUser, setDraggables, setDroppables, id, children }) {
  
  

  console.log(authUser) //Aca no da Undefined

  const handleDeleteClick = async (e, id, textTask) => {

    const newTasksAndDrops = await fetch(`https://myroutine-back-production.up.railway.app/users/${authUser.uid}/tasks`,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({id})
    }).then((res)=> res.json());
    
    console.log(newTasksAndDrops)

    setDraggables(newTasksAndDrops.newTasks);
    setDroppables(newTasksAndDrops.newDrops);
  };

  const draggable = useDraggable({
    id: id
  })


  const style = draggable.transform ? {
    transform: `translate3d(${draggable.transform.x}px, ${draggable.transform.y}px, 0)`,
  } : undefined;

  return (
    <div className="draggable" ref={draggable.setNodeRef} style={style} >
      <div className="task-drag">
        {children}
      </div>
      <div className="cont-btnHandle" >

        <button className="btn-handle" {...draggable.listeners} {...draggable.attributes} ><DragIndicatorIcon fontSize="small|"/></button>
        
        <DiscardButton id={id} textTask={children} setDraggables={setDraggables} setDroppables={setDroppables} authUser={authUser}  ></DiscardButton>
      </div> 
    </div>
  )
}

export default Draggable

{/* <IconButton onClick={(e)=>handleDeleteClick(e, id, children)} aria-label="delete" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton> */}





















// const newTasks = await fetch(`http://localhost:3000/users/${authUser.uid}/tasks`,{
    //   method:'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body:JSON.stringify({ taskToDelete: e.target.parentElement.parentElement.parentElement.parentElement.childNodes[0].innerHTML })
    // }).then((res)=> res.json());
    
    // console.log(newTasks)