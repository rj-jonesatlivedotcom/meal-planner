import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      console.error("Supabase environment variables are missing.");

      return NextResponse.json(
        { error: "Account deletion is not currently configured." },
        { status: 500 }
      );
    }

    // Get the user's access token from the browser request.
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "You must be signed in to delete your account." },
        { status: 401 }
      );
    }

    const accessToken = authHeader.replace("Bearer ", "");

    // Create a normal Supabase client using the user's access token.
    const supabase = createAdminClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    // Verify the access token and identify the user.
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      console.error("Authentication error:", userError);

      return NextResponse.json(
        { error: "You must be signed in to delete your account." },
        { status: 401 }
      );
    }

    // The service-role key is only used server-side for deletion.
    const admin = createAdminClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Delete the authenticated Supabase user.
    const { error: deleteError } =
      await admin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error("Supabase account deletion error:", deleteError);

      return NextResponse.json(
        { error: "We couldn't delete your account. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected account deletion error:", error);

    return NextResponse.json(
      { error: "We couldn't delete your account. Please try again." },
      { status: 500 }
    );
  }
}