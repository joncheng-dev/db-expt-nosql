import React from "react";
import PropTypes from "prop-types";

function InventoryEntry(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenEntryClicked(props.id)}>
        <h2>{props.name}</h2>
        <p>
          <strong>{props.location}</strong>
        </p>
        <p>{props.description}</p>
        <p>Checked Out By: {props.checkedOutBy}</p>
      </div>
      <hr />
    </React.Fragment>
  );
}

InventoryEntry.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  whenEntryClicked: PropTypes.func,
};

export default InventoryEntry;
