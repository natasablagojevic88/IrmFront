import { Injectable } from '@angular/core';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor() { }

  download(response:any) {
    let url = window.URL.createObjectURL(response.body);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download =  response.headers.get('filename');
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  downloadFileInAndroid(response:any) {
    Filesystem.writeFile({

      path: response.filename,
      data: response.base64String,
      directory: Directory.Documents

    }).then(
      () => {
        Filesystem.getUri({
          path: response.filename,
          directory: Directory.Documents
        }).then(
          (responseUri) => {
            const fileOpenerOptions: FileOpenerOptions = {
              filePath: responseUri.uri,
              contentType: response.type,
              openWithDefault: false,
            };
            FileOpener.open(fileOpenerOptions);
          }
        ).catch((error) => { })
      }
    ).catch((error) => { });
  }
}
