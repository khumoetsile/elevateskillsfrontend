import { PolicyMeta, PolicySection } from './policy.types';
import { TERMS_META } from './terms-and-conditions';

export const QUALITY_META: PolicyMeta = {
  title: 'Quality Management Policy',
  shortTitle: 'Quality Management',
  effectiveDate: '2026',
  companyName: TERMS_META.companyName,
  summary:
    'How Elevate Skills maintains a Quality Management System for teaching, assessment, learner support, and continuous improvement.',
  owner: 'Quality Assurance Officer',
  approvedBy: 'Managing Director'
};

export const QUALITY_INTERNAL_CONTROLS: string[] = [
  'The Quality Assurance Officer is the policy owner and is responsible for maintaining and reviewing this policy.',
  'The Managing Director must approve all new policies and revisions before implementation.',
  'This policy shall be reviewed annually or earlier if there are changes in legislation, BQA requirements, or organisational operations.',
  'All amendments shall be recorded in the Document Revision History.',
  'Superseded versions shall be archived and retained for a minimum of five (5) years.',
  'Only the latest approved version shall be available for use.',
  'Staff shall be informed of any revisions before the revised policy becomes effective.',
  'Policies and systems shall be maintained in accordance with the Records Management Policy.',
  'Compliance with this policy shall be monitored through internal audits and management reviews.'
];

