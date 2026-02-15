import { supabase } from "../supabase/browserClient";

export async function getContributions() {
  try {
    let { data: therapists, error } = await supabase
      .from("contributions")
      .select("*");

    if (error) throw error;

    return therapists;
  } catch (error) {
    return {
      message: "we couldnt get it",
      error: error.message,
    };
  }
}
