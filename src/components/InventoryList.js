import React from "react";
import InventoryEntry from "./InventoryEntry";
import PropTypes from "prop-types";

function InventoryList(props) {
  return (
    <React.Fragment>
      <h1>Inventory List</h1>
      <hr />
      {props.list.map((entry) => (
        <InventoryEntry
          whenEntryClicked={props.onEntrySelection}
          name={entry.name}
          location={entry.location}
          description={entry.description}
          available={entry.available}
          checkedOutBy={entry.checkedOutBy}
          id={entry.id}
          key={entry.id}
        />
      ))}
    </React.Fragment>
  );
}

InventoryList.propTypes = {
  list: PropTypes.array,
  onEntrySelection: PropTypes.func,
};

export default InventoryList;
