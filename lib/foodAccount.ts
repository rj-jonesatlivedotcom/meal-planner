import type { SupabaseClient } from "@supabase/supabase-js";
import { validFoodSnapshot, snapshotForQuantity, type PlannedSnack, type SavedFood } from "./foodSnacks";

// Supabase is the sole authority for signed-in accounts. No local/account merging.
export function foodAccount(client: SupabaseClient, owner: string) {
  async function authenticated() {
    const { data, error } = await client.auth.getUser();
    if (error || data.user?.id !== owner) throw new Error("Your account changed. Reload and try again.");
  }
  const fail = (error: unknown) => { if (error) throw new Error("Unable to save or load foods. Please try again."); };
  return {
    async foods(): Promise<SavedFood[]> {
      await authenticated();
      const { data, error } = await client.from("user_food_products").select("*").eq("user_id", owner).or("favourite.eq.true,last_scanned_at.not.is.null").order("last_scanned_at", { ascending: false, nullsFirst: false });
      fail(error);
      if ((data ?? []).some(row => row.user_id !== owner)) throw new Error("Food account mismatch");
      return data ?? [];
    },
    async library(action: "scan" | "favourite" | "remove" | "clear", barcode = "", name = "", favourite?: boolean) {
      await authenticated();
      const { error } = await client.rpc("rp_food_library", { p_action: action, p_barcode: barcode, p_name: name, p_favourite: favourite ?? null });
      fail(error);
    },
    async snacks(from: string, to: string): Promise<PlannedSnack[]> {
      await authenticated();
      const { data, error } = await client.from("planner_snacks").select("*").eq("user_id", owner).gte("planned_on", from).lte("planned_on", to).order("created_at");
      fail(error);
      if ((data ?? []).some(row => row.user_id !== owner || !validFoodSnapshot(row.snapshot))) throw new Error("Invalid saved snack");
      return data ?? [];
    },
    async save(snack: PlannedSnack) {
      await authenticated();
      if (snack.user_id !== owner || !validFoodSnapshot(snack.snapshot)) throw new Error("Invalid snack account or nutrition");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(snack.planned_on)) throw new Error("Choose a valid date");
      const { error } = await client.from("planner_snacks").upsert({ ...snack, snapshot: snapshotForQuantity(snack.snapshot, snack.quantity) }, { onConflict: "id" });
      fail(error);
    },
    async remove(id: string) {
      await authenticated();
      const { error } = await client.from("planner_snacks").delete().eq("user_id", owner).eq("id", id);
      fail(error);
    },
  };
}
