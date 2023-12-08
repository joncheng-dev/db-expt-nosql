import React, { useState, useEffect } from "react";
import InventoryList from "./InventoryList";
import InventoryAddForm from "./InventoryAddForm";
import db from "./../firebase.js";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

function InventoryControl() {
  // manage state
  const [addFormVisible, setAddFormVisibility] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  // const [selectedEntry, setSelectedEntry] = useState(null);
  const [error, setError] = useState(null);

  // populate inventory list using database
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "inventoryEntries"),
      (collectionSnapshot) => {
        const entries = [];
        collectionSnapshot.forEach((entry) => {
          entries.push({
            name: entry.data().name,
            location: entry.data().location,
            description: entry.data().description,
            id: entry.id,
          });
        });
        setInventoryList(entries);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  // functions
  const handleClick = () => {
    setAddFormVisibility(!addFormVisible);
  };

  const handleAddingNewEntryToList = async (entry) => {
    await addDoc(collection(db, "inventoryEntries"), entry);
    setAddFormVisibility(false);
  };

  // conditional rendering
  return (
    <main>
      {addFormVisible ? <InventoryAddForm onFormSubmit={handleAddingNewEntryToList} /> : <InventoryList list={inventoryList} />}
      <button onClick={handleClick}>{addFormVisible ? "Back" : "Add New Entry"}</button>
    </main>
  );
}

export default InventoryControl;
