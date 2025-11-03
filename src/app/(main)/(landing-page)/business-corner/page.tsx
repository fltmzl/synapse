import EconomicForecastsPage from "./sections/economic-forecast";
import Opportunities from "./sections/opportunities";
import RequestService from "./sections/request-service";
import TheBusinessCorner from "./sections/the-business-corner";

export default function BusinessCornerPage() {
    return (
        <>
          <TheBusinessCorner />
          <Opportunities />
          <EconomicForecastsPage />
          <RequestService />
        </>
    );
}