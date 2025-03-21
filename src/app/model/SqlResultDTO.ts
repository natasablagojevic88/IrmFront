export class SqlResultDTO{
    totalItems:number=0;
    numberOfPages:number=0;
    columns:any[]=[];
    list:any[]=[];
    hasTotal:boolean=false;
    queryWithFetch:boolean=false;
    totalsColumn:any;
}