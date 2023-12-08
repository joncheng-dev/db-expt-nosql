import React from "react";
import PropTypes from "prop-types";

function InventoryEntryDetail(props) {
  const { entry, onClickingDelete, onClickingEdit } = props;

  return (
    <React.Fragment>
      <h1>Inventory Entry Detail</h1>
      <h3>{entry.name}</h3>
      <p>{entry.location}</p>
      <p>{entry.description}</p>
      <button onClick={onClickingEdit}>Edit entry</button>
      <button onClick={() => onClickingDelete(entry.id)}>Delete Entry</button>
      <hr />
    </React.Fragment>
  );
}

InventoryEntryDetail.propTypes = {
  entry: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
};

export default InventoryEntryDetail;
