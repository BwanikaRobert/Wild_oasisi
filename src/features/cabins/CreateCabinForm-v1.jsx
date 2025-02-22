// // import styled from "styled-components";

// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createCabin } from "../../services/apiCabins";
// import toast from "react-hot-toast";
// import FormRow, { StyledFormRow } from "../../ui/FormRow";

// function CreateCabinForm() {
//   const { register, handleSubmit, formState, getValues } = useForm();
//   const { errors } = formState;
//   const queryClient = useQueryClient();
//   const { mutate, isLoading: isCreating } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success("New Cabin created");
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//       // reset();
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });
//   function onSubmit(data) {
//     console.log(data.image);
//     mutate({ ...data, image: data.image[0] });
//   }
//   function onError(errors) {
//     console.log(errors);
//   }
//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow
//         label="Cabin name"
//         error={errors?.name?.message && errors.name.message}
//       >
//         <Input
//           type="text"
//           id="name"
//           {...register("name", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//       <FormRow
//         label="Max Capacity"
//         error={errors?.maxCapacity?.message && errors.maxCapacity.message}
//       >
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast one",
//             },
//           })}
//         />
//       </FormRow>
//       <FormRow
//         label="Regular Price"
//         error={errors?.regularPrice?.message && errors.regularPrice.message}
//       >
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "This field should atleast 1",
//             },
//           })}
//         />
//       </FormRow>
//       <FormRow
//         label="Discount"
//         error={errors?.discount?.message && errors.discount.message}
//       >
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is requred",
//             validate: (value) =>
//               value <= getValues().regularPrice ||
//               "The discount should less than the price",
//           })}
//         />
//       </FormRow>
//       <FormRow
//         label="Description"
//         error={errors?.description?.message && errors.description.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//       <FormRow label="Cabin photo">
//         <FileInput id="image" accept="image/*" {...register("image")} />
//       </FormRow>
//       {/* <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "This field should atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "This field should atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) =>
//               value < getValues()?.regularPrice ||
//               "The discount should less than the price",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description")}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow> */}

//       <StyledFormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Add cabin</Button>
//       </StyledFormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;
