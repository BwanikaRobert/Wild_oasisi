// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, close }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data.image);
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image: data.image }, Id: editId },
        {
          onSuccess: () => {
            close();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: data.image },
        {
          onSuccess: () => {
            reset();
            close();
          },
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow
        label="Cabin name"
        error={errors?.name?.message && errors.name.message}
      >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        label="Max Capacity"
        error={errors?.maxCapacity?.message && errors.maxCapacity.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast one",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Regular Price"
        disabled={isWorking}
        error={errors?.regularPrice?.message && errors.regularPrice.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "This field should atleast 1",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Discount"
        error={errors?.discount?.message && errors.discount.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is requred",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "The discount should less than the price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description"
        error={errors?.description?.message && errors.description.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>
      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={close}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
