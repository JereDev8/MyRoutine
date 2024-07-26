import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { TextField } from '@mui/material';



const Fade = React.forwardRef(function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null, true);
        }
      }, 
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
  };
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  
  export default function SpringModal({ user, drags, setDrags }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    async function handleCreateTask(uid){
      if(document.getElementsByClassName('txt-newtask')[0].children[1].children[0].value != ""){
        let newTarea = document.getElementsByClassName('txt-newtask')[0].children[1].children[0].value
        await fetch(`https://myroutine-back-production.up.railway.app/users/${uid}/tasks`,{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            tarea: newTarea
          }) 
        })

        setDrags([...drags, { 
          id: drags.length + 1,
          task: newTarea,
          isDropped: false } 
        ])

        handleClose() 
      }
      else{
        console.log('Tienes que escribir una Tarea')
      }
      
    }

    return (
      <div>
        <button onClick={ user ? handleOpen : console.log('No iniciaste sesion aun')} style={user ? {'cursor':'pointer'} : {'cursor':'not-allowed'}} title={user ? 'Crea una nueva tarea' : 'Debes iniciar sesion para crear una tarea'} type="button" className="button">
                <span className="button__text">Add task</span>
                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        </button>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="spring-modal-title" variant="h6" component="h2">
                Create new Task
              </Typography>
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <TextField style={{marginBottom:"20px"}} id="standard-basic" className='txt-newtask' label="Task" variant="standard" />
              <br />
              
              <Button onClick={()=>handleCreateTask(user.uid)} variant="contained">Create task</Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
