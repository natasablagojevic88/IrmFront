export class ModelDTO{
    id!:number;
    code!:string;
    name!:string;
    type!:string;
    numericCode!:boolean;
    icon!:string;
    parentId:number|undefined;
    previewRoleId!:number;
    updateRoleId!:number;
    lockRoleId!:number;
    unlockRoleId!:number;
    dialogWidth!:number;
    columnsNumber!:number;
    tableWidth!:number;
    children:ModelDTO[]=[]
}