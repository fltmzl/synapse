"use client";

import SectionContainer from "@/components/container/section-container";
import useTableOfContentObserver from "@/hooks/use-table-of-content-observer";
import HeaderLegal from "../components/header-legal";
import TableOfContent from "../components/table-of-content";
import LegalMainWrapper from "../layout/legal-main-wrapper";
import LegalTitle from "../components/legal-title";

const sections = [
  { id: "what-are-cookies", title: "What Are Cookies?" },
  { id: "types-of-cookies", title: "Types of Cookies We Use" },
  { id: "why-use-cookies", title: "Why We Use Cookies" },
  { id: "third-party-cookies", title: "Third-Party Cookies" },
  { id: "managing-cookies", title: "Managing Cookies" },
  { id: "changes-to-policy", title: "Changes to This Policy" }
];

export default function PrivacyPolicyPage() {
  const { activeId } = useTableOfContentObserver({ sections });

  return (
    <div className="w-full max-w-7xl px-6 lg:px-10 mx-auto py-12 lg:py-20">
      <HeaderLegal currentPage="cookie-policy" />
      <SectionContainer className="p-6 lg:p-10">
        <div>
          <LegalTitle
            title="Cookie Policy"
            description="Latest update: August 24, 2025"
          />

          <div className="flex justify-between gap-8">
            <LegalMainWrapper>
              <section id="what-are-cookies">
                <h2>1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files stored on your device (computer,
                  smartphone, tablet) when you visit a website. They allow us to
                  remember your preferences, improve functionality, and analyze
                  how our Services are used.
                </p>
                <br />
                <p>
                  We may also use web beacons, pixels, and similar technologies
                  to track usage and improve features.
                </p>
              </section>

              <section id="types-of-cookies">
                <h2>2. Types of Cookies We Use</h2>

                <p>Essential Cookies</p>
                <ul>
                  <li>
                    Required for core site functionality (e.g., login, account
                    security).
                  </li>
                  <li>Without these, certain features will not work.</li>
                </ul>

                <p>Performance & Analytics Cookies</p>
                <ul>
                  <li>Help us understand how users interact with Synapse.</li>
                  <li>Example: pages visited, time spent, error tracking.</li>
                </ul>

                <p>Functional Cookies</p>
                <ul>
                  <li>
                    Remember user preferences, such as language or region.
                  </li>
                  <li>Example: keeping you logged in across sessions.</li>
                </ul>

                <p>Marketing & Advertising Cookies</p>
                <ul>
                  <li>
                    Used to deliver relevant ads and measure their
                    effectiveness.
                  </li>
                  <li>
                    Example: retargeting users who visited specific pages.
                  </li>
                </ul>
              </section>

              <section id="why-use-cookies">
                <h2>3. Why We Use Cookies</h2>
                <p>We use cookies to:</p>
                <ul>
                  <li>Ensure the website works properly.</li>
                  <li>Enhance performance and security.</li>
                  <li>Analyze traffic and usage trends.</li>
                  <li>Personalize content and experience.</li>
                  <li>Deliver relevant marketing and communications.</li>
                </ul>
              </section>

              <section id="third-party-cookies">
                <h2>4. Third-Party Cookies</h2>
                <p>
                  Some cookies are set by third parties we partner with,
                  including:
                </p>
                <ul>
                  <li>Analytics providers (e.g., Google Analytics, Matomo).</li>
                  <li>
                    Advertising networks (e.g., Google Ads, LinkedIn Ads).
                  </li>
                  <li>
                    Social media platforms (e.g., Facebook, Twitter, LinkedIn
                    plugins).
                  </li>
                </ul>
                <p>
                  These third parties may use cookies to track your activity
                  across different sites.
                </p>
              </section>

              <section id="managing-cookies">
                <h2>5. Managing Cookies</h2>
                <p>You can control or disable cookies by:</p>
                <ul>
                  <li>
                    Adjusting your browser settings to block or delete cookies.
                  </li>
                  <li>Using our cookie consent manager to set preferences.</li>
                  <li>
                    Opting out of third-party advertising cookies via industry
                    tools (e.g., Your Online Choices, NAI).
                  </li>
                </ul>
                <p>
                  <strong>⚠️ Please note:</strong> Disabling certain cookies may
                  affect the functionality of Synapse.
                </p>
              </section>

              <section id="changes-to-policy">
                <h2>6. Changes to This Policy</h2>
                <p>
                  We may update this Cookie Policy to reflect changes in
                  technology, law, or our practices. Updates will be posted with
                  a revised “Last Updated” date.
                </p>
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
