import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PolicyDocumentComponent } from '../../components/policy-document/policy-document.component';
import {
  RECORDS_INTERNAL_CONTROLS,
  RECORDS_META,
  RECORDS_SECTIONS
} from '../../data/records-management-policy';

@Component({
  selector: 'es-records-management',
  standalone: true,
  imports: [PolicyDocumentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <es-policy-document
      [meta]="meta"
      [sections]="sections"
      [internalControls]="internalControls"
      badge="Records &amp; data protection"
      basePath="/policies/records-management"
    />
  `
})
export class RecordsManagementComponent {
  readonly meta = RECORDS_META;
  readonly sections = RECORDS_SECTIONS;
  readonly internalControls = RECORDS_INTERNAL_CONTROLS;
}
