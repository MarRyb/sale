export interface Type {
    id: number;
    type: string;
}

export interface PaymentType {
    id: number;
    type: Type;
    info: string;
}

export interface Country {
    id: number;
    name: string;
}

export interface Region {
    id: number;
    name: string;
    country: Country;
}

export interface City {
    id: number;
    name: string;
    region: Region;
}

export interface DeliveryAddress {
    id: number;
    city: City;
    address: string;
    price: number;
    type: string;
}

export interface User {
    id: number;
    userId: number;
    paymentTypes: PaymentType[];
    deliveryAddresses: DeliveryAddress[];
    countBonus: number;
}

export interface CustomField {
    id: number;
    name: string;
    type: string;
}

export interface ParentCategory {
    id: number;
    name: string;
}


export interface ImageFile {
    id: number;
    path: string;
    name: string;
    mimeType: string;
    size: number;
    created: Date;
    updated: Date;
    file_type: string;
}
export interface Category {
    id: number;
    name: string;
    image?: ImageFile;
    children: Category[];
    parent: ParentCategory;
    customFields: CustomField[];
    slug: string;
}

export interface Currency {
    id: number;
    name: string;
    symbol: string;
}


export interface PostCustomField {
    id: number;
    value: string;
    customField: CustomField;
}

export interface HistoryPost {
    id: number;
    previous_post: Post;
    created: Date;
    updated: Date;
}

export interface Post {
    id: number;
    user: User;
    title: string;
    content: string;
    price: number;
    category: Category;
    type: Type;
    currency: Currency;
    data: any[];
    postCustomFields: PostCustomField[];
    status: string;
    historyPreviousPost: Post[];
    historyPost: HistoryPost[];
    count: number;
    created: Date;
    updated: Date;
}

