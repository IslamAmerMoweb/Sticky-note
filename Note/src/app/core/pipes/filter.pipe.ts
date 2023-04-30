import { Pipe, PipeTransform } from '@angular/core';
import { note } from '../interface';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(notes: note, word: string): any[] {
    return notes?.filter((note) =>
      note.title.toLowerCase().includes(word.toLowerCase())
    );
  }
}
