import React, { useState, useEffect } from "react";
import InventoryList from "./InventoryList";
import InventoryAddForm from "./InventoryAddForm";
import InventoryEntryDetail from "./InventoryEntryDetails.js";
import InventoryEditForm from "./InventoryEditForm.js";
import db from "./../firebase.js";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

function InventoryControl() {
  // manage state
  const [addFormVisible, setAddFormVisibility] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

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
            checkedOutBy: entry.data().checkedOutBy,
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
    if (selectedEntry != null) {
      setAddFormVisibility(false);
      setSelectedEntry(null);
      setEditing(false);
    } else {
      setAddFormVisibility(!addFormVisible);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleAddingNewEntryToList = async (entry) => {
    await addDoc(collection(db, "inventoryEntries"), entry);
    setAddFormVisibility(false);
  };

  const handleChangingSelectedEntry = (id) => {
    const selection = inventoryList.filter((entry) => entry.id === id)[0];
    setSelectedEntry(selection);
  };

  const handleEditingEntryInList = async (entry) => {
    const entryRef = doc(db, "inventoryEntries", entry.id);
    await updateDoc(entryRef, entry);
    setEditing(false);
    setSelectedEntry(null);
  };

  const handleDeletingEntry = async (id) => {
    await deleteDoc(doc(db, "inventoryEntries", id));
    setSelectedEntry(null);
  };

  // conditional rendering
  let currentlyVisibleState = null;
  let buttonText = null;
  if (editing) {
    currentlyVisibleState = <InventoryEditForm entry={selectedEntry} onFormSubmit={handleEditingEntryInList} />;
    buttonText = "Return to Inventory List";
  } else if (selectedEntry != null) {
    currentlyVisibleState = <InventoryEntryDetail entry={selectedEntry} onClickingEdit={handleEditClick} onClickingDelete={handleDeletingEntry} />;
    buttonText = "Return to Inventory List";
  } else if (addFormVisible) {
    currentlyVisibleState = <InventoryAddForm onFormSubmit={handleAddingNewEntryToList} />;
    buttonText = "Return to Inventory List";
  } else {
    currentlyVisibleState = <InventoryList list={inventoryList} onEntrySelection={handleChangingSelectedEntry} />;
    buttonText = "Add Entry";
  }

  return (
    <main>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button>
    </main>
  );
}

export default InventoryControl;
