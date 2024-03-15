import { DateTime } from "luxon";

export interface PunchCard {
	empId: string , 
	punchTime: DateTime, 
	lat: number, 
	lng: number,
	kind: string
}