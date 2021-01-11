import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { BackendService } from 'src/app/backend/backend.service';
import { Collektion } from 'src/app/model/Collektion';

@Component({
  selector: 'app-add-collektion',
  templateUrl: './add-collektion.component.html',
  styleUrls: ['./add-collektion.component.scss']
})
export class AddCollektionComponent {

  constructor(private backend: BackendService, private router: Router, private snackBar: MatSnackBar) { }

  onSave(newCollektion: Omit<Collektion, 'id'>): void {
    this.backend.createCollektion(newCollektion).subscribe(savedCollektion => {
      this.router.navigate(['']);
      this.snackBar.open(`Collection ${savedCollektion.label} saved!`, 'Close');
    });
  }
}
