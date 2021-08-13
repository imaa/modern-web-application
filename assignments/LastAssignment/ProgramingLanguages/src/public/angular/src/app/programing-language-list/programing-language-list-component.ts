import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProgramingLanguageService } from '../services/programing-languages.service';
import { UserService } from '../services/user.service';
import { ProgramingLanguage } from './ProgramingLanguage';

@Component({
  selector: 'app-programing-language-programingLanguage-list',
  templateUrl: './programing-language-list.component.html',
  styleUrls: ['./programing-language.component.css'],
})
export class ProgramingLanguageListComponent implements OnInit {
  private _programingLanguage: ProgramingLanguage = new ProgramingLanguage();
  public get programingLanguage(): ProgramingLanguage {
    return this._programingLanguage;
  }
  public set programingLanguage(v: ProgramingLanguage) {
    this._programingLanguage = v;
  }

  private _ProgramingLanguages: ProgramingLanguage[] = [];
  public get programingLanguages(): ProgramingLanguage[] {
    return this._ProgramingLanguages;
  }
  private set programingLanguages(programingLanguages: ProgramingLanguage[]) {
    this._ProgramingLanguages = programingLanguages;
  }

  private _isAuthenticated: boolean = false;
  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public set isAuthenticated(v: boolean) {
    this._isAuthenticated = v;
  }

  private _skip: number = 0;
  public get skip(): number {
    return this._skip;
  }
  public set skip(v: number) {
    this._skip = v;
  }

  private _limit: number = 5;
  public get limit(): number {
    return this._limit;
  }
  public set limit(v: number) {
    this._limit = v;
  }

  private _success: boolean = false;
  public get success(): boolean {
    return this._success;
  }
  public set success(v: boolean) {
    this._success = v;
  }

  private _error: string = '';
  public get error(): string {
    return this._error;
  }
  public set error(v: string) {
    this._error = v;
  }

  constructor(
    private programingLanguageService: ProgramingLanguageService,
    private route: ActivatedRoute,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.skip = this.route.snapshot.queryParams.skip ?? 0;
    this.limit = this.route.snapshot.queryParams.limit ?? 5;
    this.getProgramingLanguages();
  }
  previous() {
    this.skip -= this.limit;
    this.getProgramingLanguages();
  }
  next() {
    this.skip += this.limit;
    this.getProgramingLanguages();
  }
  edit(programingLanguage: ProgramingLanguage) {
    this.programingLanguage = programingLanguage;
  }
  deleteProgramingLanguage(programingLanguage: ProgramingLanguage) {
    if (confirm('Are you sure you want to delete this programing language?')) {
      this.programingLanguageService
        .deleteProgramingLanguage(programingLanguage._id)
        .subscribe(
          (programingLanguage) => {
            this.getProgramingLanguages();
          },
          (err) => {}
        );
    }
  }
  addUpdateProgramingLanguage(form: any) {
    if (form.valid) {
      this.success = false;
      this.error = '';
      if (this.programingLanguage._id) {
        this.programingLanguageService
          .updateFullProgramingLanguage(this.programingLanguage._id, this.programingLanguage)
          .subscribe(
            (programingLanguage) => {
              this.success = true;
              this.getProgramingLanguages();
              this.programingLanguage = new ProgramingLanguage();
              form.resetForm();
            },
            (err) => {
              this.error = err;
            }
          );
      } else {
        this.programingLanguageService
          .saveProgramingLanguage(this.programingLanguage)
          .subscribe(
            (programingLanguage) => {
              this.getProgramingLanguages();
              this.success = true;
              this.programingLanguage = new ProgramingLanguage();
              form.resetForm();
            },

            (err) => {
              this.error = err.error;
            }
          );
      }
    } else this.error = 'Please fill all the required fields';
  }

  getProgramingLanguages() {
    this.programingLanguageService
      .getProgramingLanguages(this.skip, this.limit)
      .subscribe(
        (programingLanguages) => {
          this.programingLanguages = programingLanguages;
        },
        (err) => {}
      );
  }
}
