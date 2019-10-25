import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomField } from 'src/app/core/interfaces/post';
import { Pagination } from 'src/app/core/interfaces/pagination';

@Injectable({
    providedIn: 'root'
})
export class CustomFieldService {
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    getCustomFields(params?: any): Observable<Pagination<CustomField>> {
        // tslint:disable-next-line:object-literal-shorthand
        return this.http.get<Pagination<CustomField>>(`${this.apiUrl}api/v1/admin/custom_field`, { params: params });
    }

    createCustomField(payload: Partial<CustomField>): Observable<CustomField> {
        return this.http.post<CustomField>(`${this.apiUrl}api/v1/admin/custom_field/new`, payload);
    }

    deleteCustomField(customFieldId: number): Observable<CustomField> {
        return this.http.delete<CustomField>(`${this.apiUrl}api/v1/admin/custom_field/${customFieldId}`);
    }

    editCustomField(customFieldId: number, payload: Partial<CustomField>): Observable<CustomField> {
        return this.http.put<CustomField>(`${this.apiUrl}api/v1/admin/custom_field/${customFieldId}`, payload);
    }
}
