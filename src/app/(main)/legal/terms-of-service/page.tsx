"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "eligibility", title: "2. Eligibility & Account Registration" },
  { id: "subscription", title: "3. Subscription Plans & Payment Terms" },
  { id: "trial", title: "4. Trial Periods, Renewals, and Cancellations" },
  { id: "user", title: "5. User Responsibilities & Acceptable Use" },
  { id: "ip", title: "6. Intellectual Property Rights" },
  { id: "content", title: "7. Content & Data Ownership" },
  { id: "thirdparty", title: "8. Third-Party Services & Links" },
  { id: "termination", title: "9. Termination & Suspension of Accounts" },
  { id: "service", title: "10. Service Availability & Maintenance" },
  { id: "disclaimer", title: "11. Disclaimers & Warranties" },
  { id: "liability", title: "12. Limitation of Liability" },
  { id: "indemnification", title: "13. Indemnification" },
  { id: "law", title: "14. Governing Law & Jurisdiction" },
  { id: "changes", title: "15. Changes to the Terms" },
  { id: "contact", title: "16. Contact Information" }
];

export default function TermsOfServicePage() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  useEffect(() => {
    const sectionEls = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // ambil yang paling terlihat
          const topVisible = visible.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          setActiveId(topVisible.target.id);
        } else {
          // fallback: ambil section terdekat dengan atas viewport
          let closest: HTMLElement | null = null;
          let minDistance = Infinity;
          for (const el of sectionEls) {
            const distance = Math.abs(el.getBoundingClientRect().top);
            if (distance < minDistance) {
              minDistance = distance;
              closest = el;
            }
          }
          if (closest) setActiveId(closest.id);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-30% 0px -50% 0px"
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8 px-8 py-10 max-w-6xl mx-auto">
      {/* Content */}
      <div className="flex-1 space-y-16">
        <h1 className="text-3xl font-bold mb-6">Our Terms of Service</h1>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              orci et leo viverra aliquam. Curabitur sed orci in sapien volutpat
              gravida. Cras sed elit nec sapien interdum suscipit. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Id facilis nam eaque
              perspiciatis ad voluptas voluptatibus libero accusamus ipsam.
              Tempora cupiditate eum dicta veritatis sapiente maxime debitis
              alias cumque tenetur. Nemo nobis doloremque quam illum
              perspiciatis explicabo reprehenderit modi! Modi eligendi vitae,
              officia non autem, impedit necessitatibus ratione neque
              perspiciatis, amet sunt atque. Nam, odit quia, eos, temporibus
              error debitis earum id doloremque praesentium dignissimos dolore
              a? Laudantium, ullam dicta repudiandae accusamus ipsa eum aliquid
              qui quas explicabo officia nisi eligendi! Architecto esse ab quo
              ipsum debitis incidunt ducimus accusantium quisquam ipsa, rerum
              cupiditate iure at voluptate quaerat recusandae odit?
            </p>
          </section>
        ))}
      </div>

      {/* Table of Contents */}
      <aside className="w-64 sticky top-24 h-fit border-l pl-4">
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
          Table of contents
        </h3>
        <ul className="space-y-2 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={clsx(
                  "block hover:text-primary transition-colors",
                  activeId === section.id
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
