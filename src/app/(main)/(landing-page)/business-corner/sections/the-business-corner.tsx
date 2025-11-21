
export default function TheBusinessCorner() {
  return (
    <section className="bg-background">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="py-12 lg:py-20 px-6  flex items-center flex-col">
          <h1 className="text-3xl lg:text-5xl font-medium leading-[110%] tracking-[-0.03em] mb-4 text-center">
            Le coin des affaires{" "}
          </h1>
          <p className="w-full lg:max-w-[560px] text-lg text-center leading-[150%] tracking-[-0.01em] text-muted-foreground">
            Un espace dédié aux entreprises et aux potentiels de croissance,
            grâce aux données du marché.
          </p>
        </div>

        {/* <div className="rounded-[6px] relative h-[216px] lg:h-[480px]">
        <Image
          src="/images/business-corner/bc-1.png"
          alt="The Business Corner Hero Image"
          fill
          className="object-cover rounded-[6px]"
          priority
        />
      </div> */}
      </div>
    </section>
  );
}
