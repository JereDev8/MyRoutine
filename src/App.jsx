// Queda modificar el css para que puedan haber muchas mas tareas a la vista 
// y agregar un paso mas a lo de eliminar tarea



import './App.css'
import { DndContext } from '@dnd-kit/core'
import { useEffect, useState, createContext } from 'react'
import ContainerDrops from './components/ContainerDrops'
import ContainerDrags from './components/ContainerDrags'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import SpringModal from './components/ModalTasks'
import { onAuthStateChanged } from 'firebase/auth'
import GoogleButton from 'react-google-button'

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyCnTHoNmpf0qJzZ8EUiWhANFKGJu5RJrsc",
  authDomain: "myroutine-d0e88.firebaseapp.com",
  projectId: "myroutine-d0e88",
  storageBucket: "myroutine-d0e88.appspot.com",
  messagingSenderId: "275585145038",
  appId: "1:275585145038:web:c4d577f24a0149f486d89f"
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



function App() {

  const [authUser, setAuthUser] = useState(null);
  const [onDrag, setOnDrag] = useState(false);
  const [draggables, setDraggables] = useState([{
    id: 1,
    task: 'Tarea de prueba 1',
    isDropped: false
  },
  {
    id: 2,
    task: 'Tarea de prueba 2',
    isDropped: false
  },
  {
    id: 3,
    task: 'Tarea de prueba 3',
    isDropped: false
  }
  ])
  const [droppables, setDroppables] = useState([
    {
      id: 1,
      hour: "01:00",
      isDropped: false,
      task: null
    },
    {
      id: 2,
      hour: "02:00",
      isDropped: false,
      task: null
    },
    {
      id: 3,
      hour: "03:00",
      isDropped: false,
      task: null
    },
    {
      id: 4,
      hour: "04:00",
      isDropped: false,
      task: null
    },
    {
      id: 5,
      hour: "05:00",
      isDropped: false,
      task: null
    },
  {
      id: 6,
      hour: "06:00",
      isDropped: false,
      task: null
  },
    {
    id: 7,
    hour: "07:00",
    isDropped: false,
    task: null
  },

  {
    id: 8,
    hour: "08:00",
    isDropped: false,
    task: null
  },
  {
    id: 9,
    hour: "09:00",
    isDropped: false,
    task: null
  },
  
  {
    id: 10,
    hour: "10:00",
    isDropped: false,
    task: null
  },
  {
    id: 11,
    hour: "11:00",
    isDropped: false,
    task: null
  },

  {
    id: 12,
    hour: "12:00",
    isDropped: false,
    task: null
  },
  {
    id: 13,
    hour: "13:00",
    isDropped: false,
    task: null
  },
  {
    id: 14,
    hour: "14:00",
    isDropped: false,
    task: null
  },
  {
    id: 15,
    hour: "15:00",
    isDropped: false,
    task: null
  },
  {
    id: 16,
    hour: "16:00",
    isDropped: false,
    task: null
  },
  {
    id: 17,
    hour: "17:00",
    isDropped: false,
    task: null
  },
  {
    id: 18,
    hour: "18:00",
    isDropped: false,
    task: null
  },
  {
    id: 19,
    hour: "19:00",
    isDropped: false,
    task: null
  },
  {
    id: 20,
    hour: "20:00",
    isDropped: false,
    task: null
  },
  {
    id: 21,
    hour: "21:00",
    isDropped: false,
    task: null
  },
  {
    id: 22,
    hour: "22:00",
    isDropped: false,
    task: null
  },
  {
    id: 23,
    hour: "23:00",
    isDropped: false,
    task: null
  },
  {
    id: 24,
    hour: "00:00",
    isDropped: false,
    task: null
  }
])

  useEffect(()=>{ 
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        setAuthUser(user);
        console.log('Ha iniciado sesion')
        const tasks = await fetch(`https://myroutine-back-production.up.railway.app/users/${user.uid}/tasks`,{
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then( (response)=>response.json())
  
        
        //Aca tasks ya son las tareas.
  
        const tareasTransformadas = tasks.map((tarea, index)=>({
          id:index + 1,
          task:tarea.task,
          isDropped:tarea.isDropped
        })) 
  
        console.log('Ha iniciado sesion')
        setDraggables(tareasTransformadas)

        const drops = await fetch(`https://myroutine-back-production.up.railway.app/users/${user.uid}/droppables`,{
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((response)=>response.json())

        
        setDroppables(drops)
        
        console.log(user)
      } 
      else{
        console.log('No ha iniciado sesion')
        setAuthUser(null)
      }     

      

    })

  },[])

 
  function handleDragEnd(e) {
    console.log(e)

    if (e.over) {

      //Chequear que el elemento draggable que esta siendo puesto sobre un elemento droppable no exista en otro elemento droppable
      const alreadyInDroppable = droppables.filter(drop => drop.task !== null && drop.task.id == e.active.id)
      const indexOfDroppable = droppables.findIndex(drop => drop.id === e.over.id)

      if (droppables[indexOfDroppable].task != null) {
        console.log('Este ya tiene dueño papi!')
      }
      else {
        if (typeof alreadyInDroppable[0] == 'object') {
          //aca obtengo el indice en el arreglo del elemento en el que se dropeo el elemento dragable
          const indexOfDroppable = droppables.findIndex(drop => drop.id === e.over.id)

          //aca obtengo el indice en el arreglo de los draggables del elemento draggable que esta siendo dropeado en el contenedor droppable
          const indexOfDraggable = draggables.findIndex(drag => drag.id == e.active.id)

          const newDraggables = [...draggables];
          newDraggables[indexOfDraggable] = { ...newDraggables[indexOfDraggable], isDropped: true }


          const newDroppables = [...droppables];
          const indexToChange = newDroppables.findIndex(drop => drop == alreadyInDroppable[0])
          newDroppables[indexToChange] = { ...newDroppables[indexToChange], task: null, isDropped: false }
          newDroppables[indexOfDroppable] = {
            ...newDroppables[indexOfDroppable],
            id: e.over.id,
            isDropped: true,
            task: newDraggables[indexOfDraggable],
          }

          console.log(newDraggables)
          console.log(newDroppables)
          setDraggables(d => d = newDraggables);
          setDroppables(d => d = newDroppables)
          if(authUser != null){
            console.log(authUser.uid)
            fetch(`https://myroutine-back-production.up.railway.app/users/${authUser.uid}/droppables`,{
              method:'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({drops: newDroppables, drags:newDraggables})
            })
          }
        }
        else {
          //aca obtengo el indice en el arreglo del elemento en el que se dropeo el elemento dragable
          const indexOfDroppable = droppables.findIndex(drop => drop.id === e.over.id)

          //aca obtengo el indice en el arreglo de los draggables del elemento draggable que esta siendo dropeado en el contenedor droppable
          const indexOfDraggable = draggables.findIndex(drag => drag.id == e.active.id)

          const newDraggables = [...draggables];
          newDraggables[indexOfDraggable] = { ...newDraggables[indexOfDraggable], isDropped: true }


          const newDroppables = [...droppables];
          newDroppables[indexOfDroppable] = {
            ...newDroppables[indexOfDroppable],
            id: e.over.id,
            isDropped: true,
            task: newDraggables[indexOfDraggable],
          }

          console.log(newDraggables)
          console.log(newDroppables)
          setDraggables(d => d = newDraggables);
          setDroppables(d => d = newDroppables)
          //Aca debo actualizar la base de datos y cambiar en la lista de tareas la propiedad droppedIn con el id del droppable 

          if(authUser != null){
            console.log(authUser.uid)
            fetch(`https://myroutine-back-production.up.railway.app/users/${authUser.uid}/droppables`,{
              method:'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({drops: newDroppables, drags:newDraggables})
            })
          }

        }

      }

    }
    else {
      console.log(e)

      const indexOfDraggable = draggables.findIndex(drag => drag.id == e.active.id)
      const newDraggables = [...draggables];
      newDraggables[indexOfDraggable] = { ...newDraggables[indexOfDraggable], isDropped: false }

      const indexOfDroppable = droppables.findIndex(drop => drop.task != null && drop.task.id === e.active.id)
      const newDroppables = [...droppables];

      newDroppables[indexOfDroppable] = { ...newDroppables[indexOfDroppable], isDropped: false, task: null }

      setDraggables(d => d = newDraggables);
      setDroppables(d => d = newDroppables)
      if(authUser != null){
        console.log(authUser.uid)
        fetch(`https://myroutine-back-production.up.railway.app/users/${authUser.uid}/droppables`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({drops: newDroppables, drags:newDraggables})
        })
      }

    }

    setOnDrag(false)
  }

  function handleDragStart(e){
    console.log(e)
    setOnDrag(true);
  }


  function signIn() {
    signInWithPopup(auth, provider)
      .then(async (result) =>  {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(user.displayName, user.email, user.photoURL, user.uid)
        console.log('Aca llego')
        await fetch('https://myroutine-back-production.up.railway.app/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }) 
        }) 
        .then((res)=>console.log(res))
        
        console.log('Aca tambien llego')
        setAuthUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      })
      .catch((error) => {
        
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('error desde el catch: '+ error)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }


  return (
    <div className='cont-app'>
      
      <header className="menu">
        <div className='profile-section'>
          <img src={authUser ? authUser.photoURL : ""} alt="" />
          <b>{authUser ? authUser.displayName : ""}</b>
          {
            authUser ? "" : <GoogleButton onClick={()=>signIn()}/>
          }
          
        </div>
        <div className='cont-nav'>
          <nav>
            <ul>
              <li onClick={() => setService('myday')} >Mi dia</li>
               {/* <li onClick={() => setService('myweek')} > <a href="/mi-semana">Mi semana</a> </li> */}
              <li onClick={() => setService('remembers')} >Recordatorios</li>
            </ul> 
          </nav>
        </div>
      </header>
      <section className='sect-routines'>



        <DndContext onDragStart={(e)=>handleDragStart(e)} stateOnDrag={onDrag} onDragEnd={handleDragEnd}>
          <div className='routine'>

            <div className='first'>
              <div className='cont-routine' style={onDrag ? {overflow:'hidden'} : {overflow:'auto'}} >

                <div className='cont-hours'>
                  <div>Hora</div>
                  {
                    droppables.map((hour) => {
                      return <div key={hour.id} >{hour.hour}</div>
                    })
                  }

                </div>
                <div className='cont-activities'>
                  <div className='hoy'>Hoy</div>
                  <ContainerDrops drops={droppables} auth={authUser} setDrags={setDraggables} setDrops={setDroppables}/>

                </div>
              </div>
            </div>
            
          </div>

          <div className='sect-tasks'>
            <div className="first">
              <div className='title-misTareas'> 
                <b>Mis tareas</b>
              </div>
              <div className='cont-tasks'  >
              
                <ContainerDrags drags={draggables} auth={authUser} setDrags={setDraggables} setDrops={setDroppables} ></ContainerDrags>
               
                
              </div>
              
            </div>
            <div className="second">
            <SpringModal user={authUser} drags={draggables} setDrags={setDraggables}/>
            </div>
          </div>
        </DndContext>
      </section>
    </div>
  )
}

export default App
