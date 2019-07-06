import {Items} from "./items";

export class ItemPage {

  links: { rel: string, href: string }[];
  content: Array<Items>;
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
  constructor(links: { rel: string; href: string }[], content: Array<Items>, page: { size: number; totalElements: number; totalPages: number; number: number }) {
    this.links = links;
    this.content = content;
    this.page = page;
  }


}
