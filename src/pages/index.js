import React, { useState, useContext, useEffect } from "react";
import { ListerContext } from "@/components/Context";
import styles from "../styles/home.module.css";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import Head from "next/head";

function Home() {
  const [creating, setCreating] = useState(false);
  const [listname, setListName] = useState("");
  const { lists, setLists } = useContext(ListerContext);

  useEffect(() => {
    const localLists = localStorage.getItem("lists");
    if (!localLists) {
      localStorage.setItem("lists", "[]");
    } else {
      setLists(JSON.parse(localLists));
    }
    setListName("");
  }, [setListName, setLists]);

  const listDone = () => {
    setCreating(false);
    const newList = { name: listname, tasks: [], key: uuid() };
    localStorage.setItem("lists", JSON.stringify([...lists, newList]));
    setLists(JSON.parse(localStorage.getItem("lists")));
  };

  const removeList = (ev, key) => {
    ev.preventDefault();
    const updatedList = lists.filter((list) => list.key !== key);
    localStorage.setItem("lists", JSON.stringify(updatedList));
    setLists(JSON.parse(localStorage.getItem("lists")));
  };

  return (
    <div className={styles.home}>
      <Head><title>Home - Lister</title></Head>
      <h1>Lister/home</h1>
      {creating ? (
        <div className={styles.createSection}>
          <input
            className={styles.listname}
            onChange={(e) => setListName(e.target.value)}
            placeholder="List Name"
          ></input>
          <button className={styles.done} onClick={(e) => listDone(listname)}>
            Done
          </button>
        </div>
      ) : (
        <div className={styles.createSection}>
          <button className={styles.create} onClick={(e) => setCreating(true)}>
            New List
          </button>
        </div>
      )}
      <div className={styles.listsMenu}>
        {lists.map((list) => {
          return (
            <Link href={`/lists/${list.key}`} key={list.key}>
              <h3>{list.name}</h3>
              <button onClick={(ev) => removeList(ev, list.key)}>delete</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
