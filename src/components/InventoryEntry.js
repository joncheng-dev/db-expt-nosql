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
        <p>Available: {props.available ? "yes" : "no"}</p>
        <p>Checked Out By: {props.checkedOutBy}</p>
        <p>Date Checked Out: {props.dateCheckedOut}</p>
      </div>
      <hr />
    </React.Fragment>
  );
}

InventoryEntry.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  available: PropTypes.bool,
  checkedOutBy: PropTypes.string,
  dateCheckedOut: PropTypes.string,
  id: PropTypes.string,
  whenEntryClicked: PropTypes.func,
};

export default InventoryEntry;
