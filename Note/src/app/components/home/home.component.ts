import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value = '';
  notes: any;
  constructor(public dialog: MatDialog, private _Auth: AuthService) {}

  ngOnInit(): void {
    this.noteModel();
    console.log('search', this._Auth.userData.getValue()._id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NoteDataComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'note') this.noteModel();
    });
  }

  noteModel() {
    const findNotes = {
      token: localStorage.getItem('token'),
      id: this._Auth.userData.getValue()._id,
    };
    this.getNotes(findNotes);
  }

  setData(note: object) {
    const matRef = this.dialog.open(NoteDataComponent, {
      data: { note },
    });
    matRef.afterClosed().subscribe({
      next: (res) => {
        if (res == 'updated') {
          this.noteModel();
        }
      },
    });
  }

  getNotes(findNotes: object) {
    this._Auth.allNote(findNotes).subscribe((res) => {
      if (res.apiStatus == 'success') {
        this.notes = res.data;
      }
    });
  }

  deleteNote(id: string, i: number): void {
    const model = {
      body: {
        _id: id,
        token: localStorage.getItem('token'),
      },
    };
    this._Auth.delNote(model).subscribe((res) => {
      if (res.apiStatus == 'success') {
        this.notes.splice(i, 1);
        this.notes = [...this.notes];
      }
    });
  }
}
