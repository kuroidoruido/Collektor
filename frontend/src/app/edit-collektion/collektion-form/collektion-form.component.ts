import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Collektion, CollektionItemFieldTypes } from 'src/app/model/Collektion';
import { isDefined } from 'src/app/shared/assert.utils';

@UntilDestroy()
@Component({
  selector: 'app-collektion-form',
  templateUrl: './collektion-form.component.html',
  styleUrls: ['./collektion-form.component.scss']
})
export class CollektionFormComponent implements OnChanges {
  customFieldTypes = CollektionItemFieldTypes;
  @Input() model: Collektion = {
    id: '',
    label: '',
    customFields: []
  };
  @Output() save = new EventEmitter<Collektion>();

  form = new FormGroup({
    label: new FormControl(this.model.label, Validators.required),
    imgUrl: new FormControl(this.model.imgUrl),
    customFields: new FormArray([]),
  });

  get customFieldsArray(): FormArray {
    return this.form.get('customFields') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model) {
      const { id, ...newModel }: Collektion = changes.model.currentValue;
      newModel.customFields.forEach(() => this.addCustomField());
      this.form.setValue({ imgUrl: '', ...newModel});
    }
  }

  addCustomField(): void {
    const control = new FormGroup({
      label: new FormControl(''),
      key: new FormControl(''),
      type: new FormControl('TEXT'),
    });
    control.get('label')!.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: string) => {
        control.get('key')!.setValue(value.toLocaleLowerCase().trim().replace(/[^a-z0-9]/g, '-'))
      });
    this.customFieldsArray.controls.push(control)
  }

  removeCustomField(index: number): void {
    this.customFieldsArray.controls.splice(index, 1);
  }

  submit(): void {
    if (!this.form.invalid) {
      const formState: Collektion = this.form.getRawValue();
      if (isDefined(this.model.id)) {
        formState.id = this.model.id;
      }
      this.save.emit(formState);
    }
  }
}