export const QUALITY_SECTIONS: PolicySection[] = [
  {
    number: 1,
    title: 'Policy Statement',
    paragraphs: [
      'Elevate Skills (Pty) Ltd is committed to providing high-quality education and training services that meet the needs of learners, employers, stakeholders, and regulatory authorities.',
      'The organisation shall establish, implement, maintain, and continuously improve a Quality Management System (QMS) that promotes excellence in teaching, learning, assessment, learner support, administration, and organisational performance. The Quality Management System shall ensure compliance with the requirements of the Botswana Qualifications Authority (BQA), applicable legislation, industry standards, and institutional policies.'
    ]
  },
  {
    number: 2,
    title: 'Purpose',
    paragraphs: ['The purpose of this policy is to:'],
    bullets: [
      'Establish a framework for quality management',
      'Promote continuous improvement',
      'Ensure consistency in programme delivery',
      'Enhance learner satisfaction',
      'Ensure compliance with BQA requirements',
      'Support organisational effectiveness and sustainability',
      'Monitor and improve educational outcomes'
    ]
  },
  {
    number: 3,
    title: 'Scope',
    paragraphs: [
      'This policy applies to board members, management, employees, trainers and facilitators, assessors and moderators, learners, contractors, and external service providers.',
      'The policy covers all educational, training, assessment, administrative, and support activities conducted by Elevate Skills.'
    ]
  },
  {
    number: 4,
    title: 'Quality Objectives',
    subsections: [
      {
        title: '4.1 Learner satisfaction',
        paragraphs: ['Achieve learner satisfaction levels of at least 85%.']
      },
      {
        title: '4.2 Programme quality',
        paragraphs: [
          'Ensure all programmes meet approved learning outcomes and industry requirements.'
        ]
      },
      {
        title: '4.3 Compliance',
        paragraphs: [
          'Maintain full compliance with BQA and HRDC requirements and relevant legislation.'
        ]
      },
      {
        title: '4.4 Assessment integrity',
        paragraphs: [
          'Ensure assessments are valid, reliable, fair, transparent, and consistent.'
        ]
      },
      {
        title: '4.5 Continuous improvement',
        paragraphs: [
          'Implement corrective and preventive actions to improve organisational performance.'
        ]
      },
      {
        title: '4.6 Staff development',
        paragraphs: [
          'Provide ongoing professional development opportunities for staff and trainers.'
        ]
      }
    ]
  },
  {
    number: 5,
    title: 'Quality Management Principles',
    subsections: [
      {
        title: 'Learner focus',
        paragraphs: ['Learners are the primary beneficiaries of our services.']
      },
      {
        title: 'Leadership',
        paragraphs: ['Management shall provide clear direction and commitment to quality.']
      },
      {
        title: 'Engagement of people',
        paragraphs: ['Staff and trainers shall actively contribute to quality improvement.']
      },
      {
        title: 'Process approach',
        paragraphs: [
          'Activities shall be managed through documented processes and procedures.'
        ]
      },
      {
        title: 'Evidence-based decision making',
        paragraphs: [
          'Decisions shall be based on data, feedback, and measurable outcomes.'
        ]
      },
      {
        title: 'Continuous improvement',
        paragraphs: ['Quality enhancement shall be ongoing and systematic.']
      }
    ]
  },
  {
    number: 6,
    title: 'Quality Management System',
    paragraphs: ['The Quality Management System shall include:'],
    subsections: [
      {
        title: 'Governance and leadership',
        bullets: ['Strategic planning', 'Policy development', 'Management reviews']
      },
      {
        title: 'Programme management',
        bullets: ['Programme design', 'Programme approval', 'Programme review']
      },
      {
        title: 'Training delivery',
        bullets: ['Trainer management', 'Learning resources', 'Learner engagement']
      },
      {
        title: 'Assessment management',
        bullets: [
          'Assessment planning',
          'Assessment implementation',
          'Moderation processes'
        ]
      },
      {
        title: 'Learner support',
        bullets: [
          'Orientation',
          'Academic support',
          'Technical support',
          'Complaints management'
        ]
      },
      {
        title: 'Administration',
        bullets: ['Record management', 'Reporting', 'Certification']
      },
      {
        title: 'Continuous improvement',
        bullets: ['Audits', 'Evaluations', 'Corrective actions']
      }
    ]
  },
  {
    number: 7,
    title: 'Roles and Responsibilities',
    subsections: [
      {
        title: 'Board of Directors',
        bullets: [
          'Approve quality policies',
          'Monitor institutional performance',
          'Ensure adequate resources are available'
        ]
      },
      {
        title: 'Managing Director',
        bullets: [
          'Lead quality initiatives',
          'Ensure policy implementation',
          'Allocate resources',
          'Monitor compliance'
        ]
      },
      {
        title: 'Quality Assurance Officer',
        bullets: [
          'Coordinate quality activities',
          'Conduct internal audits',
          'Monitor compliance',
          'Maintain quality records',
          'Produce quality reports'
        ]
      },
      {
        title: 'Trainers and facilitators',
        bullets: [
          'Deliver quality training',
          'Follow approved curricula',
          'Conduct assessments appropriately',
          'Participate in quality improvement initiatives'
        ]
      },
      {
        title: 'Learners',
        bullets: [
          'Comply with institutional policies',
          'Participate in evaluations',
          'Provide feedback for improvement'
        ]
      }
    ]
  },
  {
    number: 8,
    title: 'Programme Quality Assurance',
    subsections: [
      {
        title: 'Programme development',
        paragraphs: ['Programmes must be:'],
        bullets: [
          'Industry relevant',
          'Outcome-based',
          'Properly documented',
          'Approved before implementation'
        ]
      },
      {
        title: 'Programme review',
        paragraphs: ['Programmes shall be reviewed annually considering:'],
        bullets: [
          'Learner feedback',
          'Completion rates',
          'Assessment outcomes',
          'Industry requirements and feedback'
        ]
      }
    ]
  },
  {
    number: 9,
    title: 'Training and Learning Quality',
    paragraphs: ['Elevate Skills shall ensure:'],
    bullets: [
      'Qualified trainers are appointed',
      'Learning materials are current and relevant',
      'Training methods are effective',
      'Learning resources are accessible'
    ]
  },
  {
    number: 10,
    title: 'Assessment Quality Assurance',
    paragraphs: ['Assessment systems shall ensure:'],
    subsections: [
      { title: 'Validity', paragraphs: ['Assessments measure intended outcomes.'] },
      { title: 'Reliability', paragraphs: ['Assessment results are consistent.'] },
      { title: 'Fairness', paragraphs: ['All learners are treated equally.'] },
      {
        title: 'Transparency',
        paragraphs: ['Assessment criteria are communicated clearly.']
      },
      {
        title: 'Security',
        paragraphs: ['Assessment records are protected and secure.']
      }
    ]
  },
  {
    number: 11,
    title: 'Moderation',
    paragraphs: ['Moderation shall be conducted to ensure:'],
    bullets: [
      'Assessment consistency',
      'Fairness of marking',
      'Compliance with policies',
      'Continuous improvement'
    ],
    subsections: [
      {
        title: 'Records',
        paragraphs: ['Moderation reports shall be maintained as quality records.']
      }
    ]
  },
  {
    number: 12,
    title: 'Learner Feedback',
    paragraphs: ['Feedback shall be collected through:'],
    bullets: [
      'Course evaluations',
      'Surveys',
      'Complaints',
      'Suggestions',
      'Focus groups'
    ],
    subsections: [
      {
        title: 'Use of feedback',
        paragraphs: ['Feedback shall be analysed and used to improve services.']
      }
    ]
  },
  {
    number: 13,
    title: 'Complaints and Appeals',
    paragraphs: [
      'Elevate Skills shall maintain procedures for learner complaints, staff complaints, and assessment appeals.',
      'All complaints and appeals shall be recorded, investigated, and resolved within established timelines.'
    ]
  },
  {
    number: 14,
    title: 'Internal Quality Audits',
    paragraphs: [
      'Internal quality audits shall be conducted at least twice annually to evaluate:'
    ],
    bullets: [
      'Compliance with policies',
      'Programme quality',
      'Assessment quality',
      'Learner support effectiveness',
      'Administrative performance'
    ],
    subsections: [
      {
        title: 'Reporting',
        paragraphs: ['Audit reports shall be submitted to management.']
      }
    ]
  },
  {
    number: 15,
    title: 'Management Review',
    paragraphs: [
      'Management shall review the effectiveness of the Quality Management System quarterly. The review shall consider:'
    ],
    bullets: [
      'Audit findings',
      'Learner satisfaction',
      'Complaints',
      'Assessment results',
      'Staff performance',
      'Strategic objectives'
    ],
    subsections: [
      {
        title: 'Follow-up',
        paragraphs: ['Improvement actions shall be documented and monitored.']
      }
    ]
  },
  {
    number: 16,
    title: 'Corrective and Preventive Actions',
    paragraphs: ['Where quality issues are identified:'],
    bullets: [
      'Root causes shall be investigated',
      'Corrective actions shall be implemented',
      'Preventive measures shall be introduced',
      'Effectiveness shall be monitored'
    ]
  },
  {
    number: 17,
    title: 'Document Control',
    paragraphs: ['All quality documents shall:'],
    bullets: [
      'Be approved before issue',
      'Be version controlled',
      'Be reviewed regularly',
      'Be securely stored',
      'Be accessible to authorised personnel'
    ]
  },
  {
    number: 18,
    title: 'Records Management',
    paragraphs: ['The following records shall be maintained:'],
    bullets: [
      'Learner records',
      'Assessment records',
      'Audit reports',
      'Moderation reports',
      'Complaints records',
      'Evaluation reports',
      'Staff records'
    ],
    subsections: [
      {
        title: 'Retention',
        paragraphs: [
          'Records shall be retained according to institutional requirements and applicable legislation. See also the Records Management Policy.'
        ]
      }
    ]
  },
  {
    number: 19,
    title: 'Continuous Improvement',
    paragraphs: [
      'Elevate Skills is committed to ongoing quality enhancement through:'
    ],
    bullets: [
      'Monitoring performance indicators',
      'Learner feedback',
      'Stakeholder engagement',
      'Internal audits',
      'Staff development',
      'Technology improvements'
    ],
    subsections: [
      {
        title: 'Planning',
        paragraphs: [
          'Continuous improvement activities shall form part of annual operational planning.'
        ]
      }
    ]
  },
  {
    number: 20,
    title: 'Policy Review',
    paragraphs: [
      'This policy shall be reviewed annually or whenever there are significant changes to BQA and HRDC requirements, organisational structure, training operations, or legislative requirements.'
    ]
  }
];
