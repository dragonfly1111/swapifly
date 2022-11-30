import * as moment from "moment";

export function timeFormat (e: number): string {
 return moment(e * 1000).format("YYYY-MM-DD");
}
