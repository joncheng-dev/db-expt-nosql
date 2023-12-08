import React from "react";
import PropTypes from "prop-types";

function InventoryEntry(props) {
  return (
    <React.Fragment>
      <div>
        <h2>{props.name}</h2>
        <p>
          <strong>{props.location}</strong>
        </p>
        <p>{props.description}</p>
      </div>
    </React.Fragment>
  );
}

InventoryEntry.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
};

export default InventoryEntry;
