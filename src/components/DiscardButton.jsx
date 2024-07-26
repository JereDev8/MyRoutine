import React from 'react'
import Swal from 'sweetalert2';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const DiscardButton = ( {setDraggables, setDroppables, authUser, id } ) => {
    const handleDeleteClick = (e, id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result)  => {
            if (result.isConfirmed) {
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
            }
          });
    }
  return (
     <IconButton onClick={(e)=>handleDeleteClick(e, id)} aria-label="delete" size="small">
          <DeleteIcon fontSize="small" />
     </IconButton>
  )
}

export default DiscardButton


{/* <IconButton onClick={(e)=>handleDeleteClick(e, id, children)} aria-label="delete" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton> */}