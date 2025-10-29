"use client";

import SectionContainer from "@/components/container/section-container";
import useTableOfContentObserver from "@/hooks/use-table-of-content-observer";
import HeaderLegal from "../components/header-legal";
import TableOfContent from "../components/table-of-content";
import LegalMainWrapper from "../layout/legal-main-wrapper";
import LegalTitle from "../components/legal-title";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "eligibility", title: "Eligibility & Account Registration" },
  { id: "subscription", title: "Subscription Plans & Payment Terms" },
  { id: "trial", title: "Trial Periods, Renewals, and Cancellations" },
  { id: "user", title: "User Responsibilities & Acceptable Use" },
  { id: "ip", title: "Intellectual Property Rights" },
  { id: "content", title: "Content & Data Ownership" },
  { id: "thirdparty", title: "Third-Party Services & Links" },
  { id: "termination", title: "Termination & Suspension of Accounts" },
  { id: "service", title: "Service Availability & Maintenance" },
  { id: "disclaimer", title: "Disclaimers & Warranties" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "law", title: "Governing Law & Jurisdiction" },
  { id: "changes", title: "Changes to the Terms" }
];

export default function TermsOfServicePage() {
  const { activeId } = useTableOfContentObserver({ sections });

  return (
    <div className="w-full max-w-7xl px-6 lg:px-10 mx-auto py-12 lg:py-20">
      <HeaderLegal currentPage="terms-of-service" />
      <SectionContainer className="p-6 lg:p-10">
        <div>
          <LegalTitle
            title="Our Terms of Service"
            description="Latest update: August 24, 2025"
          />

          <div className="flex justify-between gap-8">
            <LegalMainWrapper>
              <section id="introduction">
                <h2>1. General</h2>
                <p>
                  These Terms create a binding agreement between you (“User,”
                  “you”) and Synapse (“Company,” “we,” “us,” “our”). They apply
                  whenever you:
                </p>
                <ul>
                  <li>Visit our website.</li>
                  <li>Create an account or subscribe to a plan.</li>
                  <li>
                    Access or use any features, tools, or content on the
                    platform.
                  </li>
                </ul>
              </section>
              <section id="eligibility">
                <h2>2. Eligibility & Account Registration</h2>
                <ul>
                  <li>
                    You must be 18 years or older (or the age of majority in
                    your jurisdiction) to use our Services.
                  </li>
                  <li>
                    If using the Services on behalf of an organization, you
                    confirm that you have the authority to bind that
                    organization.
                  </li>
                  <li>
                    You agree to provide accurate and complete information
                    during registration.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your login credentials and for all activities under your
                    account.
                  </li>
                </ul>
              </section>
              <section id="subscription">
                <h2>3. Subscription Plans & Payment Terms</h2>
                <ul>
                  <li>
                    Access to Synapse requires a valid subscription (monthly,
                    annual, or enterprise).
                  </li>
                  <li>Payments are due in advance of the billing cycle.</li>
                  <li>
                    Accepted payment methods include credit card, debit card,
                    and other methods listed at checkout.
                  </li>
                  <li>
                    Taxes and fees may apply depending on your jurisdiction.
                  </li>
                  <li>
                    All charges are displayed in the applicable currency shown
                    at checkout.
                  </li>
                </ul>
              </section>
              <section id="trial">
                <h2>4. Trial Periods, Renewals, and Cancellations</h2>
                <ul>
                  <li>
                    Free or discounted trial periods may be offered. Once
                    expired, your account will automatically renew to a paid
                    subscription unless canceled.
                  </li>
                  <li>
                    Subscriptions renew automatically at the end of each term
                    unless you cancel before the renewal date.
                  </li>
                  <li>
                    You may cancel your subscription at any time. Cancellation
                    will take effect at the end of the current billing cycle.
                  </li>
                  <li>
                    Payments are non-refundable, except where required by law.
                  </li>
                </ul>
              </section>
              <section id="user">
                <h2>5. User Responsibilities & Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>
                    Use the Services for illegal or unauthorized purposes.
                  </li>
                  <li>Upload or transmit viruses, malware, or harmful code.</li>
                  <li>
                    Attempt to reverse-engineer, hack, or disrupt the platform.
                  </li>
                  <li>
                    Share or resell your account access without prior approval.
                  </li>
                  <li>
                    Post or upload content that is unlawful, offensive, or
                    infringes on third-party rights.
                  </li>
                </ul>
              </section>
              <section id="ip">
                <h2>6. Intellectual Property Rights</h2>
                <ul>
                  <li>
                    All software, code, text, graphics, logos, and trademarks on
                    Synapse are owned by or licensed to us.
                  </li>
                  <li>
                    You are granted a limited, non-exclusive, non-transferable
                    license to access and use the Services for personal or
                    organizational purposes.
                  </li>
                  <li>
                    Unauthorized copying, modification, distribution, or resale
                    is prohibited.
                  </li>
                </ul>
              </section>
              <section id="content">
                <h2>7. Content & Data Ownership</h2>
                <ul>
                  <li>
                    You retain ownership of data and content you upload or
                    provide to Synapse.
                  </li>
                  <li>
                    By submitting content, you grant us a worldwide,
                    non-exclusive license to store, process, and display such
                    content solely to provide the Services.
                  </li>
                  <li>We will not sell your data to third parties.</li>
                </ul>
              </section>
              <section id="thirdparty">
                <h2>8. Third-Party Services & Links</h2>
                <ul>
                  <li>
                    The platform may integrate with third-party applications or
                    contain links to external sites.
                  </li>
                  <li>
                    We are not responsible for the availability, content, or
                    policies of third-party services.
                  </li>
                  <li>
                    Use of third-party services is subject to their own terms
                    and privacy policies.
                  </li>
                </ul>
              </section>
              <section id="termination">
                <h2>9. Termination & Suspension of Accounts</h2>
                <p>We may suspend or terminate your account if:</p>
                <ul>
                  <li>You violate these Terms.</li>
                  <li>You fail to pay subscription fees.</li>
                  <li>Required by law or court order.</li>
                </ul>

                <p>Upon termination:</p>
                <ul>
                  <li>Your access to Services will cease.</li>
                  <li>
                    Certain data may be deleted or retained in accordance with
                    our Privacy Policy.
                  </li>
                </ul>
              </section>
              <section id="service">
                <h2>10. Service Availability & Maintenance</h2>
                <ul>
                  <li>
                    We strive to provide continuous, reliable access but do not
                    guarantee uninterrupted or error-free service.
                  </li>
                  <li>
                    Scheduled or emergency maintenance may cause temporary
                    outages.
                  </li>
                  <li>
                    We will attempt to notify users of major disruptions
                    whenever possible.
                  </li>
                </ul>
              </section>
              <section id="disclaimer">
                <h2>11. Disclaimers & Warranties</h2>
                <ul>
                  <li>
                    Services are provided on an “as-is” and “as-available”
                    basis.
                  </li>
                  <li>
                    We disclaim all warranties, express or implied, including
                    merchantability, fitness for purpose, and non-infringement.
                  </li>
                  <li>
                    We do not guarantee results, accuracy of data, or
                    uninterrupted availability.
                  </li>
                </ul>
              </section>
              <section id="liability">
                <h2>12. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law:</p>
                <ul>
                  <li>
                    Synapse is not liable for indirect, incidental, or
                    consequential damages (including loss of profits, revenue,
                    or data).
                  </li>
                  <li>
                    Our total liability will not exceed the amount paid by you
                    in the past 12 months.
                  </li>
                </ul>
              </section>
              <section id="indemnification">
                <h2>13. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Synapse, its
                  employees, directors, and partners from any claims, damages,
                  or liabilities arising from:
                </p>
                <ul>
                  <li>Your use of the Services.</li>
                  <li>Violation of these Terms.</li>
                  <li>Infringement of third-party rights.</li>
                </ul>
              </section>
              <section id="law">
                <h2>14. Governing Law & Jurisdiction</h2>
                <ul>
                  <li>
                    These Terms are governed by the laws of [Insert
                    Jurisdiction, e.g., France or EU law].
                  </li>
                  <li>
                    Any disputes shall be resolved exclusively in the courts
                    located in [Insert City, Country].
                  </li>
                </ul>
              </section>
              <section id="changes">
                <h2>15. Changes to the Terms</h2>
                <ul>
                  <li>We may update these Terms at any time.</li>
                  <li>
                    Changes will be effective upon posting to the website with
                    the updated “Last Updated” date.
                  </li>
                  <li>
                    Continued use of the Services after updates constitutes
                    acceptance of the new Terms.
                  </li>
                </ul>
              </section>
            </LegalMainWrapper>

            <aside className="w-full max-w-[300px] sticky top-24 h-fit hidden lg:block">
              <TableOfContent sections={sections} activeId={activeId} />
            </aside>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
