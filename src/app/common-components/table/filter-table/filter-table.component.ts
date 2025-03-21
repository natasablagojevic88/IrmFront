import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnData } from '../../../model/ColumnData';
import { TableSort } from '../../../model/TableSort';
import { TableFilter } from '../../../model/TableFilter';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { DecimalPipe } from '@angular/common';
import { EnumList } from '../../../model/EnumList';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrl: './filter-table.component.css'
})
export class FilterTableComponent{

  value:TableFilter=new TableFilter();
  translate:TranslatePipe=new TranslatePipe();
  list:ComboboxDTO[]=[];

  column:ColumnData=new ColumnData;
  enums:EnumList[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<FilterTableComponent>
  ){

    this.column=data[0];
    this.enums=data[1];

    this.value.field=this.column.code;
    this.value.searchOperation='equals';

    if(this.column.columnType=='Boolean'){
      this.value.parameter1=true;
    }

    if(this.findEnumList(this.column.code).length>0){
      this.value.parameter1=this.findEnumList(this.column.code)[0].value;
    }

    let equals:ComboboxDTO=new ComboboxDTO();
    equals.value='equals';
    equals.option=this.translate.transform(equals.value);

    let contains:ComboboxDTO=new ComboboxDTO();
    contains.value='contains';
    contains.option=this.translate.transform(contains.value);

    let startswith:ComboboxDTO=new ComboboxDTO();
    startswith.value='startswith';
    startswith.option=this.translate.transform(startswith.value);

    let endswith:ComboboxDTO=new ComboboxDTO();
    endswith.value='endswith';
    endswith.option=this.translate.transform(endswith.value);

    let less:ComboboxDTO=new ComboboxDTO();
    less.value='less';
    less.option=this.translate.transform(less.value);

    let lessOrEquals:ComboboxDTO=new ComboboxDTO();
    lessOrEquals.value='lessOrEquals';
    lessOrEquals.option=this.translate.transform(lessOrEquals.value);

    let greater:ComboboxDTO=new ComboboxDTO();
    greater.value='greater';
    greater.option=this.translate.transform(greater.value);

    let greaterOrEquals:ComboboxDTO=new ComboboxDTO();
    greaterOrEquals.value='greaterOrEquals';
    greaterOrEquals.option=this.translate.transform(greaterOrEquals.value);

    let between:ComboboxDTO=new ComboboxDTO();
    between.value='between';
    between.option=this.translate.transform(between.value);

    let isnull:ComboboxDTO=new ComboboxDTO();
    isnull.value='isnull';
    isnull.option=this.translate.transform(isnull.value);

    let isnotnull:ComboboxDTO=new ComboboxDTO();
    isnotnull.value='isnotnull';
    isnotnull.option=this.translate.transform(isnotnull.value);

    if(this.column.columnType=='String'){
      this.list=[equals,contains,startswith,endswith,isnull,isnotnull];
    }else if(this.column.columnType=='Boolean'){
      this.list=[equals];
    }else{
      this.list=[equals,less,lessOrEquals,greater,greaterOrEquals,between,isnull,isnotnull];
    }
  }
  
  submitForm(){
    if(this.column.columnType=='Long'
      || this.column.columnType=='BigDecimal'
      || this.column.columnType=='BigDecimal'
    ){
      this.value.parameter1=this.value.parameter1!=undefined?this.value.parameter1.toString():null;
      this.value.parameter2=this.value.parameter2!=undefined?this.value.parameter2.toString():null;
    }
    
    this.dialogRef.close(this.value);

  }

  public findEnumList(code:string):ComboboxDTO[]{

    let box:ComboboxDTO[]=[];
    let index=this.enums.findIndex(a=>a.code==code);

    if(index>-1){
      return this.enums[index].list;
    }

    return box;
  }

}
