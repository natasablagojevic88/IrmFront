import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckMobileService } from '../../../../services/check-mobile.service';
import { ComboboxDTO } from '../../../../model/ComboboxDTO';
import { SendRequestService } from '../../../../services/send-request.service';

@Component({
  selector: 'app-column-dialog',
  templateUrl: './column-dialog.component.html',
  styleUrl: './column-dialog.component.css'
})
export class ColumnDialogComponent {

  value: any;
  names: any;

  listType: ComboboxDTO[] = []
  listCodebook: ComboboxDTO[] = []
  listJsonFunction:ComboboxDTO[]=[];

  showParent: boolean = false;
  listParentColumn: ComboboxDTO[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ColumnDialogComponent>,
    public checkMobile: CheckMobileService,
    public sendRequest: SendRequestService
  ) {
    this.value = data[0];
    this.names = data[1];
    this.listType = data[2];
    this.listCodebook = data[3];
    this.listJsonFunction=data[4];
  }

  submit() {
    this.sendRequest.post('/api/model/column', this.value)
      .then((response) => { this.dialogRef.close(response); })
      .catch(() => { })
  }

  changeType(type: any) {
    if (type == 'STRING') {
      if (this.value.length == undefined) {
        this.value.length = 255;
      }
    } else {
      this.value.length = undefined;
    }

    if (type == 'BOOLEAN') {
      this.value.nullable = false;
    }

    if (type == 'BIGDECIMAL') {
      if (this.value.precision == undefined) {
        this.value.precision = 2;
      }
    } else {
      this.value.precision = undefined;
    }

    if (type == 'CODEBOOK') {
      if (this.value.codebookModelId == undefined) {
        if (this.listCodebook.length > 0) {
          this.value.codebookModelId = this.listCodebook[0].value;
        }
      }
    } else {
      this.value.codebookModelId = undefined;
    }
  }

  changeCodebook() {

    if (this.value.codebookModelId == undefined) {
      this.showParent = false;
      this.listParentColumn = [];
      this.value.parentId=undefined;
    } else {
      if (this.value.codebookModelId.toString().length == 0) {
        this.showParent = false;
        this.listParentColumn = [];
        this.value.parentId=undefined;
      } else {
        this.sendRequest.get('/api/model/checkparent/' + this.value.id + '/' + this.value.modelId + '/' + this.value.codebookModelId)
          .then((response) => {
            this.showParent = response.needParent;
            if (this.showParent) {
              this.listParentColumn = response.list;
              if (this.listParentColumn.length > 0 && this.value.parentId == undefined) {
                this.value.parentId = this.listParentColumn[0].value.toString();
              }
            } else {
              this.listParentColumn = [];
              this.value.parentId=undefined;
            }

          }).catch(() => { })

      }
    }

  }

}
