import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { Collektion } from 'src/app/model/Collektion';

@Component({
  selector: 'app-edit-collektion',
  templateUrl: './edit-collektion.component.html',
  styleUrls: ['./edit-collektion.component.scss']
})
export class EditCollektionComponent {

  collection$: Observable<Collektion> = this.route.params.pipe(
    map(params => params.collektionId),
    switchMap(id => this.backend.getCollektion(id)),
  );

  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private backend: BackendService) {}

  onSave(newCollektion: Collektion): void {
    this.backend.updateCollektion(newCollektion).subscribe(savedCollektion => {
      this.router.navigate(['']);
      this.snackBar.open(`Collection ${savedCollektion.label} saved!`, 'Close');
    });
  }
}
