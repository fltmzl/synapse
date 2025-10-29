import React from "react";

export default function LegalMainWrapper({
  children
}: React.PropsWithChildren) {
  return (
    <main
      className={`
        prose
        prose-h2:font-medium 
        prose-h2:text-xl 
        prose-h2:mt-8
        prose-h2:mb-4
        lg:prose-h2:text-2xl
        prose-p:leading-[150%]
        prose-li:leading-[150%]
        [&_ul]:m-0
        [&_li]:m-0
        [&_p]:m-0
        max-w-[864px]
      `}
    >
      {children}
    </main>
  );
}
