import Marker from "./Marker";

export default class Day extends Marker {
    override render(context: CanvasRenderingContext2D, width: number, height: number) {
        var x = this.ruler.getX(this.time, width);       
        if (x > 100) {
            var time = new Date(this.time);

            const timeDisplayText = time.toLocaleDateString("nb-no", {day: "numeric"});
            context.font = "bold 12px Arial";                
            context.fillText(timeDisplayText, x - context.measureText(timeDisplayText).width/2, 15);
            this.drawLine(context, x, height, true);
        }
    }
}