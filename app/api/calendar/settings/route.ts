import { calendarServer } from "@/lib/calendarServer";
export const dynamic = "force-dynamic";
export const GET = (request: Request) => calendarServer.accountRequest(request, "settings");
export const PUT = (request: Request) => calendarServer.accountRequest(request, "settings");
