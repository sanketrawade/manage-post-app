export class Paginator {

  constructor(){
    this.pageIndex = 1;
    this.length = 5;
    this.previousPageIndex = 1;
    this.pageSize = 2;
  }

  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}
