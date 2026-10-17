import { calendarServer } from "@/lib/calendarServer";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  return calendarServer.feed((await context.params).token);
}
