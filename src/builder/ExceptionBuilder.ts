import HitBuilder from "../HitBuilder";

// 错误上报
export default class ExceptionBuilder extends HitBuilder {
    constructor() {
        super();
        this.setHitType("exception");
        this.setAll({
            exd: "",
            exf: 1
        } as ExceptionType);
    }

    setDescription(description : string):ExceptionBuilder {
        return <ExceptionBuilder>this.set("exd", description);
    }

    setFatal(isFatal: any):ExceptionBuilder {
        return <ExceptionBuilder>this.set("exf", isFatal ? 1 : 0);
    }
}

interface ExceptionType {
    exd: "", // 错误说明
    exf: 0 | 1   // 错误是否严重
}