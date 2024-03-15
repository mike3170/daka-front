/*
export enum ApiStatus {
  OK = "OK",
  ERROR = "ERROR"
};

export interface ApiXXX {
  status: ApiStatus;
  data: any;
  error: { code: number, message: string }
}

export interface ApiXXXResponse {
  status: ApiStatus;
  data: any;
  error : { code: number, message: string};
}

export function isHttpOK(resp: ApiXXX): boolean {
	return resp.status === ApiStatus.OK;
}
*/

// ===================================
export interface Api {
  data: any;
	success: boolean;
	message? : string;
}

/**
* export interface ApiError {
* using class because of tryCatch for async/await, error is unknown type
* type guard instanceof 
*/
//export class ApiError {
//	status: number;
//	message: string;
//	url: string;
//	reqMethod: string;
//}

// interface type guard  ???
//export function isApi(x: unknown): boolean {
//  if (x && (typeof x === 'object') && 
//			('data' in x) && 
//			('message' in x) &&
//			('success' in x)) {
//    return true;
//  }
//  return false;
//}
