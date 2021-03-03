import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Collektion, CollektionItemFieldType } from 'src/app/model/Collektion';
import { CollektionItem } from 'src/app/model/CollektionItem';
import { isDefined } from 'src/app/shared/assert.utils';
import { CustomFormControl, defaultTypeForFormControl, formControlFromCustomField } from './custom-form-controls';

type CustomFormArray = Omit<FormArray, 'controls'> & { controls: CustomFormControl<CollektionItemFieldType>[] };

function emptyCollektionItem(): CollektionItem {
  return {
    id: '',
    label: '',
    customFields: {},
    photoUrls: [],
  };
}

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnChanges {
  @Input() collektion: Collektion | null | undefined;
  @Input() model: CollektionItem = emptyCollektionItem();
  @Output() save = new EventEmitter<CollektionItem>();

  form = new FormGroup({
    label: new FormControl(this.model.label, Validators.required),
    photoUrls: new FormControl(this.model.photoUrls[0]),
    customFields: new FormArray([]),
  });

  get customFieldsArray(): CustomFormArray {
    return (this.form.get('customFields') as unknown) as CustomFormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isDefined(changes.collektion) && isDefined(changes.collektion.currentValue)) {
      const { id, ...newModel }: Collektion = changes.collektion.currentValue;
      newModel.customFields.forEach((field) => {
        this.customFieldsArray.controls.push(formControlFromCustomField(field));
      });
    }
    if (isDefined(changes.model) && isDefined(changes.model.currentValue)) {
      const newModel: CollektionItem = changes.model.currentValue;
      const photoUrls = isDefined(newModel.photoUrls) && isDefined(newModel.photoUrls[0]) ? newModel.photoUrls[0] : '';
      const customFields = this.customFieldsArray.controls.map(({ key, type }) => newModel.customFields[key] ?? defaultTypeForFormControl(type));
      this.form.setValue({
        label: newModel.label,
        photoUrls,
        customFields,
      });
    }
  }

  submit(): void {
    const formValue = this.form.getRawValue();
    const newModel: CollektionItem = { ...emptyCollektionItem(), ...this.model };
    newModel.label = formValue.label;
    if (isDefined(formValue.photoUrls) && formValue.photoUrls.length > 0) {
      newModel.photoUrls = [formValue.photoUrls];
    } else {
      newModel.photoUrls = [];
    }
    this.customFieldsArray.controls.forEach((control, index) => {
      newModel.customFields[control.key] = formValue.customFields[index];
    });
    this.save.emit(newModel);
  }
}
