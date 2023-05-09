"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalEvent = void 0;
const staticGlobalEventProperties = new Map();
class GlobalEvent {
    constructor(properties) {
        let staticInstance = staticGlobalEventProperties.get(properties.name);
        if (staticInstance === undefined) {
            staticGlobalEventProperties.set(properties.name, properties);
            staticInstance = properties;
        }
        this.properties = staticInstance;
    }
    get name() {
        return this.properties.name;
    }
    get description() {
        return this.properties.description;
    }
    get revealedDelegate() {
        return this.properties.revealedDelegate;
    }
    get currentDelegate() {
        return this.properties.currentDelegate;
    }
    get renderData() {
        return this.properties.renderData;
    }
}
exports.GlobalEvent = GlobalEvent;
