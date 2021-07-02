import HitBuilder from "./core/HitBuilder";
import ScreenViewBuilder from "./builder/ScreenViewBuilder";
import EventBuilder from "./builder/EventBuilder";
import SocialBuilder from "./builder/SocialBuilder";
import ExceptionBuilder from "./builder/ExceptionBuilder";
import TimingBuilder from "./builder/TimingBuilder";
import Product from "./ecommerce/Product";
import ProductAction from "./ecommerce/ProductAction";
import Promotion from "./ecommerce/Promotion";
import GoogleAnalytics from "./core/GoogleAnalytics";

function getInstance(app: any = {}) {
    if (!app.defaultGoogleAnalyticsInstance) {
        app.defaultGoogleAnalyticsInstance = new GoogleAnalytics(app);
    }

    return app.defaultGoogleAnalyticsInstance;
}

export default {
    GoogleAnalytics: {
        getInstance
    },
    HitBuilders: {
        HitBuilder,
        ScreenViewBuilder,
        EventBuilder,
        SocialBuilder,
        ExceptionBuilder,
        TimingBuilder
    },
    Product,
    ProductAction,
    Promotion
}