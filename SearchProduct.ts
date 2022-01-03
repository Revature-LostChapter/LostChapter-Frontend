export interface SearchProducts  {
  title: string;
  authors: [string];
  publisher: string;
  publisherDate: string;
  description: string;
  industryIdentifiers: [ {identifier: string}];
  categories: [string];
  imageLinks: {thumbnail: string};
  salesInfo: {listPrice: {amount: number}};
}
