export class MenuDTO {
    name!: string;
    icon!: string;
    url!: string;
    id!:number;
    children?: MenuDTO[];
}