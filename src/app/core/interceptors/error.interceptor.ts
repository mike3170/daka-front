import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn
	= (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
		return next(req).pipe(
			catchError((errResp: HttpErrorResponse) => {
				if (errResp.error instanceof ErrorEvent) {     // client side error
					const message = `Error: ${errResp.error.message}`;
					return throwError(() => message);
				} else {           														 // server side error
					//return throwError(() => errResp.error);
					return throwError(() => {
						return {
							message: "系統或網路無回應, 請通知系統管理員.",
						}
					});
				}
			}),
		);
	};
