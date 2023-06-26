import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    private Autorization:string = 'Authorization';
    private Bearer:string='Bearer '

    constructor(private auth: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     /*    if(req.url=="https://api.cloudinary.com/v1_1/nova-parts/image/upload"){
            return next.handle(req)
        } */
        if(!localStorage.getItem(environment.token)){
            return next.handle(req)
        }
        req= req.clone({headers: req.headers.set(this.Autorization,this.Bearer+localStorage.getItem(environment.token))});
        return next.handle(req).pipe( catchError( (err:HttpErrorResponse) => {

            if(err.status ==401){
                return this.auth.post("user/refresh",localStorage.getItem(environment.token) || "").pipe( concatMap ( (data:any) => {
                    localStorage.setItem(environment.token,data.refreshToken)
                    req= req.clone({headers: req.headers.set(this.Autorization,this.Bearer+localStorage.getItem(environment.token))});
                    return next.handle(req);
                }) )
            }else{
                return throwError(err);
            }

        } ) )
    }
}
