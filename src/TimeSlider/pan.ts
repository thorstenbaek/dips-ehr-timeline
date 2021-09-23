import type {Action} from "./types";

export default function pan(node: HTMLElement): ReturnType<Action> {    

    let active: boolean = false;
    const track: HTMLElement = node.parentElement;
    
    console.log(track);

    function onDown(event: MouseEvent) {
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);        
        active = true;
        node.dispatchEvent(new CustomEvent("panstart"));
    }

    function onMove(event: MouseEvent) {
        event.preventDefault();
        if (active) {            
            const {left, width} = track.getBoundingClientRect();
            const pos = ((event.clientX  - left)/width)
            if (pos >= 0.0 && pos <= 1.0) {
                node.dispatchEvent(new CustomEvent("pan", {detail: pos}));
            }
        }
    }

    function onUp(event: MouseEvent) {                
        window.removeEventListener('mousemove', onMove);
		window.removeEventListener('mouseup', onUp);        
        active = false;
        node.dispatchEvent(new CustomEvent("panend"));
    }

    node.addEventListener("mousedown", onDown);

    return {
        destroy() {
            node.removeEventListener('mousedown', onDown);
        }
    };
}
