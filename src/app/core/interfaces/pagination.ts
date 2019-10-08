export interface Pagination<T> {
    current_page_number: number;
    num_items_per_page: number;
    items: Array<T>;
    total_count: number;
    paginator_options: any;
    custom_parameters: any;
    route: string;
    params: any[];
    page_range: number;
    template: string;
    sortable_template: string;
    filtration_template: string;
}
