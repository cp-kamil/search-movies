import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Movie } from './movie.model';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';;

@Component({
  selector: 'app-movie',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DragDropModule, BrowserModule],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie[] = [];
  protected columns: Movie[] = [];
  protected rows = [
    {
      columns: [
        { colName: 'Poster' },
        { colName: 'Title' },
        { colName: 'Year' },
        { colName: 'Type' },
        { colName: 'imdbID' },
      ],
    }
  ]
  private sortDir = 1;


 protected dropCol(event: CdkDragDrop<any[]>):void {
    moveItemInArray(this.columns, event.previousIndex , event.currentIndex);
  }

  public ngOnInit(): void {
    this.columns = this.rows
      .map((x) => x.columns)
      .reduce((reduce, val) => {
        return val;
      }, []);
  }

  protected onSortClick(event: MouseEvent, column: string | any): void {
    console.log('cossadasd', column)
    const target = event.currentTarget as HTMLInputElement,
      classList = target.classList;
    if (classList.contains('cdk-drag')) {
      classList.remove('cdk-drag');
      classList.add('sort');
      this.sortDir = -1;
    } else {
      classList.add('cdk-drag');
      this.sortDir = 1;
    }
    this.sortArr(column);
  }

  protected sortArr(colName: string): void {
    this.movie.sort((a: Movie | any, b: Movie | any) => {
      a = a[colName]?.toLowerCase();
      b = b[colName]?.toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
}
