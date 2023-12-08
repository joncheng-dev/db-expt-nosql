import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function InventoryAddForm() {
  function handleNewEntryFormSubmission(event) {
    event.preventDefault();
    props.onNewEntryCreation({
      name: event.target.name.value,
      description: event.target.description.value,
      location: event.target.location.value,
    });
  }
  return (
    <React.Fragment>
      <ReusuableForm formSubmissionHandler={handleNewEntryFormSubmission} buttonText="Add Entry" />
    </React.Fragment>
  );
}

InventoryAddForm.propTypes = {
  onNewEntryCreation: PropTypes.func,
};

export default InventoryAddForm;
