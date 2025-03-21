import { TableFilter } from "./TableFilter";
import { TableSort } from "./TableSort";

export class TableParameterDTO{
    pageNumber!:number;
    pageSize!:number;
    tableFilters:TableFilter[]=[];
    tableSorts:TableSort[]=[];
}