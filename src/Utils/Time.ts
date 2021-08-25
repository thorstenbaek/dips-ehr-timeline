import Marker from "./Marker";

export default class Time extends Marker {

    override render(context: CanvasRenderingContext2D, width: number, height: number) {
        var x = this.ruler.getX(this.time, width);       
        if (x > 100) {
            var time = new Date(this.time);
            
            let timeDisplayText = time.toLocaleTimeString("nb-no", {
                hour: '2-digit',
                minute:'2-digit',
                hour12: false
            });

            if(timeDisplayText == "00:00") {
                
                timeDisplayText = time.toLocaleDateString("nb-no");
                context.font = "bold 12px Arial";                
                this.drawLine(context, x, height, true);
            }
            else {
                context.font = "12px Arial";      
                this.drawLine(context, x, height);          
            }
        
            context.fillText(timeDisplayText, x - context.measureText(timeDisplayText).width/2, 17);            
        }
    }
}