import Link from "next/link";

export default function SignupSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-200 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>

        <h1 className="mt-5 text-2xl font-extrabold text-gray-900">
          Account created
        </h1>

        <p className="mt-3 text-gray-600">
          Please check your email to confirm your RenalPlan account.
        </p>

        <Link
          href="/auth/login"
          className="mt-6 inline-block w-full rounded-lg bg-[#0B3B75] px-4 py-3 font-semibold text-white hover:bg-[#082E5C]"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}