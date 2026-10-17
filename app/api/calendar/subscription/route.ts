import { calendarServer } from "@/lib/calendarServer";
export const dynamic = "force-dynamic";
export const GET = (request: Request) => calendarServer.accountRequest(request, "subscription");
export const POST = (request: Request) => calendarServer.accountRequest(request, "subscription");
export const DELETE = (request: Request) => calendarServer.accountRequest(request, "subscription");
