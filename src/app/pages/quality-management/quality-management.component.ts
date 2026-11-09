import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PolicyDocumentComponent } from '../../components/policy-document/policy-document.component';
import {
  QUALITY_INTERNAL_CONTROLS,
  QUALITY_META,
  QUALITY_SECTIONS
} from '../../data/quality-management-policy';

@Component({
  selector: 'es-quality-management',
  standalone: true,
  imports: [PolicyDocumentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <es-policy-document
      [meta]="meta"
      [sections]="sections"
      [internalControls]="internalControls"
      badge="Quality assurance"
      basePath="/policies/quality-management"
    />
  `
})
export class QualityManagementComponent {
  readonly meta = QUALITY_META;
  readonly sections = QUALITY_SECTIONS;
  readonly internalControls = QUALITY_INTERNAL_CONTROLS;
}
