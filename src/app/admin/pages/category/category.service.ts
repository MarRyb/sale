import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/interfaces/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CategoryManagementService {
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}open_api/v1/static/category/`);
    }

    createCategory(payload: Partial<Category>): Observable<Category> {
        return this.http.post<Category>(`${this.apiUrl}api/v1/admin/category/new`, payload);
    }

    deleteCategory(categoryId: number): Observable<Category> {
        return this.http.delete<Category>(`${this.apiUrl}api/v1/admin/category/${categoryId}`);
    }

    editCategory(categoryId: number, payload: Partial<Category>): Observable<Category> {
        return this.http.patch<Category>(`${this.apiUrl}api/v1/admin/category/${categoryId}`, payload);
    }

    uploadCategoryImage(categoryId: number, file: File | Blob): Observable<Category> {
        const formData: FormData = new FormData();
        formData.append('image[path]', file);
        return this.http.post<Category>(`${this.apiUrl}api/v1/admin/category/${categoryId}/image`, formData);
    }

    deleteCategoryImage(categoryId: number): Observable<Category> {
        return this.http.delete<Category>(`${this.apiUrl}api/v1/admin/category/${categoryId}/image`);
    }
}