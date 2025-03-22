import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReadCookieService } from '../services/read-cookie.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  readCookie:ReadCookieService=new ReadCookieService();


  transform(value: string): string {

    let lang: string = environment.defaultLang;

    if (this.readCookie.getCookie('lang') != undefined) {
      lang = this.readCookie.getCookie('lang')!;
    }

    let map: Map<string, string> = new Map();

    switch (lang) {
      case 'enUS': {
        map = this.enUS();
        break;
      }
      case 'srLatnRS': {
        map = this.srLatnRS();
        break;
      }
      case 'srRS': {
        map = this.srRS();
        break;
      }
    }

    if (map.has(value)) {
      return map.get(value)!;
    } else {
      return value;
    }


  }

  private srLatnRS(): Map<string, string> {
    let map: Map<string, string> = new Map();

    map.set("username", "Korisničko ime");
    map.set("password", "Lozinka");
    map.set("login", "Prijava");
    map.set("language", "Jezik");
    map.set("nopagefound", "Stranica nije pronađena");
    map.set("noright", "Bez prava");
    map.set("exit", "Izlaz");
    map.set("Y", "D");
    map.set("N", "N");
    map.set('firstPage', 'Prva stanica');
    map.set('itemsPerPage', 'Broj stavki po stranici');
    map.set('lastPage', 'Poslednja stranica');
    map.set('nextPage', 'Sledeća stranica');
    map.set('previousPage', 'Prethodna stranica');
    map.set('page0of0', '0 od 0');
    map.set('page', 'Stranica');
    map.set('of', 'od');
    map.set('equals', 'jednako');
    map.set('contains', 'sadrži');
    map.set('startswith', 'počinje sa');
    map.set('endswith', 'završava se sa');
    map.set('less', '<');
    map.set('lessOrEquals', '<=');
    map.set('greater', '>');
    map.set('greaterOrEquals', '>=');
    map.set('between', 'između');
    map.set('isnull', 'je prazno');
    map.set('isnotnull', 'nije prazno');
    map.set('cancel', 'Odustani');
    map.set('enter', 'Unos');
    map.set('add', 'Dodaj');
    map.set('edit', 'Izmeni');
    map.set('delete', 'Brisanje [F4]');
    map.set('history', 'Istorija');
    map.set('filter', 'Filter');
    map.set('column', 'Kolona');
    map.set('operation', 'Operacija');
    map.set('parameter', 'Parametar');
    map.set('parameter2', 'Parametar 2');
    map.set('yes', 'Da');
    map.set('no', 'Ne');
    map.set('yesNoDelete', 'Da li obrisati stavku?');
    map.set('choose', 'Izaberi');
    map.set('itemDeleted', 'Stavka je obrisana!');
    map.set('itemMustBeSelected', 'Stavka mora biti odabrana!');
    map.set('modeling','Modeliranje');
    map.set('itemLock','Zaključaj');
    map.set('itemUnlock','Otključaj');
    map.set('lockYesNo','Da li zaključati stavku?');
    map.set('unlockYesNo','Da li otključati stavku?');
    map.set('detail','Detalj');
    map.set('columns','Kolone');
    map.set('triggers','Trigeri');
    map.set('importTemplate','Šablon za uvoz');
    map.set('importFinished','Datoteka je uvezena!');
    map.set('importFile','Uvoz datoteke');
    map.set('tables','Tabele');
    map.set('showData','Prikaži');
    map.set('execute','Izvrši');
    map.set('sum','Suma');
    map.set('excel','Excel');
    map.set('refreshJasperFiles','Ažuriraj Jasper datoteke');
    map.set('refreshJasperFilesYesNo','Da li ažurirati Jasper datoteke na Jasper putanji?');
    map.set('refreshJasperFilesFinished','Ažuriranje Jasper datoteke završeno!');
    map.set('reportgroups','Grupe izveštaja');
    map.set('report','Izveštaj');
    map.set('reports','Izveštaji');
    map.set('addToColumns','Dodaj u kolone');
    map.set('save','Sačuvaj');
    map.set('addToMetrics','Dodaj metriku');
    map.set('sort','Sortiranje');
    map.set('number','Broj');
    map.set('direction','Smer');
    map.set('addToFilter','Dodaj u filtere');
    map.set('defaultParameter','Podrazumevan parametar');
    map.set('from','od');
    map.set('to','do');
    map.set('changeName','Promeni naziv');
    map.set('name','Naziv');
    map.set('total','Total');
    map.set('changePassword','Promenu lozinku');
    map.set('passwordIsChanged','Lozinka je promenjena');
    map.set('passwordAgain','Ponovi lozinku');
    map.set('passwordNotMatching','Lozinke se ne podudaraju');
    map.set('reloadData','Osveži podatke');
    map.set('jobScheduling','Zakazivanje zadatka');
    map.set("setDefaultDashboard", "Postavi na naslovnoj strani");
    map.set("removeDefaultDashboard", "Ukloni sa naslove strani");
    map.set("dashobardIsDefault", "Ukloni sa naslove strani");
    map.set("dashboardIsNotDefault", "Pregledna tabla nije podrazumevana");
    map.set("logs", "Logovi");
    map.set("download", "Preuzmi");
    map.set("jobStarted", "Zadatak je pokrenut");
    map.set("setunread", "Promeni u nepročitano");
    map.set("executeProcedure", "Izvrši proceduru");

    return map;
  }

  private srRS(): Map<string, string> {
    let map: Map<string, string> = new Map();

    map.set("username", "Корисничко име");
    map.set("password", "Лозинкa");
    map.set("login", "Пријава");
    map.set("language", "Језик");
    map.set("nopagefound", "Страница није пронађена");
    map.set("noright", "Без права");
    map.set("exit", "Излаз");
    map.set("Y", "Д");
    map.set("N", "Н");
    map.set('firstPage', 'Прва станица');
    map.set('itemsPerPage', 'Број ставки по страници');
    map.set('lastPage', 'Последња страница');
    map.set('nextPage', 'Следећа страница');
    map.set('previousPage', 'Претходна страница');
    map.set('page0of0', '0 од 0');
    map.set('page', 'Страница');
    map.set('of', 'од');
    map.set('equals', 'једнако');
    map.set('contains', 'садржи');
    map.set('startswith', 'почиње са');
    map.set('endswith', 'завршава се са');
    map.set('less', '<');
    map.set('lessOrEquals', '<=');
    map.set('greater', '>');
    map.set('greaterOrEquals', '>=');
    map.set('between', 'између');
    map.set('isnull', 'је празно');
    map.set('isnotnull', 'није празно');
    map.set('cancel', 'Одустани');
    map.set('enter', 'Унос');
    map.set('add', 'Додај');
    map.set('edit', 'Измени');
    map.set('delete', 'Брисање [F4]');
    map.set('history', 'Историја');
    map.set('filter', 'Филтер');
    map.set('column', 'Колона');
    map.set('operation', 'Операција');
    map.set('parameter', 'Параметар');
    map.set('parameter2', 'Параметар 2');
    map.set('yes', 'Да');
    map.set('no', 'Не');
    map.set('yesNoDelete', 'Да ли обрисати ставку?');
    map.set('choose', 'Изабери');
    map.set('itemDeleted', 'Ставка је обрисана!');
    map.set('itemMustBeSelected', 'Ставка мора бити одабрана!');
    map.set('modeling','Моделирање');
    map.set('itemLock','Закључај');
    map.set('itemUnlock','Откључај');
    map.set('lockYesNo','Да ли закључати ставку?');
    map.set('unlockYesNo','Да ли откључати ставку?');
    map.set('detail','Детаљ');
    map.set('columns','Колоне');
    map.set('triggers','Тригери');
    map.set('importTemplate','Шаблон за увоз');
    map.set('importFinished','Датотека је увезена!');
    map.set('importFile','Увоз датотеке');
    map.set('tables','Табеле');
    map.set('showData','Прикажи');
    map.set('execute','Изврши');
    map.set('sum','Сума');
    map.set('excel','Ексел');
    map.set('refreshJasperFiles','Ажурирај Jasper датотеке');
    map.set('refreshJasperFilesYesNo','Да ли ажурирати Јаспер датотеке на Јаспер путањи?');
    map.set('refreshJasperFilesFinished','Ажурирање Јаспер датотеке завршено!');
    map.set('reportgroups','Групе извештаја');
    map.set('report','Извештај');
    map.set('reports','Извештаји');
    map.set('addToColumns','Додај у колоне');
    map.set('save','Сачувај');
    map.set('addToMetrics','Додај метрику');
    map.set('sort','Сортирање');
    map.set('number','Број');
    map.set('direction','Смер');
    map.set('addToFilter','Додај у филтере');
    map.set('defaultParameter','Подразумеван параметар');
    map.set('from','од');
    map.set('to','до');
    map.set('changeName','Промени назив');
    map.set('name','Назив');
    map.set('total','Тотал');
    map.set('changePassword','Промену лозинку');
    map.set('passwordIsChanged','Лозинка је промењена');
    map.set('passwordAgain','Понови лозинку');
    map.set('passwordNotMatching','Лозинке се не подударају');
    map.set('reloadData','Освежи податке');
    map.set('jobScheduling','Заказивање задатка');
    map.set("setDefaultDashboard", "Постави на насловној страни");
    map.set("removeDefaultDashboard", "Уклони са наслове страни");
    map.set("dashobardIsDefault", "Прегледна табла је подразумевана");
    map.set("dashboardIsNotDefault", "Прегледна табла није подразумевана");
    map.set("logs", "Логови");
    map.set("download", "Преузми");
    map.set("jobStarted", "Задатак је покренут");
    map.set("setunread", "Промени у непрочитано");
    map.set("executeProcedure", "Изврши процедуру");

    return map;
  }

  private enUS(): Map<string, string> {
    let map: Map<string, string> = new Map();

    map.set("username", "Username");
    map.set("password", "Password");
    map.set("login", "Login");
    map.set("language", "Language");
    map.set("nopagefound", "Page not found");
    map.set("noright", "No right");
    map.set("exit", "Exit");
    map.set("Y", "Y");
    map.set("N", "N");
    map.set('firstPage', 'First page');
    map.set('itemsPerPage', 'Items per page');
    map.set('lastPage', 'Last page');
    map.set('nextPage', 'Next page');
    map.set('previousPage', 'Prevoius page');
    map.set('page0of0', '0 of 0');
    map.set('page', 'Page');
    map.set('of', 'of');
    map.set('equals', 'equals');
    map.set('contains', 'contains');
    map.set('startswith', 'startswith');
    map.set('endswith', 'endswith');
    map.set('less', '<');
    map.set('lessOrEquals', '<=');
    map.set('greater', '>');
    map.set('greaterOrEquals', '>=');
    map.set('between', 'between');
    map.set('isnull', 'is null');
    map.set('isnotnull', 'is not null');
    map.set('cancel', 'Cancel');
    map.set('enter', 'Enter');
    map.set('add', 'Add');
    map.set('edit', 'Edit');
    map.set('delete', 'Delete [F4]');
    map.set('history', 'History');
    map.set('filter', 'Filter');
    map.set('column', 'Column');
    map.set('operation', 'Operation');
    map.set('parameter', 'Parameter');
    map.set('parameter2', 'Parameter 2');
    map.set('yes', 'Yes');
    map.set('no', 'No');
    map.set('yesNoDelete', 'Do you want to delete item?');
    map.set('choose', 'Choose');
    map.set('itemDeleted', 'Item is deleted!');
    map.set('itemMustBeSelected', 'Item must be selected!');
    map.set('modeling','Modeling');
    map.set('itemLock','Lock');
    map.set('itemUnlock','Unlock');
    map.set('lockYesNo','Do you want to lock item?');
    map.set('unlockYesNo','Do you want to unlock item?');
    map.set('detail','Detail');
    map.set('columns','Columns');
    map.set('triggers','Triggers');
    map.set('importTemplate','Template for import');
    map.set('importFinished','File is imported!');
    map.set('importFile','Import file');
    map.set('tables','Tables');
    map.set('showData','SQL Query');
    map.set('execute','Execute');
    map.set('sum','Sum');
    map.set('excel','Excel');
    map.set('refreshJasperFiles','Refresh Jasper files');
    map.set('refreshJasperFilesYesNo','Do you want to refresh Jasper files on Jaspet path?');
    map.set('refreshJasperFilesFinished','Refreshing of Jaspes files is finished!');
    map.set('reportgroups','Report groups');
    map.set('report','Report');
    map.set('reports','Reports');
    map.set('addToColumns','Add to columns‘');
    map.set('save','Save');
    map.set('addToMetrics','Add metric');
    map.set('sort','Sorting');
    map.set('number','Number');
    map.set('direction','Direction');
    map.set('addToFilter','Add to filter');
    map.set('defaultParameter','Default parameter');
    map.set('from','from');
    map.set('to','to');
    map.set('changeName','Change name');
    map.set('name','Name');
    map.set('total','Total');
    map.set('changePassword','Change password');
    map.set('passwordIsChanged','Password is changed');
    map.set('passwordAgain','Password again');
    map.set('passwordNotMatching','Passwords are not matching');
    map.set('reloadData','Reload data');
    map.set('jobScheduling','Job scheduling');
    map.set("setDefaultDashboard", "Set on home page");
    map.set("removeDefaultDashboard", "Remove from home page");
    map.set("dashobardIsDefault", "Dashboard is default");
    map.set("dashboardIsNotDefault", "Dashboard is not default");
    map.set("logs", "Logs");
    map.set("download", "Download");
    map.set("jobStarted", "Job has started");
    map.set("setunread", "Mark as unread");
    map.set("executeProcedure", "Execute procedure");

    return map;
  }


}
