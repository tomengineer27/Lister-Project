import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ListerContext } from "@/components/Context";
import styles from "@/styles/list.module.css";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import Head from "next/head";
import Task from "@/components/Task.jsx";
import Sortable from "sortablejs";

function List() {
  const router = useRouter();
  const { lists } = useContext(ListerContext);
  const [taskName, setTaskName] = useState("");
  const [creating, setCreating] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false)

  const updateLocalStorage = (listKey, tasks) => {
    const LSlist = JSON.parse(localStorage.getItem("lists"));
    const updatedList = LSlist.map((list) => {
      if (list.key === listKey) {
        return { ...list, tasks };
      }
      return list;
    });
    localStorage.setItem("lists", JSON.stringify(updatedList));
  };

  const addTask = () => {
    setCreating(false);
    const newTask = { name: taskName, key: uuid(), value:false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateLocalStorage(list.key, updatedTasks);
  };

  const removeTask = (key) => {
    const list = lists.find((list) => list.key === router.query.id);
    const updatedTasks = tasks.filter(task=>task.key !== key)
    setTasks(updatedTasks)
    updateLocalStorage(list.key, updatedTasks)
  }

  const toggleTaskValue = (key) => {
    const updatedTasks = tasks.map((task) =>
      task.key === key ? { ...task, value: !task.value } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(list.key, updatedTasks);
  };

  const editTask = (key, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateLocalStorage(list.key, updatedTasks);
  };

  useEffect(() => {
    const LSlists = localStorage.getItem("lists");
    if (LSlists) {
      const parsedLists = JSON.parse(LSlists);
      const list = parsedLists.find((list) => list.key === router.query.id);
      if (list) {
        setTasks(list.tasks);

        if (typeof window !== "undefined") {
          const htmlList = document.getElementById("tasklist");
          Sortable.create(htmlList, {
            animation: 100,
            dragClass: "drag",
          });
        }
      }
    }
  }, [router.query.id]);

  const list = lists.find((list) => list.key === router.query.id);

  if (!list) {
    return (
      <div className={styles.notFound}>
        <Head><title>List Not Found</title></Head>
        <h1>That list doesn't exist</h1>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <Head><title>{list.name} - Lister</title></Head>
      <h1>
        <Link href="/">Lister</Link>/{list.name}
      </h1>
      {creating ? (
        <div className={styles.addTaskSection}>
          <input
            className={styles.taskName}
            placeholder="Task Name"
            onChange={(ev) => setTaskName(ev.target.value)}
          ></input>
          <button className={styles.done} onClick={addTask}>
            done
          </button>
        </div>
      ) : (
        <div className={styles.addTaskSection}>
          <button
            className={styles.addTaskButton}
            onClick={() => setCreating(true)}
          >
            add a task
          </button>
        </div>
      )}
      
      <div className={styles.tasks} id="tasklist">
        {tasks.map((task) => {
          return (
            <Task key={task.key} removeTask={removeTask} toggleTaskValue={toggleTaskValue} task={task} editTask={editTask} setIsEditing={setIsEditing}></Task>
          )
        })}
      </div>
    </div>
  );
}

export default List;
