import styles from '@/styles/task.module.css'
import { useState, useEffect, useContext } from 'react'
import { ListerContext } from './Context'

function Task({ removeTask, toggleTaskValue, task, editTask, setIsEditing }) {
  const [editing, setEditing] = useState(true)
  const [newName, setNewName] = useState(task.name)

  useEffect(()=>{
    setEditing(false)
    setIsEditing(false)
  }, [setEditing])

  return (
    <div 
    className={styles.task} 
    key={task.key}>
      <div className={editing ? styles.checksideOnEdit : styles.checkside}>
        {editing ? null : (
        <input type="checkbox" 
        id={task.key}
        className={styles.checkBox}
        checked={task.value}
        onChange={()=>toggleTaskValue(task.key)}>
        </input>)}
        { editing ? (
          <input className={styles.newName} 
          onChange={ev=>setNewName(ev.target.value)}
          defaultValue={task.name}>
          </input>
        ) : (
          <label htmlFor={task.key}>
            {task.name}
        </label>
      )}
    </div>
    <div className={styles.buttons}>
      {editing ? (
        <button
          className={styles.editButton}
          onClick={()=>{
            editTask(task.key, newName)
            setEditing(false)
            setIsEditing(false)
          }}
        > save
        </button>
      ) : (
        <button 
          className={styles.editButton}
          onClick={ev => {
            setEditing(true);
            setIsEditing(true)}}
          >
            edit
          </button>
      )}
      <button
        className={styles.removeButton}
        onClick={() => removeTask(task.key)}
      >
        remove
      </button>
    </div>
  </div>
  )
}

export default Task