import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function InventoryAddForm(props) {
  function handleNewEntryFormSubmission(event) {
    event.preventDefault();
    props.onFormSubmit({
      name: event.target.name.value,
      description: event.target.description.value,
      location: event.target.location.value,
      checkedOutBy: null,
    });
  }
  return (
    <React.Fragment>
      <ReusableForm formSubmissionHandler={handleNewEntryFormSubmission} buttonText="Add Entry" />
    </React.Fragment>
  );
}

InventoryAddForm.propTypes = {
  onFormSubmit: PropTypes.func,
};

export default InventoryAddForm;
