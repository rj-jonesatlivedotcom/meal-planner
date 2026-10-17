import { notFound } from "next/navigation";
import { datedPlannerEnabled } from "@/lib/supabase/config";
import CalendarTestSession from "@/components/calendar/CalendarTestSession";

export default function CalendarTestPage() {
  if (process.env.NODE_ENV !== "development" || !datedPlannerEnabled()) notFound();
  return <CalendarTestSession />;
}
