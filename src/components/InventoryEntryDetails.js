import React from "react";
import PropTypes from "prop-types";

function InventoryEntryDetail(props) {
  const { entry, onClickingDelete, onClickingEdit, onClickingCheckout, onClickingReturn } = props;

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
      <p>Available: {entry.available ? "yes" : "no"}</p>
      <p>Checked Out By: {entry.checkedOutBy}</p>
      <p>Date Checked Out: {entry.dateCheckedOut}</p>
      <button onClick={() => onClickingCheckout(entry.id)}>Check Out Item</button>
      <button onClick={() => onClickingReturn(entry.id)}>Return Item</button>
      <br />
      <hr />
      <button onClick={onClickingEdit}>Edit entry</button>
      <br />
      <button onClick={() => onClickingDelete(entry.id)}>Delete Entry</button>
      <hr />
    </React.Fragment>
  );
}

InventoryEntryDetail.propTypes = {
  entry: PropTypes.object,
  onClickingCheckout: PropTypes.func,
  onClickingReturn: PropTypes.func,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
};

export default InventoryEntryDetail;
