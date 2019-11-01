import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
let GeoService = class GeoService {
    constructor(api) {
        this.api = api;
    }
    getCountries() {
        return this.api.get('open_api/v1/info/country');
    }
    getRegions(countryId) {
        return this.api.get(`open_api/v1/info/regions/${countryId}`);
    }
    getCities(regionId) {
        return this.api.get(`open_api/v1/info/cities/${regionId}`);
    }
};
GeoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ApiService])
], GeoService);
export { GeoService };
//# sourceMappingURL=geo.service.js.map