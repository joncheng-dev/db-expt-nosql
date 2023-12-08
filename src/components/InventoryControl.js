import React, { useState, useEffect } from "react";
import InventoryList from "./InventoryList";
import InventoryAddForm from "./InventoryAddForm";

function InventoryControl() {
  // manage state
  const [addFormVisible, setAddFormVisibility] = useState(false);
  const [mainInventoryList, setMainInventoryList] = useState([]);
  // const [selectedEntry, setSelectedEntry] = useState(null);

  // functions
  const handleClick = () => {
    setAddFormVisibility(!addFormVisible);
  };

  // conditional rendering
  return (
    <main>
      {addFormVisible ? <InventoryAddForm /> : <InventoryList list={mainInventoryList} />}
      <button onClick={handleClick}>{addFormVisible ? "Back" : "Add New Entry"}</button>
    </main>
  );
}

export default InventoryControl;
