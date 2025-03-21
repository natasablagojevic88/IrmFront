export class ReportColumnInfoDTO{
    code!:string;
    name!:string;
    customName!:string;
    modelColumnId!:number;
    columnType!:string;
    icon!:string;
    sqlMetric!:string;
    ordernum!:number;
    sortDirection!:string;
    searchOperation!:string;
    defaultValue1!:string;
    defaultValue2!:string;
    columnFieldInfoDTO!:any;
    children!:ReportColumnInfoDTO[];
}