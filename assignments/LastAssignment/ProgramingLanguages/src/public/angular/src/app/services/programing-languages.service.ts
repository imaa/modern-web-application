import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProgramingLanguage } from '../programing-language-list/ProgramingLanguage';

@Injectable({
  providedIn: 'root',
})
export class ProgramingLanguageService {
  constructor(private _http: HttpClient) { }

  public getProgramingLanguages(skip:number,limit:number): Observable<ProgramingLanguage[]> {
    return this._http.get<ProgramingLanguage[]>(environment.apiBaseUrl + 'programingLanguages?skip='+skip+'&limit='+limit);
  }
  public getProgramingLanguage(id: string): Observable<ProgramingLanguage> {
    return this._http.get<ProgramingLanguage>(environment.apiBaseUrl + 'programingLanguages/' + id);
  }
  public deleteProgramingLanguage(id: string): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiBaseUrl + 'programingLanguages/' + id);
  }
  public saveProgramingLanguage(programingLanguage: ProgramingLanguage): Observable<boolean> {
    return this._http.post<boolean>(environment.apiBaseUrl + 'programingLanguages', programingLanguage);
  }
  public updateFullProgramingLanguage(id: string, programingLanguage: ProgramingLanguage): Observable<boolean> {
    return this._http.put<boolean>(environment.apiBaseUrl + 'programingLanguages/' + id, programingLanguage);
  }
  public updatePartialProgramingLanguage(id: string, programingLanguage: ProgramingLanguage): Observable<boolean> {
    return this._http.patch<boolean>(environment.apiBaseUrl + 'programingLanguages/' + id, programingLanguage);
  }
}
