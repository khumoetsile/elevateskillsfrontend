import { PolicyMeta, PolicySection } from './policy.types';
import { TERMS_META } from './terms-and-conditions';

export const RECORDS_META: PolicyMeta = {
  title: 'Records Management Policy',
  shortTitle: 'Records Management',
  effectiveDate: '2026',
  companyName: TERMS_META.companyName,
  summary:
    'How Elevate Skills creates, stores, protects, retrieves, archives, and disposes of institutional and learner records.',
  owner: 'Quality Assurance Officer',
  approvedBy: 'Managing Director'
};

export const RECORDS_INTERNAL_CONTROLS: string[] = [
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

export const RECORDS_SECTIONS: PolicySection[] = [
  {
    number: 1,
    title: 'Policy Statement',
    paragraphs: [
      'Elevate Skills (Pty) Ltd is committed to maintaining accurate, reliable, secure, and accessible records that support educational delivery, quality assurance, regulatory compliance, business operations, and learner success.',
      'The organisation shall establish and maintain a Records Management System (RMS) to ensure all records are created, stored, maintained, protected, retrieved, archived, and disposed of in a systematic and controlled manner.'
    ]
  },
  {
    number: 2,
    title: 'Purpose',
    paragraphs: ['The purpose of this policy is to:'],
    bullets: [
      'Ensure proper management of institutional records',
      'Protect the integrity and confidentiality of information',
      'Support compliance with BQA and HRDC requirements',
      'Improve operational efficiency',
      'Support decision-making and accountability',
      'Ensure business continuity',
      'Facilitate audits and inspections'
    ]
  },
  {
    number: 3,
    title: 'Scope',
    paragraphs: ['This policy applies to:'],
    bullets: [
      'Board Members',
      'Management',
      'Employees',
      'Trainers',
      'Assessors',
      'Moderators',
      'Learners',
      'Contractors'
    ],
    subsections: [
      {
        title: 'Record formats covered',
        paragraphs: ['The policy applies to all records regardless of format:'],
        bullets: [
          'Electronic records',
          'LMS records',
          'Emails',
          'Paper records',
          'Audio records',
          'Video records',
          'Financial records'
        ]
      }
    ]
  },
  {
    number: 4,
    title: 'Records Management Objectives',
    paragraphs: ['Elevate Skills shall ensure that records are:'],
    subsections: [
      { title: 'Accurate', paragraphs: ['Records must reflect actual events and activities.'] },
      { title: 'Complete', paragraphs: ['Records must contain all required information.'] },
      { title: 'Secure', paragraphs: ['Records shall be protected from unauthorised access.'] },
      { title: 'Accessible', paragraphs: ['Records shall be easily retrievable when required.'] },
      { title: 'Reliable', paragraphs: ['Records shall remain authentic and trustworthy.'] },
      {
        title: 'Compliant',
        paragraphs: ['Records shall meet legal and regulatory requirements.']
      }
    ]
  },
  {
    number: 5,
    title: 'Records Management Structure',
    subsections: [
      { title: 'Board of Directors', paragraphs: ['Responsible for governance oversight.'] },
      { title: 'Managing Director', paragraphs: ['Responsible for overall implementation.'] },
      {
        title: 'Quality Assurance Officer',
        paragraphs: ['Responsible for compliance monitoring and audit readiness.']
      },
      {
        title: 'E-Learning Officer',
        paragraphs: ['Responsible for LMS-generated records and learner data.']
      },
      {
        title: 'Administrative Officer',
        paragraphs: ['Responsible for records filing, storage, and retrieval.']
      }
    ]
  },
  {
    number: 6,
    title: 'Record Classification System',
    subsections: [
      {
        title: 'Category A – Governance Records',
        paragraphs: ['Retention period: Permanent'],
        bullets: ['Strategic plans', 'Policies', 'Board minutes', 'Governance reports']
      },
      {
        title: 'Category B – Learner Records',
        paragraphs: ['Retention period: Minimum 7 years'],
        bullets: [
          'Applications',
          'Registration forms',
          'Learner agreements',
          'Attendance records',
          'Assessment results',
          'Certificates'
        ]
      },
      {
        title: 'Category C – Assessment Records',
        paragraphs: ['Retention period: 7 years'],
        bullets: [
          'Examination papers',
          'Assignments',
          'Marking guides',
          'Moderation reports',
          'Assessment decisions'
        ]
      },
      {
        title: 'Category D – Staff Records',
        paragraphs: ['Retention period: Duration of employment + 7 years'],
        bullets: [
          'Employment contracts',
          'Qualifications',
          'Performance reviews',
          'Leave records'
        ]
      },
      {
        title: 'Category E – Financial Records',
        paragraphs: ['Retention period: 7 years'],
        bullets: [
          'Invoices',
          'Receipts',
          'Budgets',
          'Financial statements',
          'Payroll records'
        ]
      },
      {
        title: 'Category F – Quality Assurance Records',
        paragraphs: ['Retention period: 7 years'],
        bullets: [
          'Audit reports',
          'Programme reviews',
          'Learner feedback',
          'Corrective action reports'
        ]
      },
      {
        title: 'Category G – ICT Records',
        paragraphs: ['Retention period: 5 years'],
        bullets: [
          'System logs',
          'Backup reports',
          'Security reports',
          'User access records'
        ]
      }
    ]
  },
  {
    number: 7,
    title: 'Record Creation',
    paragraphs: ['All records shall:'],
    bullets: [
      'Be generated using approved templates',
      'Contain accurate information',
      'Include creation dates',
      'Include author details',
      'Be uniquely identifiable'
    ]
  },
  {
    number: 8,
    title: 'Record Storage',
    subsections: [
      {
        title: 'Electronic records',
        paragraphs: ['Stored within:'],
        bullets: [
          'Learning Management System (LMS)',
          'Secure cloud storage',
          'Institutional shared drives'
        ]
      },
      {
        title: 'Physical records',
        paragraphs: ['Stored in:'],
        bullets: [
          'Locked filing cabinets',
          'Secure offices',
          'Controlled access areas'
        ]
      },
      {
        title: 'Security controls',
        bullets: [
          'Password protection',
          'User access permissions',
          'Multi-factor authentication where available',
          'Regular backups'
        ]
      }
    ]
  },
  {
    number: 9,
    title: 'Record Naming Convention',
    paragraphs: [
      'Format: YEAR-DEPARTMENT-DOCUMENT TYPE-NUMBER',
      'Examples: 2026-QA-AUDIT-001; 2026-STUDENT-REG-015; 2026-HR-CONTRACT-002; 2026-ASSESSMENT-RESULTS-004'
    ]
  },
  {
    number: 10,
    title: 'Access Control',
    paragraphs: [
      'Access shall be based on job responsibilities. All access shall be monitored.'
    ],
    bullets: [
      'Board — Governance records',
      'Managing Director — Full access',
      'QA Officer — Quality and compliance records',
      'E-Learning Officer — Learner and LMS records',
      'Trainers — Course and assessment records',
      'Learners — Own records only'
    ]
  },
  {
    number: 11,
    title: 'Confidentiality',
    paragraphs: [
      'Elevate Skills shall protect confidential information through password protection, confidentiality agreements, secure transmission methods, and restricted access controls.',
      'Confidential information shall not be disclosed without authorisation.'
    ]
  },
  {
    number: 12,
    title: 'Record Retrieval',
    paragraphs: ['Records shall be retrievable within:'],
    bullets: [
      'Electronic records — within 24 hours',
      'Physical records — within 48 hours'
    ],
    subsections: [
      {
        title: 'Records Request Register',
        paragraphs: ['A Records Request Register shall be maintained.']
      }
    ]
  },
  {
    number: 13,
    title: 'Backup and Disaster Recovery',
    paragraphs: ['The organisation shall:'],
    bullets: [
      'Back up critical systems daily',
      'Perform full system backups weekly',
      'Store backup copies offsite through cloud replication',
      'Conduct disaster recovery testing annually'
    ]
  },
  {
    number: 14,
    title: 'Records Archiving',
    paragraphs: [
      'Inactive records shall be archived. Archive records shall remain accessible, be protected, be indexed, and follow retention schedules.'
    ]
  },
  {
    number: 15,
    title: 'Records Disposal',
    paragraphs: [
      'Records shall only be disposed of after expiry of retention periods. A Disposal Register shall be maintained.'
    ],
    subsections: [
      {
        title: 'Approved disposal methods',
        bullets: [
          'Electronic records — secure deletion / data wiping',
          'Physical records — shredding / secure destruction'
        ]
      }
    ]
  },
  {
    number: 16,
    title: 'LMS Records Management',
    paragraphs: ['The Learning Management System shall maintain:'],
    subsections: [
      {
        title: 'Learner records',
        bullets: ['Enrolments', 'Attendance', 'Progress reports']
      },
      {
        title: 'Certification records',
        bullets: ['Certificates issued', 'Completion reports']
      },
      {
        title: 'Assessment records',
        bullets: ['Assignments', 'Results', 'Feedback']
      },
      {
        title: 'Activity logs',
        bullets: ['User access', 'Login history', 'Learning activity']
      }
    ]
  },
  {
    number: 17,
    title: 'Records Audits',
    paragraphs: [
      'Records management audits shall be conducted twice annually. Audits shall verify accuracy, completeness, security, compliance, and accessibility.',
      'Audit reports shall be submitted to management.'
    ]
  },
  {
    number: 18,
    title: 'Non-Compliance',
    paragraphs: ['Failure to comply with this policy may result in:'],
    bullets: [
      'Corrective action',
      'Disciplinary action',
      'Revocation of access rights'
    ]
  },
  {
    number: 19,
    title: 'Monitoring and Review',
    paragraphs: [
      'The Records Management System shall be reviewed annually to ensure continued compliance with BQA requirements, data security effectiveness, operational efficiency, and technology improvements.'
    ]
  }
];
