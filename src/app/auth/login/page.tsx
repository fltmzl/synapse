import BrandLogo from "@/components/brand-logo";
import { Card, CardTitle } from "@/components/ui/card";
import { CircleCheckIcon } from "@/icons/circle-check-icon";
import LoginForm from "./form/login-form";

export default function LoginPage() {
  const listFeatures = [
    "Une base de connaissance statistique",
    "Une veille économique, politique, citoyenne et législative",
    "Une cartographie des acteurs",
    "Un archivage de l’information",
    "Des opportunités d’affaires et des services personnalisés"
  ];

  return (
    <div className="max-w-6xl mx-auto my-12 px-6 min-h-96 lg:min-h-dvh grid place-content-center">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="flex flex-col items-start gap-6 lg:gap-12">
          <div>
            <BrandLogo />
          </div>

          <div>
            <h1 className="text-xl lg:text-3xl font-medium">Bienvenue</h1>
            <p className="mt-4">
              L’observatoire des Outre-mer Synapse vous propose un outil complet
              de consolidation de la donnée et une expérience informationnelle
              afin d’analyser et de décrypter l’économie et les sociétés des
              territoires ultramarins
            </p>
            <p className="mt-4">
              Un véritable assistant stratégique spécialiste des Outre-Mer
              alimenté à l’IA comprenant:
            </p>
            <ul className="mt-4 lg:mt-6 space-y-3">
              {listFeatures.map((feature, index) => (
                <li key={index} className="flex gap-2 lg:gap-4 items-center">
                  <CircleCheckIcon className="min-w-5 h-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6">A vous de jouer!</p>
          </div>
        </div>

        <main>
          <Card className="py-8 lg:py-12 px-6 lg:px-10 rounded-2lg">
            <CardTitle className="text-xl lg:text-2xl text-center tracking-tight font-medium">
              Connectez vous à votre compte
            </CardTitle>
            <div>
              <LoginForm />
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
