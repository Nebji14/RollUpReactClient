import supabase from "./supabaseClient";

export async function uploadImage(file) {
  // création du nom de l'image (unique)
  const filePath = `tables/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("tables-images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("tables-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
