import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAuthService } from './apiAuth.service';

@Injectable({
    providedIn: 'root'
})
export class GeoService {

    constructor(
        private api: ApiAuthService
    ) { }

    getCountries(): Observable<any> {
        return this.api.get('open_api/v1/info/country');
    }

    getRegions(countryId: number): Observable<any> {
        return this.api.get(`open_api/v1/info/regions/${countryId}`);
    }

    getCities(regionId: number): Observable<any> {
        return this.api.get(`open_api/v1/info/cities/${regionId}`);
    }

    // getGeo(): Observable<UserGeo> {
    //     return this.http.get<UserGeo>(`${this.apiURL}profile/geo/`);
    // }

    // addGeo(cityId: number, visibility: number): Observable<UserGeo> {
    //     return this.http.post<UserGeo>(`${this.apiURL}profile/geo/`, { city: cityId, visibility: visibility });
    // }

    // getGeoById(userId: number): Observable<UserGeo> {
    //     return this.http.get<UserGeo>(`${this.apiURL}profile/geo/${userId}`);
    // }

}
