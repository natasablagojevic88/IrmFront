import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { SendRequestService } from '../../../services/send-request.service';

@Component({
  selector: 'app-dashboard-reports',
  templateUrl: './dashboard-reports.component.html',
  styleUrl: './dashboard-reports.component.css'
})
export class DashboardReportsComponent {

  @Input() inDashboard: any;
  @Input() labelOfColumn: string = '';
  @Input() labelOfRows: string = '';
  @Input() listReportBox: ComboboxDTO[] = [];
  @Input() map: any[] = []

  @Output() saveClicked: EventEmitter<boolean> = new EventEmitter<boolean>();


  translate: TranslatePipe = new TranslatePipe();

  height: number = 0;
  count: number = 0;
  constructor(
    public checkMobile: CheckMobileService,
    public sendRequest: SendRequestService
  ) {

  }

  ngOnInit() {
    this.refreshData();

  }

  ngAfterContentInit() {



    var dashboardReportDiv: HTMLElement = document.getElementsByClassName('dashboardReport')[0] as HTMLElement;

    this.height = dashboardReportDiv.offsetHeight;
  }

  usedData: any[] = [];

  refreshData() {
    this.count = this.inDashboard.columnnumber * this.inDashboard.rownumber;
    let newMap: any[] = [];
    this.usedData = [];

    let row: number = 1;
    let column: number = 1;
    for (let i = 0; i < this.count; i++) {

      let itemIndex = this.map.findIndex(a => a.row == row && a.column == column);
      let itemFound: any = this.map[itemIndex];

      if (itemFound == undefined) {
        itemFound = {}
        itemFound.row = row;
        itemFound.column = column;
        itemFound.colspan = 1;
        itemFound.rowspan = 1;
      }

      let checkIndex = this.usedData.findIndex(a => a.row == itemFound.row && a.column == itemFound.column);
     
      if (checkIndex == -1) {
        
        let dataItemUsed: any = {};
        dataItemUsed.row = itemFound.row;
        dataItemUsed.column = itemFound.column;

        this.usedData.push(dataItemUsed);
        

        for (let k = 1; k < itemFound.colspan; k++) {
          let dataItemUsed: any = {};
          dataItemUsed.row = itemFound.row;
          dataItemUsed.column = Number.parseInt(itemFound.column) + k;
          this.usedData.push(dataItemUsed);
        }

        for (let k = 1; k < itemFound.rowspan; k++) {
          let dataItemUsed: any = {};
          dataItemUsed.row = Number.parseInt(itemFound.row) + k;
          dataItemUsed.column = itemFound.column;

          this.usedData.push(dataItemUsed);

          for (let q = 1; q < itemFound.colspan; q++) {
            let dataItemUsed: any = {};
            dataItemUsed.row = Number.parseInt(itemFound.row) + k;
            dataItemUsed.column = Number.parseInt(itemFound.column) + q;
            this.usedData.push(dataItemUsed);
          }
        }

        let listOfWidths: ComboboxDTO[] = [];
        let number: number = 0;
        for (let k = itemFound.column; k <= this.inDashboard.columnnumber; k++) {
          number = number + 1;
          let combo: ComboboxDTO = {
            value: number,
            option: number + ''
          }
          listOfWidths.push(combo);
        }
        itemFound.widths = listOfWidths;

        number = 0;
        let listOfHeights: ComboboxDTO[] = [];
        for (let k = itemFound.row; k <= this.inDashboard.rownumber; k++) {
          number = number + 1;
          let combo: ComboboxDTO = {
            value: number,
            option: number + ''
          }
          listOfHeights.push(combo);
        }
        itemFound.heights = listOfHeights;

        newMap.push(itemFound);
      }

      column = column + 1;

      if (((i + 1) % this.inDashboard.columnnumber) == 0) {
        row = row + 1;
        column = 1;
      }
    }

    this.map = newMap;
  }

  save() {
    this.sendRequest.post('/api/dashboard/reports/' + this.inDashboard.id, this.map)
      .then(() => {
        this.saveClicked.emit(true);
      }).catch(() => { })
  }
}
