import DatabaseMaps from "@/components/database-maps";
import SectionTitle from "@/components/typography/section-title";


export default function DataMaps() {

  return (
    <section className="bg-background">
          <div className="max-w-7xl mx-auto py-12 lg:py-25 w-full px-6 xl:px-5 flex flex-col gap-10 lg:gap-16">
            <div className="flex flex-col gap-2 items-center">
               <SectionTitle className="text-center">Les chiffres clés</SectionTitle>
         <p className="text-base leading-[110%] text-regular">Principaux chiffres relatifs à un territoire</p>
         </div>
         <DatabaseMaps />
         </div>
        </section>
  );
}
