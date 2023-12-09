import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function InventoryEditForm(props) {
  const { entry } = props;

  function handleEditEntryFormSubmission(event) {
    event.preventDefault();
    props.onFormSubmit({
      name: event.target.name.value,
      description: event.target.description.value,
      location: event.target.location.value,
      checkedOutBy: entry.checkedOutBy,
      available: entry.available,
      id: entry.id,
    });
  }

  return (
    <React.Fragment>
      <ReusableForm formSubmissionHandler={handleEditEntryFormSubmission} buttonText="Update Entry" />
    </React.Fragment>
  );
}

InventoryEditForm.propTypes = {
  onFormSubmit: PropTypes.func,
  entry: PropTypes.object,
};

export default InventoryEditForm;
