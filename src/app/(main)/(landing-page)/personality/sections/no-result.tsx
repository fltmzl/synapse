import CvvIcon from "../../../../../../public/assets/icon/cvv-icon.svg";
export default function NoResult() {
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto py-20 lg:py-30 px-6 flex flex-col gap-8 items-center" >
        <div className="border p-5 rounded-[12px] ">
        <img src={CvvIcon.src} alt="CVV Icon" className="size-9 text-primary  " />
        </div>
        <div className="flex flex-col gap-2 items-center">
        <h5 className="text-xl lg:text-2xl font-medium leading-[110%] tracking-[-0.03em]">
          No result found
        </h5>
        <p className="text-sm lg:text-base font-regular text-muted-foreground lg:leading-[150%] leading-[140%] tracking-[-0.01em] lg:tracking-normal">
          Try searching with another name, role, or organization.
        </p>
        </div>
      </div>
    </section>
  );
}
