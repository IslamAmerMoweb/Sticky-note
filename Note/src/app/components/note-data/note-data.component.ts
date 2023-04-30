import jwtDecode from 'jwt-decode';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss'],
})
export class NoteDataComponent {
  noteForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _Auth: AuthService,
    private _MatDialogRef: MatDialogRef<NoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { note: any }
  ) {}
  ngOnInit() {
    this.createForm();
  }
  createForm(): void {
    this.noteForm = this._fb.group({
      title: [this.data ? this.data.note.title : '', [Validators.required]],
      desc: [this.data ? this.data.note.desc : '', [Validators.required]],
      token: localStorage.getItem('token'),
    });
  }

  noteModel() {
    const model = {
      ...this.noteForm.value,
      id: this._Auth.userData.getValue()._id,
    };
    if (this.data == null) {
      this.addnotes(model);
    } else {
      this.updateNote(model);
    }
  }

  addnotes(form: object) {
    this._Auth.addNote(form).subscribe((res) => {
      if (res.apiStatus == 'success') {
        this._MatDialogRef.close('note');
      }
    });
  }

  updateNote(updteNote: object) {
    this._Auth.updateNote(updteNote, this.data.note._id).subscribe((res) => {
      if (res.apiStatus == 'success') {
        this._MatDialogRef.close('updated');
      }
    });
  }

  error(name: string, nameErr: string): boolean {
    return this.noteForm.get(name)!.hasError(nameErr);
  }
}
