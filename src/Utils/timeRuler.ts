import Marker from "./Marker";
import Time from "./Time";
import type Span from "./Span";

const MinLineDist: number = 110.0;
const UnitCandidates: number[] = [1/60, 5/60, 1/4, 1/2, 1, 2, 4, 6, 12, 24, 48, 96, 192];

const OneQuarter: number = 900000;
const OneHour:number = OneQuarter*4;
const OneDay:number = OneHour*24;

export default class TimeRuler
{
    start: number;
    end: number;
    span: number;
    leftMargin: number = 100;

    constructor(span: Span, leftMargin: number) {
        this.leftMargin = leftMargin;

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
        return this.leftMargin +  (width - this.leftMargin) * (value - this.start)/this.span;            
    }

    calculateLocalTime(time: number) : number {
        var zone = new Date(time).getTimezoneOffset()*60*1000;
        return time + zone;
    }

    render(context: CanvasRenderingContext2D, width: number, height: number) {

        var unit = this.calculateTimeUnits(width);        
        
        var startDay: number = this.start - this.start % OneDay;   
        var localDay = this.calculateLocalTime(startDay);        

        var markers = new Array<Marker>();
        for(var time = localDay; time < this.end; time += OneHour*unit)
        {
            const localTime = this.calculateLocalTime(time);
            markers.push(new Time(time, localTime, this));
        }
        
        for(var time = localDay + OneHour*unit*0.5; time < this.end; time += OneHour*unit)
        {
            const localTime = this.calculateLocalTime(time);
            markers.push(new Marker(time, localTime, this));
        }
        
        const date = new Date(localDay);
        const dateText =  date.toDateString();
        
        context.font = "bold 12px Arial";                
        context.fillText(dateText, 4, 17);
        markers.map(m => {
            if (m) {
                m.render(context, width, height);
            }
        });
    }
}