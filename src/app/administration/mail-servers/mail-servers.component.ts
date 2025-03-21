import { Component, ViewChild } from '@angular/core';
import { ComboboxDTO } from '../../model/ComboboxDTO';
import { SendRequestService } from '../../services/send-request.service';
import { OpenDialogService } from '../../services/open-dialog.service';
import { MailServerDialogComponent } from './mail-server-dialog/mail-server-dialog.component';
import { TableComponent } from '../../common-components/table/table.component';
import { TableButton } from '../../model/TableButton';
import { ExportTableAction } from '../../model/ExportTableAction';
import { SendTestMailDialogComponent } from './send-test-mail-dialog/send-test-mail-dialog.component';
import { SendInfoService } from '../../services/send-info.service';

@Component({
  selector: 'app-mail-servers',
  templateUrl: './mail-servers.component.html',
  styleUrl: './mail-servers.component.css'
})
export class MailServersComponent {

  title:string='';
  names:any;

  listSecurity:ComboboxDTO[]=[]

  @ViewChild(TableComponent) table!:TableComponent;

  testMailNames:any;
  mailServerWorksLabel:string='';

  testButton:TableButton={
    code: 'testmail',
    icon: 'fa fa-envelope',
    name: '',
    color: 'green'
  }

  constructor(
    sendRequest:SendRequestService,
    public openDialog:OpenDialogService,
    public sendInfo:SendInfoService
  ){

    sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.SmtpSecurity')
    .then((response)=>{
      this.listSecurity=response;
    })

    sendRequest.get('/api/session/names/rs.irm.administration.dto.TestSmtpDTO')
    .then((response)=>{
      this.testMailNames=response;
      this.testButton.name=this.testMailNames.TestSmtpDTO;
    })
    sendRequest.resource('mailServerWorks')
    .then((response)=>{
      this.mailServerWorksLabel=response;
    }).catch(()=>{})
  }

  add(){
    let value:any={};
    value.id=0;
    value.port=25;
    value.authentication=false;
    value.security="NONE";
    this.openDialog.openDialog(MailServerDialogComponent,900,[value,this.names,this.listSecurity])
    .then((response)=>{
      this.table.addRow(response.id);
    }).catch(()=>{})

  }

  edit(value:any){
    this.openDialog.openDialog(MailServerDialogComponent,900,[value,this.names,this.listSecurity])
    .then((response)=>{
      this.table.editRow(response);
    }).catch(()=>{})
  }

  mailServerTest(event:ExportTableAction){
    this.openDialog.openDialog(SendTestMailDialogComponent,500,[event.row,this.testMailNames])
    .then(()=>{
      this.sendInfo.open(this.mailServerWorksLabel,false);
    })
    .catch(()=>{})
  }
}
