import { FormControl } from "@angular/forms";

import { CollektionItemField, CollektionItemFieldType } from "src/app/model/Collektion";

export abstract class CustomFormControl<Type extends CollektionItemFieldType> extends FormControl {
  constructor(public type: Type, public key: string, public label: string) {
      super();
  }
}

export class TextFormControl extends CustomFormControl<'TEXT'> {
  constructor(key: string, label: string) {
      super('TEXT', key, label);
  }
}

export class BooleanFormControl extends CustomFormControl<'BOOLEAN'> {
  constructor(key: string, label: string) {
      super('BOOLEAN', key, label);
  }
}

export class IntegerFormControl extends CustomFormControl<'INTEGER'> {
  constructor(key: string, label: string) {
      super('INTEGER', key, label);
  }
}

export class DateFormControl extends CustomFormControl<'DATE'> {
  constructor(key: string, label: string) {
      super('DATE', key, label);
  }
}

export function formControlFromCustomField(field: CollektionItemField): CustomFormControl<CollektionItemFieldType> {
    switch(field.type) {
        case 'TEXT': return new TextFormControl(field.key, field.label);
        case 'BOOLEAN': return new BooleanFormControl(field.key, field.label);
        case 'INTEGER': return new IntegerFormControl(field.key, field.label);
        case 'DATE': return new DateFormControl(field.key, field.label);
    }
}