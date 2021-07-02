import HitBuilder from "./HitBuilder";
import ScreenViewBuilder from "./builder/ScreenViewBuilder";
import EventBuilder from "./builder/EventBuilder";
import SocialBuilder from "./builder/SocialBuilder";
import ExceptionBuilder from "./builder/ExceptionBuilder";
import TimingBuilder from "./builder/TimingBuilder";
import Product from "./ecommerce/Product";
import ProductAction from "./ecommerce/ProductAction";
import Promotion from "./ecommerce/Promotion";
import {getInstance} from "./utils";

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