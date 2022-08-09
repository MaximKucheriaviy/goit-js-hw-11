import _ from "lodash";

export default class FullScrollDetector{
    #eventName
    #body
    #event
    #approachOffset
    constructor({emiterElement = window, eventName = "onFullScroll", approachOffset = 30} = {}){
        this.emiterElement = emiterElement;
        this.#eventName = eventName;
        this.#body = document.querySelector('body');
        this.#event = new Event(eventName);
        this.#approachOffset = approachOffset;
        window.addEventListener('scroll', _.debounce(this.emitEvent.bind(this), 100));
    }
    emitEvent(){
        if(this.#body.getBoundingClientRect().height <= window.innerHeight + window.scrollY + this.#approachOffset){
            this.emiterElement.dispatchEvent(this.#event);
        }
    }
    on(callback){
        this.emiterElement.addEventListener(this.#eventName, callback);
    }
}