"use server";

import createServerSupabaseClient from "../supabase/serverClient";

export async function enrollContributor(formData) {
  const supabase = await createServerSupabaseClient();
  try {
    const { data, error } = await supabase
      .from("contributions")
      .insert([
        {
          name: formData.name,
          amount: formData.amount,
          avatar: formData.avatar,
        },
      ])
      .select();

    if (error) throw error;

    return {
      success: true,
      message: "contribution recorded successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function endContributions() {
  const supabase = await createServerSupabaseClient();
  try {
    const { error } = await supabase
      .from("contributions")
      .delete()
      .neq("id", 0);

    if (error) throw error;

    return {
      success: true,
      message: "All contributions deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
