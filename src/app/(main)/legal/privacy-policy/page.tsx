"use client";

import SectionContainer from "@/components/container/section-container";
import useTableOfContentObserver from "@/hooks/use-table-of-content-observer";
import HeaderLegal from "../components/header-legal";
import TableOfContent from "../components/table-of-content";
import LegalMainWrapper from "../layout/legal-main-wrapper";
import LegalTitle from "../components/legal-title";

const sections = [
  { id: "info-collect", title: "Information We Collect" },
  { id: "how-collect", title: "How We Collect Information" },
  { id: "how-use", title: "How We Use Your Information" },
  { id: "sharing-disclosure", title: "Sharing & Disclosure of Information" },
  { id: "cookies-tracking", title: "Cookies & Tracking Technologies" },
  { id: "data-retention", title: "Data Retention" },
  { id: "rights-choices", title: "Your Rights & Choices" },
  { id: "data-security", title: "Data Security" },
  { id: "intl-transfers", title: "International Data Transfers" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "children-privacy", title: "Children's Privacy" },
  { id: "changes-policy", title: "Changes to This Policy" }
];

export default function PrivacyPolicyPage() {
  const { activeId } = useTableOfContentObserver({ sections });

  return (
    <div className="w-full max-w-7xl px-6 lg:px-10 mx-auto py-12 lg:py-20">
      <HeaderLegal currentPage="privacy-policy" />
      <SectionContainer className="p-6 lg:p-10">
        <div>
          <LegalTitle
            title="Privacy Policy"
            description="Latest update: August 24, 2025"
          />

          <div className="flex justify-between gap-8">
            <LegalMainWrapper>
              <section id="info-collect">
                <h2>1. Information We Collect</h2>
                <p>We may collect the following categories of information:</p>
                <ul>
                  <li>
                    Personal Information: Name, email, phone number, billing
                    address, payment details.
                  </li>
                  <li>
                    Account Information: Login credentials, subscription type,
                    account preferences.
                  </li>
                  <li>
                    Usage Data: Pages visited, features used, time spent, device
                    type, browser.
                  </li>
                  <li>
                    Location Data: IP address, region, or geolocation data when
                    enabled.
                  </li>
                  <li>
                    Communication Data: Messages, support tickets, and
                    interactions with our team.
                  </li>
                </ul>
              </section>

              <section id="how-collect">
                <h2>2. How We Collect Information</h2>
                <p>We collect data through:</p>
                <ul>
                  <li>
                    Direct input: When you register, subscribe, or fill out
                    forms.
                  </li>
                  <li>
                    Automatic tracking: Cookies, analytics tools, log files, and
                    session data.
                  </li>
                  <li>
                    Third-party sources: Payment processors, authentication
                    providers, and integration partners.
                  </li>
                </ul>
              </section>

              <section id="how-use">
                <h2>3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                  <li>Provide, operate, and improve our Services.</li>
                  <li>Process subscriptions, payments, and renewals.</li>
                  <li>Personalize your experience and content.</li>
                  <li>
                    Communicate with you about updates, offers, and security
                    alerts.
                  </li>
                  <li>Detect, prevent, and respond to fraud or misuse.</li>
                  <li>Comply with legal obligations.</li>
                </ul>
              </section>

              <section id="sharing-disclosure">
                <h2>4. Sharing & Disclosure of Information</h2>
                <p>
                  We do not sell your personal data. We may share data with:
                </p>
                <ul>
                  <li>
                    Service providers: Payment processors, hosting, analytics,
                    and customer support.
                  </li>
                  <li>
                    Business partners: For integrations you choose to connect.
                  </li>
                  <li>
                    Legal authorities: When required by law, regulation, or
                    legal proceedings.
                  </li>
                  <li>
                    Corporate transactions: In case of merger, acquisition, or
                    sale of assets.
                  </li>
                </ul>
              </section>

              <section id="cookies-tracking">
                <h2>5. Cookies & Tracking Technologies</h2>
                <p>
                  We use cookies, web beacons, and similar technologies to
                  analyze usage, remember preferences, and improve
                  functionality.
                </p>
                <p>Types of cookies:</p>
                <ul>
                  <li>
                    Essential cookies – Required for core platform functions.
                  </li>
                  <li>Analytics cookies – Measure traffic and usage trends.</li>
                  <li>Marketing cookies – Deliver relevant ads and content.</li>
                </ul>
                <p>
                  You can manage cookies via your browser settings or our cookie
                  preferences tool.
                </p>
              </section>

              <section id="data-retention">
                <h2>6. Data Retention</h2>
                <ul>
                  <li>
                    We retain personal information as long as your account is
                    active or necessary for providing Services.
                  </li>
                  <li>
                    After cancellation, certain data may be retained to comply
                    with legal obligations or resolve disputes.
                  </li>
                  <li>
                    Data no longer needed is securely deleted or anonymized.
                  </li>
                </ul>
              </section>

              <section id="rights-choices">
                <h2>7. Your Rights & Choices</h2>
                <p>Depending on your jurisdiction, you may have rights to:</p>
                <ul>
                  <li>Access, correct, or delete your data.</li>
                  <li>Object to or restrict processing.</li>
                  <li>Withdraw consent to marketing communications.</li>
                  <li>Request a copy of your data in portable format.</li>
                </ul>
                <p>
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:privacy@synapse.com">privacy@synapse.com</a>.
                </p>
              </section>

              <section id="data-security">
                <h2>8. Data Security</h2>
                <p>
                  We implement administrative, technical, and organizational
                  measures to protect your data.
                </p>
                <ul>
                  <li>
                    This includes encryption, secure servers, and restricted
                    access.
                  </li>
                  <li>
                    However, no system is completely secure. You share data at
                    your own risk.
                  </li>
                </ul>
              </section>

              <section id="intl-transfers">
                <h2>9. International Data Transfers</h2>
                <ul>
                  <li>
                    If you access Synapse outside of [Insert Jurisdiction], your
                    data may be transferred internationally.
                  </li>
                  <li>
                    We ensure safeguards (e.g., EU Standard Contractual Clauses)
                    are in place for cross-border data protection.
                  </li>
                </ul>
              </section>

              <section id="third-party">
                <h2>10. Third-Party Services</h2>
                <p>
                  Our Services may contain links or integrations with
                  third-party services.
                </p>
                <ul>
                  <li>We are not responsible for their privacy practices.</li>
                  <li>
                    Please review the policies of third parties before sharing
                    your information.
                  </li>
                </ul>
              </section>

              <section id="children-privacy">
                <h2>11. Children&apos;s Privacy</h2>
                <ul>
                  <li>Synapse is not intended for children under 16.</li>
                  <li>We do not knowingly collect data from minors.</li>
                  <li>
                    If we become aware of such data, we will delete it promptly.
                  </li>
                </ul>
              </section>

              <section id="changes-policy">
                <h2>12. Changes to This Policy</h2>
                <ul>
                  <li>We may update this Privacy Policy from time to time.</li>
                  <li>
                    Updates will be posted with a revised “Last Updated” date.
                  </li>
                  <li>
                    If material changes occur, we will notify users via email or
                    platform notice.
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
