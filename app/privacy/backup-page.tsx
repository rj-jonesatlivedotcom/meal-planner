"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B3B75] hover:underline"
          >
            <span aria-hidden="true">←</span>
            Back to My Account
          </Link>
        </div>

        <article className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-7 sm:px-10 sm:py-9">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0B3B75]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M12 3l7 3v5c0 4.7-3 8.1-7 10-4-1.9-7-5.3-7-10V6l7-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>

              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Security &amp; Data Protection
                </h1>
                <p className="mt-2 text-base leading-6 text-slate-600">
                  How RenalPlan protects and uses your personal information.
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Last updated: 28 September 2026
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 px-6 py-7 sm:px-10 sm:py-9">
            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                1. About this policy
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                This policy explains how RenalPlan handles personal information
                when you use the RenalPlan website, create an account, save
                recipes as favourites, set your dietary requirements, or use
                your Weekly Planner and related personal features.
              </p>
              <p className="mt-3 leading-7 text-slate-700">
                RenalPlan is designed to help people plan meals around their
                stated dietary requirements. It is not a substitute for advice
                from your renal team, dietitian, doctor, or other qualified
                healthcare professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                2. Information we collect
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Depending on how you use RenalPlan, we may process:
              </p>

              <ul className="mt-3 space-y-2 pl-5 leading-7 text-slate-700">
                <li className="list-disc">
                  <strong>Account information:</strong> your email address and
                  information needed to authenticate your account.
                </li>
                <li className="list-disc">
                  <strong>Dietary requirements:</strong> settings you choose
                  for salt/sodium, potassium, phosphate, purines and
                  carbohydrate ranges.
                </li>
                <li className="list-disc">
                  <strong>Planner information:</strong> meals you put into your
                  Weekly Planner and associated household/serving information.
                </li>
                <li className="list-disc">
                  <strong>Favourite recipes:</strong> the recipe IDs you choose
                  to save to your account.
                </li>
                <li className="list-disc">
                  <strong>Shopping and planning information:</strong> information
                  required to provide your shopping-list and meal-planning
                  features.
                </li>
                <li className="list-disc">
                  <strong>Technical information:</strong> limited information
                  needed to operate, secure and troubleshoot the website.
                </li>
              </ul>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <h3 className="font-bold text-[#0B3B75]">
                  Dietary information
                </h3>
                <p className="mt-2 leading-7 text-slate-700">
                  Some dietary requirements may reveal information about your
                  health or medical circumstances. RenalPlan treats this type
                  of information as sensitive and aims to collect only the
                  information needed to provide the features you choose to
                  use.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                3. How we use your information
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                We use personal information to:
              </p>
              <ul className="mt-3 space-y-2 pl-5 leading-7 text-slate-700">
                <li className="list-disc">
                  create and manage your RenalPlan account;
                </li>
                <li className="list-disc">
                  save and restore your personal meal-planning information;
                </li>
                <li className="list-disc">
                  apply the dietary requirements you select when filtering and
                  presenting recipes;
                </li>
                <li className="list-disc">
                  provide favourites, Weekly Planner and shopping-list
                  features;
                </li>
                <li className="list-disc">
                  maintain the security, reliability and functionality of the
                  website; and
                </li>
                <li className="list-disc">
                  respond to support, privacy or account requests.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                4. Lawful basis
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                RenalPlan will use the lawful basis that is appropriate to the
                particular processing activity. This may include processing
                that is necessary to provide the service you request,
                compliance with legal obligations, legitimate interests where
                applicable, and consent where consent is required.
              </p>
              <p className="mt-3 leading-7 text-slate-700">
                Where information amounts to special category data, such as
                health information, an additional condition under UK data
                protection law is required as well as an Article 6 lawful
                basis. RenalPlan will only process such information where the
                applicable legal requirements are met.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                5. Where your account data is stored
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                RenalPlan uses Supabase for account authentication and for
                storing certain account-related information, including saved
                meal plans, dietary requirements and favourites.
              </p>
              <p className="mt-3 leading-7 text-slate-700">
                Some RenalPlan settings and planning information may also be
                stored locally in your web browser so that the site can work
                correctly. Local browser storage can remain on your device
                until you clear it or the application removes it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                6. Sharing your information
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                RenalPlan does not sell your personal information. We only
                share personal information where necessary to operate the
                service, comply with the law, protect the service and its
                users, or where you have otherwise authorised or requested the
                sharing.
              </p>
              <p className="mt-3 leading-7 text-slate-700">
                Service providers may process information on RenalPlan&apos;s
                behalf. Where this happens, appropriate contractual and
                organisational safeguards should be used.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                7. Security
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                RenalPlan uses technical and organisational measures intended
                to protect personal information against unauthorised access,
                loss, misuse or alteration. These measures include account
                authentication, access controls and secure connections where
                supported by the services used to operate the website.
              </p>
              <p className="mt-3 leading-7 text-slate-700">
                No internet service can guarantee absolute security. You
                should use a strong, unique password for your RenalPlan
                account and keep your login details confidential.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                8. How long we keep information
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                We keep personal information only for as long as it is needed
                for the purposes described in this policy, unless a longer
                period is required or permitted by law.
              </p>
              <p className="mt-3 leading-7 text-slate-700">
                Account information and saved account features are generally
                retained while your account remains active. When an account is
                deleted, RenalPlan&apos;s account-deletion process is intended
                to remove the associated account data, subject to information
                that must be retained for legal, security or other legitimate
                purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                9. Your data protection rights
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Subject to the applicable legal conditions and exemptions, you
                may have rights including:
              </p>
              <ul className="mt-3 space-y-2 pl-5 leading-7 text-slate-700">
                <li className="list-disc">access to your personal data;</li>
                <li className="list-disc">
                  correction of inaccurate or incomplete information;
                </li>
                <li className="list-disc">
                  deletion of personal information in appropriate
                  circumstances;
                </li>
                <li className="list-disc">
                  restriction of processing in appropriate circumstances;
                </li>
                <li className="list-disc">
                  objection to certain processing; and
                </li>
                <li className="list-disc">
                  data portability where the relevant legal conditions apply.
                </li>
              </ul>
              <p className="mt-3 leading-7 text-slate-700">
                If processing is based on consent, you may also have the right
                to withdraw that consent. Withdrawal does not affect processing
                that took place before consent was withdrawn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                10. Account deletion
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                You can request deletion of your RenalPlan account using the
                Delete account option in My Account. RenalPlan may need to
                retain limited information where required by law or where
                necessary to establish, exercise or defend legal claims,
                prevent fraud or maintain security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                11. Children
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                RenalPlan is intended for adults. We do not knowingly ask
                children to provide personal information through the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">
                12. Changes to this policy
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                We may update this policy when RenalPlan&apos;s features,
                services or data-processing practices change. The latest
                version will be published on this page with an updated
                revision date.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-extrabold text-slate-900">
                Privacy questions or requests
              </h2>
              <p className="mt-2 leading-7 text-slate-700">
                If you have a question about your personal information or want
                to exercise a data protection right, please use the contact
                details provided by RenalPlan on the website.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                This policy is intended to explain RenalPlan&apos;s current
                approach to privacy and data protection. It should be reviewed
                against the final legal entity details, contact details,
                supplier arrangements, retention schedule and lawful-basis
                records before being treated as a final legal privacy notice.
              </p>
            </section>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 sm:px-10">
            <Link
              href="/account"
              className="font-semibold text-[#0B3B75] hover:underline"
            >
              ← Back to My Account
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}