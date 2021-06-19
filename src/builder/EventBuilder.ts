import HitBuilder from "../HitBuilder";
import {hit_delete_if} from "../utils";
import {HitType} from "../../type";

// 事件上报
export default class EventBuilder extends HitBuilder {
    constructor() {
        super();
        this.setHitType('event');
        this.setAll({
            ec: "",   // category
            ea: "",   // action
            el: "",   // [label]
            ev: 0,    // [value]
        }as EventType)
    }

    /**
     * 设置事件类别
     * */
    setCategory(category: string): EventBuilder {
        return <EventBuilder>this.set('ec', category);
    }

    /**
     * 设置事件动作
     * */
    setAction(action: string): EventBuilder {
        return <EventBuilder>this.set('ea', action);
    }

    /**
     * 设置事件标签
     * */
    setLabel(label: string = ''): EventBuilder {
        return <EventBuilder>this.set('el', label);
    }

    /**
     * 设置事件值
     * */
    setValue(value: number = 0): EventBuilder {
        return <EventBuilder>this.set('ev', value);
    }

    build(): HitType {
        // 去除无效字段字段
        hit_delete_if(this, "ev", 0);
        hit_delete_if(this, "el", "");

        return super.build();
    }
}

interface EventType {
    ec: string;
    ea: string;
    el: string;
    ev: number;
}