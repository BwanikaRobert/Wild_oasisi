import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");
  if (error) {
    throw new Error("Cabins couldnt be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    throw new Error(`Cabin ${id} couldnt be deleted`);
  }
  return data;
}

export async function createEditCabin(newCabin, Id) {
  const isPathString = typeof newCabin.image === "string";
  const imgName = isPathString
    ? ""
    : `${Math.random()}-${newCabin.image[0].name.replaceAll("/", "")}`;
  const imgPath = isPathString
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins_images//${imgName}`;
  // 1. Create cabin
  let query = supabase.from("Cabins");

  if (Id) {
    query = query.update({ ...newCabin, image: imgPath }).eq("id", Id);
  }
  if (!Id) {
    query = query.insert([{ ...newCabin, image: imgPath }]);
  }
  const { data, error } = await query.select().single();
  // edit cabin

  if (error) {
    throw new Error(`Cabin couldn't be added`);
  }
  // 2. Upload image
  if (!isPathString) {
    const { error: storageError } = await supabase.storage
      .from("cabins_images")
      .upload(imgName, newCabin.image[0]);
    // Delete cabin if img wasnot uploaded
    if (storageError) {
      await supabase.from("Cabins").delete().eq("id", data.id);
      throw new Error("Image couldn't uploaded and cabin wasn't created ");
    }
  }
  return data;
}
