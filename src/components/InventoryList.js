import React from "react";
import InventoryEntry from "./InventoryEntry";
import PropTypes from "prop-types";

function InventoryList(props) {
  return (
    <React.Fragment>
      <h1>Inventory List</h1>
      {props.list.map((entry) => (
        <InventoryEntry name={entry.name} location={entry.location} description={entry.description} id={entry.id} key={entry.id} />
      ))}
    </React.Fragment>
  );
}

InventoryList.propTypes = {
  list: PropTypes.array,
  onEntrySelection: PropTypes.func,
};

export default InventoryList;
