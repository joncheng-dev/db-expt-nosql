import React, { useState, useEffect } from "react";
import InventoryList from "./InventoryList";
import InventoryAddForm from "./InventoryAddForm";
import InventoryEntryDetail from "./InventoryEntryDetails.js";
import InventoryEditForm from "./InventoryEditForm.js";
import { db, auth } from "./../firebase.js";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc, runTransaction, arrayUnion, arrayRemove } from "firebase/firestore";

function InventoryControl() {
  // manage state
  const [addFormVisible, setAddFormVisibility] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  // Use this to determine conditional rendering for logged in vs not.
  const isAuthorized = auth.currentUser ? true : false;

  //#region populate inventory list using database
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
            dateCheckedOut: entry.data().dateCheckedOut,
            available: entry.data().available,
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
  //#endregion populate inventory list using database

  //#region functions
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

  const handleCheckoutAndReturn = async (id, task) => {
    try {
      await runTransaction(db, async (transaction) => {
        // read both the target item entry AND the current user
        const entryRef = doc(db, "inventoryEntries", selectedEntry.id);
        const userRef = doc(db, "users", auth.currentUser.uid);
        // read the information in both docs
        const entryDoc = await transaction.get(entryRef);
        if (!entryDoc.exists()) {
          throw "Item document does not exist";
        }
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw "User document does not exist";
        }
        // if both user and item exist, continue with the transaction
        const availabilityStatus = !entryDoc.data().available;
        const userCheckedOutItems = userDoc.data().itemsCheckedOut || {};
        // Decide which transaction to carry out
        switch (task) {
          case "check out":
            // update the specific entry identified by "id" in this object first.
            userCheckedOutItems[id] = {
              dateCheckedOut: new Date().toDateString(),
            };
            // update both user and item docs
            transaction.update(entryRef, {
              available: availabilityStatus,
              checkedOutBy: auth.currentUser.email,
              dateCheckedOut: new Date().toDateString(),
            });
            transaction.update(userRef, {
              itemsCheckedOut: userCheckedOutItems,
            });
            break;
          case "return":
            if (userCheckedOutItems[id]) {
              delete userCheckedOutItems[id];
              transaction.update(entryRef, { available: availabilityStatus, checkedOutBy: null, dateCheckedOut: null });
              transaction.update(userRef, { itemsCheckedOut: userCheckedOutItems });
            } else {
              throw "Item is not checked out.";
            }
            break;
          default:
            break;
        }
      });
      console.log("Transaction successful.");
    } catch (e) {
      console.log("Transaction failed.", e);
    }
  };
  //#endregion functions

  // conditional rendering
  let currentlyVisibleState = null;
  let buttonText = null;
  if (editing) {
    currentlyVisibleState = <InventoryEditForm entry={selectedEntry} onFormSubmit={handleEditingEntryInList} />;
    buttonText = "Return to Inventory List";
  } else if (selectedEntry != null) {
    currentlyVisibleState = (
      <InventoryEntryDetail
        entry={selectedEntry}
        onClickingCheckoutOrReturn={handleCheckoutAndReturn}
        onClickingEdit={handleEditClick}
        onClickingDelete={handleDeletingEntry}
      />
    );
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
