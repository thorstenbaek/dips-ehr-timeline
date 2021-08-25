import type Marker from "./Marker";
import Time from "./Time";
import type Span from "./Span";

const MinLineDist: number = 110.0;
const UnitCandidates: number[] = [5/60, 1/4, 1/2, 1, 2, 4, 6, 12, 24, 48, 96, 192];

const OneQuarter: number = 900000;
const OneHour:number = OneQuarter*4;
const OneDay:number = OneHour*24;

export default class TimeRuler
{
    startDate: Date;
    endDate: Date;
    start: number;
    end: number;
    span: number;

    constructor(span: Span) {
        this.startDate = span.start;
        this.endDate = span.end;

        this.start = span.start.getTime();
        this.end = span.end.getTime();
        this.span = this.end - this.start;
    }

    calculateTimeUnits(width: number): number {
        var distanceEachMillisecond = width / this.span;
        if (distanceEachMillisecond <= 0) {
            return 192;
        }
        
        for(var i = 0; i < UnitCandidates.length; i++) {

            var candidate = UnitCandidates[i];
        
            var length = distanceEachMillisecond * OneHour * candidate;
            if (length >= MinLineDist) {                                
                return candidate;
            }            
        }
    }

    getX(value: number, width: number) {
        return width * (value - this.start)/this.span;            
    }

    calculateLocalTime(time: number) : number {
        var zone = new Date(time).getTimezoneOffset()*60*1000;
        return time + zone;
    }

    render(context: CanvasRenderingContext2D, width: number, height: number) {

        var unit = this.calculateTimeUnits(width);
        context.fillText(`unit ${unit}`, 100, 100);
        
        var startDay: number = this.start - this.start % OneDay;   
        var localDay = this.calculateLocalTime(startDay);        

        var markers = new Array<Marker>();
        for(var time = localDay; time < this.end; time += OneHour*unit)
        {
            const localTime = this.calculateLocalTime(time);
            markers.push(new Time(time, localTime, this));
        }
        
        const date = new Date(localDay);
        const dateText =  date.toLocaleDateString("nb-no");
        
        context.font = "bold 12px Arial";                
        context.fillText(dateText, 50 - context.measureText(dateText).width/2, 15);
        markers.map(m => {
            if (m) {
                m.render(context, width, height);
            }
        });
    }
}