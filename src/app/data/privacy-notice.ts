import { TERMS_META } from './terms-and-conditions';

export const PRIVACY_META = {
  ...TERMS_META,
  noticeTitle: 'Privacy Notice',
  lastUpdated: TERMS_META.effectiveDate,
  dataController: TERMS_META.companyName,
  privacyContactEmail: 'help@elevateskills.online'
};

export interface PrivacySubsection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PrivacySection {
  number: number;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: PrivacySubsection[];
}

/**
 * Standalone Privacy Notice for informed consent under the Botswana Data
 * Protection Act, 2024. Content is aligned with the privacy framework in the
 * Terms and Conditions, presented as a dedicated notice before data collection.
 */
export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    number: 1,
    title: 'Who we are (Data Controller)',
    paragraphs: [
      `This Privacy Notice explains how ${PRIVACY_META.dataController} (“Elevate Skills”, “we”, “our”, or “us”) collects, uses, stores, and protects your personal information when you visit our website, register for an account, enrol in a course, request a demo, contact us, or apply to become a trainer.`,
      'Elevate Skills is the data controller responsible for the personal information described in this notice.'
    ],
    bullets: [
      `Legal name: ${PRIVACY_META.companyName}`,
      `UIN: ${PRIVACY_META.uin}`,
      `Physical address: ${PRIVACY_META.physicalAddress}`,
      `Postal address: ${PRIVACY_META.postalAddress}`,
      `Telephone: ${PRIVACY_META.telephone}`,
      `Website: ${PRIVACY_META.website}`,
      `Privacy / data protection contact: ${PRIVACY_META.privacyContactEmail}`
    ]
  },
  {
    number: 2,
    title: 'Legal framework',
    paragraphs: [
      'We process personal information in accordance with the Botswana Data Protection Act, 2024, and other applicable laws. We also follow internationally recognised privacy principles, including transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity and confidentiality, and accountability.'
    ]
  },
  {
    number: 3,
    title: 'What personal information we collect',
    paragraphs: [
      'Depending on how you interact with us, we may collect the following categories of personal information:'
    ],
    subsections: [
      {
        title: 'Identity information',
        bullets: ['Full name', 'Learner or account identifiers']
      },
      {
        title: 'Contact information',
        bullets: ['Email address', 'Telephone number', 'Organisation / company name (where provided)']
      },
      {
        title: 'Learning and enrolment information',
        bullets: [
          'Courses of interest or enrolment',
          'Assessment and progress records (within the learning platform)',
          'Certification and completion records'
        ]
      },
      {
        title: 'Payment and transaction information',
        bullets: ['Order references', 'Payment status', 'Billing-related records (we do not store full card details on our website)']
      },
      {
        title: 'Technical and usage information',
        bullets: ['IP address', 'Device and browser information', 'Website and LMS usage logs needed for security and service delivery']
      },
      {
        title: 'Trainer or partner applications',
        bullets: ['Area of expertise', 'Experience', 'Topics you wish to teach', 'Short biography / background']
      }
    ]
  },
  {
    number: 4,
    title: 'Why we collect your information (purposes)',
    paragraphs: ['We use personal information for the following purposes:'],
    bullets: [
      'Creating and managing learner accounts',
      'Processing course enrolments and payments',
      'Delivering training, assessments, and certificates',
      'Responding to Contact Us, Request Demo, and trainer applications',
      'Sending service-related notices about your account or enrolment',
      'Improving our website, learning platform, and support quality',
      'Meeting legal, regulatory, tax, audit, and security obligations'
    ]
  },
  {
    number: 5,
    title: 'Legal bases for processing',
    paragraphs: ['We process personal information where one or more of the following applies:'],
    bullets: [
      'Consent — you have agreed to the specific processing (for example, marketing interest forms or optional communications)',
      'Contract — processing is necessary to create your account, enrol you, deliver a course, or provide related services you requested',
      'Legal obligation — processing is required by applicable law',
      'Legitimate interests — processing supports secure operation of our services while respecting your rights'
    ]
  },
  {
    number: 6,
    title: 'Who may access your information',
    paragraphs: [
      'Your information may be accessed by authorised Elevate Skills staff who need it to provide support, administer enrolments, or manage enquiries.',
      'We may also share information with trusted service providers who process data on our behalf, such as our learning management system provider, payment processors, email/SMS delivery providers, and cloud hosting providers. These parties are engaged only for defined purposes and are expected to protect your information appropriately.',
      'We do not sell your personal information.'
    ]
  },
  {
    number: 7,
    title: 'How long we keep your information',
    paragraphs: [
      'We retain personal information for as long as reasonably necessary for the purposes described above, including account administration, certification verification, customer support, contractual obligations, tax and regulatory compliance, and dispute resolution.',
      'Certain certification and enrolment records may be retained for longer periods where verification or legal requirements make this necessary. When information is no longer required, we take reasonable steps to delete or anonymise it.'
    ]
  },
  {
    number: 8,
    title: 'International transfers',
    paragraphs: [
      'Some service providers (including learning platform or cloud providers) may process information outside Botswana. Where this occurs, we take reasonable steps to ensure appropriate safeguards are in place.'
    ]
  },
  {
    number: 9,
    title: 'Your rights',
    paragraphs: [
      'Subject to the Botswana Data Protection Act, 2024 and other applicable law, you may have the right to:'
    ],
    bullets: [
      'Request access to personal information we hold about you',
      'Request correction of inaccurate information',
      'Request restriction of certain processing',
      'Object to certain forms of processing',
      'Request erasure where legally permissible',
      'Withdraw consent where processing is based on consent (withdrawal does not affect processing already carried out lawfully)'
    ],
    subsections: [
      {
        title: 'How to exercise your rights',
        paragraphs: [
          `Submit requests in writing to ${PRIVACY_META.privacyContactEmail} or contact us using the details in section 1. We may need to verify your identity before responding.`
        ]
      }
    ]
  },
  {
    number: 10,
    title: 'Security',
    paragraphs: [
      'We maintain reasonable technical and organisational measures to protect personal information, including access controls, password protection, secure hosting, and staff confidentiality obligations. No electronic system can be guaranteed completely secure; please protect your login credentials and notify us of any suspected unauthorised access.'
    ]
  },
  {
    number: 11,
    title: 'Cookies and similar technologies',
    paragraphs: [
      'Our website and learning platform may use essential cookies and similar technologies required for security, authentication, and core functionality. Some analytics or performance tools may also be used to improve the service. You can manage cookies through your browser settings, though some features may not work without them.'
    ]
  },
  {
    number: 12,
    title: 'Updates to this notice',
    paragraphs: [
      `We may update this Privacy Notice from time to time. The effective date shown above (${PRIVACY_META.lastUpdated}) will be revised when material changes are published on this page.`
    ]
  }
];
