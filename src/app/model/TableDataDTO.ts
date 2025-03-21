import { ColumnData } from "./ColumnData";
import { EnumList } from "./EnumList";
import { ModelDTO } from "./ModelDTO";
import { TableButton } from "./TableButton";

export class TableDataDTO{
    title!:string;
    table!:string;
    totalPages!:number;
    totalElements!:number;
    tableWidth!:number;
    model!:ModelDTO;
    columns!:ColumnData[];
    names!:any;
    hasTotal!:boolean;
    totals!:any;
    list!:any[];
    fields!:any[];
    subtables!:TableButton[];
    rights!:any;
    enums!:EnumList[];
}