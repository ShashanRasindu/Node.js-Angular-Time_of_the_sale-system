import {Customers} from "./customers";


export class CustomerPage {
    links: { rel: string, href: string }[];
    content: Array<Customers>;
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    };
    constructor(links: { rel: string; href: string }[], content: Array<Customers>, page: { size: number; totalElements: number; totalPages: number; number: number }) {
        this.links = links;
        this.content = content;
        this.page = page;
    }
}
