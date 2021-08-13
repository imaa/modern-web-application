import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramingLanguage } from '../programing-language-list/ProgramingLanguage';
import { ProgramingLanguageService } from '../services/programing-languages.service';

@Component({
  selector: 'app-programingLanguage',
  templateUrl: './programingLanguage.component.html',
  styleUrls: ['./programingLanguage.component.css'],
})
export class ProgramingLanguageComponent implements OnInit {
  private _programingLanguage: ProgramingLanguage = new ProgramingLanguage();
  public get programingLanguage(): ProgramingLanguage {
    return this._programingLanguage;
  }
  public set programingLanguage(v: ProgramingLanguage) {
    this._programingLanguage = v;
  }

  constructor(
    private ProgramingLanguageservice: ProgramingLanguageService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProgramingLanguage(this.router.snapshot.params['id']);
  }
  loadProgramingLanguage(id: string) {
    this.ProgramingLanguageservice.getProgramingLanguage(id).subscribe(
      this.getProgramingLanguagesuccess.bind(this),
      () => {}
    );
  }
  private getProgramingLanguagesuccess(programingLanguage: ProgramingLanguage) {
    console.log(programingLanguage);
    this.programingLanguage = programingLanguage;
  }
}
