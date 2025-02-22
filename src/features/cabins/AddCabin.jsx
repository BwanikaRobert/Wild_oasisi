import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [showModal, setShowModal] = useState(false);
  function handleClose() {
    setShowModal(false);
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowModal((value) => !value);
        }}
      >
        Add a Cabin
      </Button>

      {showModal && (
        <Modal>
          <CreateCabinForm close={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
