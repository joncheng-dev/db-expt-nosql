import React from "react";
import PropTypes from "prop-types";

function InventoryEntryDetail(props) {
  const { entry, onClickingDelete, onClickingEdit, onClickingCheckout } = props;

  return (
    <React.Fragment>
      <h1>Inventory Entry Detail</h1>
      <hr />
      <h3>
        <strong>Name: </strong>
        {entry.name}
      </h3>
      <p>
        <strong>Location: </strong>
        {entry.location}
      </p>
      <p>
        <strong>Description: </strong>
        {entry.description}
      </p>
      <p>
        <strong>Checked Out By: </strong>
        {entry.checkedOutBy}
      </p>
      <button onClick={onClickingCheckout}>Check Out Item</button>
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
