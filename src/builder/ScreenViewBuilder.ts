import HitBuilder from "../HitBuilder";

// 屏幕上报
export default class ScreenViewBuilder extends HitBuilder {
    constructor() {
        super();
        this.setHitType("screenview");
    }
}