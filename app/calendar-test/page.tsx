import { notFound } from "next/navigation";
import { datedPlannerEnabled } from "@/lib/supabase/config";
import CalendarTestSession from "@/components/calendar/CalendarTestSession";

export default function CalendarTestPage() {
  if (!datedPlannerEnabled()) notFound();
  return <CalendarTestSession />;
}
