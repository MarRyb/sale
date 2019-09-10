import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
// import { UserGeo, City, Region, Country } from '../components/profile/edit-profile/user-geo.model';

@Injectable({
    providedIn: 'root'
})
export class GeoService {
    public apiURL = environment.apiURL;
    public openAPIUrl = environment.openApiURL;

    constructor(
        private http: HttpClient
    ) { }


    // getCountries(): Observable<Country[]> {
    //     return this.http.get<Country[]>(`${this.openAPIUrl}info/country`);
    // }

    // getRegions(countryId: number): Observable<Region[]> {
    //     return this.http.get<Region[]>(`${this.openAPIUrl}info/regions/${countryId}`);
    // }

    // getCities(regionId: number): Observable<City[]> {
    //     return this.http.get<City[]>(`${this.openAPIUrl}info/cities/${regionId}`);
    // }

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
