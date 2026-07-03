export const TERMS_META = {
  effectiveDate: '01 June 2026',
  companyName: 'Elevate Skills (Pty) Ltd',
  uin: 'BW00009019717',
  physicalAddress: 'Plot 122, Unit 6G Kgale Mews Gaborone Botswana',
  postalAddress: 'P O Box 2930 Gaborone Botswana',
  telephone: '+267 77608200',
  website: 'elevateskills.online',
  territory: 'Botswana and International Markets'
};

export interface TermsSubsection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface TermsSection {
  number: number;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: TermsSubsection[];
}

export const TERMS_SECTIONS: TermsSection[] = [
  {
    number: 1,
    title: 'Introduction',
    paragraphs: [
      'These Terms and Conditions (“Terms”) govern the use of all services provided by Elevate Skills (Pty) Ltd (“Elevate Skills”, “Company”, “we”, “our”, or “us”), including but not limited to online training courses, instructor-led training, corporate training programmes, workshops and seminars, coaching and consulting services, skills development programmes, certification programmes, Learning Management System (LMS) access, assessments and examinations, digital learning content, and international training services.',
      'By registering for, accessing, purchasing, participating in, or using any Elevate Skills service, platform, website, mobile application, learning portal, or training programme, you agree to be legally bound by these Terms and Conditions.',
      'If you do not agree to these Terms, you must immediately discontinue use of our services.'
    ]
  },
  {
    number: 2,
    title: 'Company Information',
    bullets: [
      `Legal Name: ${TERMS_META.companyName}`,
      `UIN: ${TERMS_META.uin}`,
      `Physical Address: ${TERMS_META.physicalAddress}`,
      `Postal Address: ${TERMS_META.postalAddress}`,
      `Telephone: ${TERMS_META.telephone}`,
      `Website: ${TERMS_META.website}`,
      `Operational Territory: ${TERMS_META.territory}`
    ]
  },
  {
    number: 3,
    title: 'Definitions',
    paragraphs: ['For the purposes of these Terms:'],
    bullets: [
      '“Assessment” means any examination, assignment, practical exercise, project, competency evaluation, quiz, test, or other method used to evaluate learning outcomes.',
      '“Certificate” means a credential issued by Elevate Skills or an accredited partner confirming successful completion of a programme.',
      '“Client” means any individual, organisation, institution, government entity, NGO, corporation, or employer purchasing services from Elevate Skills.',
      '“Content” means all materials made available through our services, including videos, documents, presentations, manuals, assessments, templates, software, graphics, images, logos, trademarks, and intellectual property.',
      '“Corporate Client” means any business, organisation, government department, or institution purchasing services for employees or representatives.',
      '“Course” means any training programme, workshop, webinar, seminar, coaching programme, or educational activity offered by Elevate Skills.',
      '“Employer-Sponsored Learner” means a learner whose training is funded by an employer or sponsoring organisation.',
      '“Learning Management System (LMS)” means any online platform used by Elevate Skills to deliver learning content and manage learner activities.',
      '“Learner” means any individual registered for a course or programme.',
      '“Partner Institution” means any accredited institution, certification body, awarding body, university, training provider, or professional organisation collaborating with Elevate Skills.',
      '“Services” means all educational, consulting, coaching, training, and certification services offered by Elevate Skills.'
    ]
  },
  {
    number: 4,
    title: 'Eligibility',
    paragraphs: [
      'Users must be at least 18 years old; or have consent from a parent, guardian, employer, or educational institution where applicable. Users must have legal capacity to enter into binding agreements and provide accurate registration information.',
      'Elevate Skills reserves the right to deny access where eligibility requirements are not met.'
    ]
  },
  {
    number: 5,
    title: 'Registration and Account Creation',
    paragraphs: [
      'To access certain services, users may be required to create an account. Users agree to provide accurate information, keep information updated, maintain password confidentiality, protect account security, and notify Elevate Skills immediately of unauthorised use.',
      'Users remain responsible for all activities occurring under their accounts. Elevate Skills reserves the right to suspend or terminate accounts where false information is provided.'
    ]
  },
  {
    number: 6,
    title: 'LMS User Licensing Terms',
    paragraphs: [
      'Elevate Skills grants learners a limited, revocable, non-exclusive, non-transferable licence to access learning materials solely for personal educational purposes. The licence does not transfer ownership of any intellectual property.',
      'Users may not share login credentials, create duplicate accounts, download content where downloading is restricted, reproduce materials, resell course content, record training sessions without permission, reverse engineer LMS systems, circumvent security controls, or use automated tools to scrape content.',
      'Any violation may result in immediate suspension or termination.'
    ]
  },
  {
    number: 7,
    title: 'Acceptable Use Policy',
    subsections: [
      {
        title: 'Users shall',
        bullets: [
          'Conduct themselves professionally;',
          'Respect instructors and other learners;',
          'Comply with applicable laws;',
          'Use services only for lawful purposes.'
        ]
      },
      {
        title: 'Users shall not',
        bullets: [
          'Harass or discriminate against others;',
          'Upload malicious software or distribute offensive content;',
          'Engage in fraud or attempt unauthorised access;',
          'Misuse intellectual property.'
        ]
      }
    ],
    paragraphs: [
      'Elevate Skills may remove content or suspend users who violate these standards.'
    ]
  },
  {
    number: 8,
    title: 'Course Enrolment',
    paragraphs: [
      'Course enrolment is confirmed only when registration has been completed, payment has been received or approved, and required documentation has been submitted.',
      'Elevate Skills reserves the right to refuse enrolment, cancel enrolment, modify programme schedules, change instructors, or update course content. Such changes do not automatically entitle participants to refunds.'
    ]
  },
  {
    number: 9,
    title: 'Fees and Payment Terms',
    paragraphs: [
      'All fees are payable in accordance with issued quotations, invoices, enrolment agreements, or corporate contracts. Unless otherwise agreed, full payment is required before commencement.',
      'Late payments may incur penalties. Certificates may be withheld, LMS access may be suspended, and assessments may be restricted. Corporate clients remain responsible for all agreed contractual fees.'
    ]
  },
  {
    number: 10,
    title: 'Corporate Training Agreements',
    subsections: [
      {
        title: '10.1 Corporate Client Engagement',
        paragraphs: [
          'Elevate Skills may enter into separate Corporate Training Agreements with organisations for the delivery of training, consulting, coaching, certification, workforce development, and related services.'
        ],
        bullets: [
          'Nominate employees for training;',
          'Purchase training seats in bulk;',
          'Request customised training programmes;',
          'Request dedicated facilitators;',
          'Request tailored assessments and reporting.'
        ]
      },
      {
        title: '10.2 Client Responsibilities',
        bullets: [
          'Provide accurate participant information;',
          'Ensure participants meet prerequisites;',
          'Communicate attendance requirements;',
          'Pay all fees according to agreed schedules;',
          'Comply with contractual obligations.'
        ]
      },
      {
        title: '10.3 Participant Substitution',
        paragraphs: [
          'Participant substitutions may be permitted before programme commencement, subject to management approval and programme requirements.'
        ]
      },
      {
        title: '10.4 Corporate Reporting',
        paragraphs: ['Where permitted by law and contract, Elevate Skills may provide employers with:'],
        bullets: [
          'Attendance reports;',
          'Progress reports;',
          'Assessment completion status;',
          'Certification outcomes;',
          'Skills gap analyses.'
        ]
      }
    ]
  },
  {
    number: 11,
    title: 'Employer-Sponsored Learners',
    subsections: [
      {
        title: '11.1 Sponsorship Arrangements',
        paragraphs: [
          'Where training is funded by an employer, donor, government agency, NGO, development partner, or other sponsoring organisation, the sponsor may receive information reasonably necessary to administer the sponsorship.'
        ]
      },
      {
        title: '11.2 Information Shared',
        paragraphs: ['The following information may be disclosed to sponsors:'],
        bullets: [
          'Registration status;',
          'Attendance records;',
          'Assignment completion status;',
          'Assessment outcomes;',
          'Certification status;',
          'Programme completion status.'
        ]
      },
      {
        title: '11.3 Confidential Information',
        paragraphs: [
          'Personal information unrelated to programme administration shall not be disclosed without lawful authority or consent.'
        ]
      }
    ]
  },
  {
    number: 12,
    title: 'Assessment Policy',
    subsections: [
      {
        title: '12.1 Assessment Requirements',
        paragraphs: [
          'Learners must successfully complete all required assessments before certification may be awarded. Assessment methods may include written examinations, online assessments, practical demonstrations, projects, presentations, case studies, workplace assessments, and portfolios of evidence.'
        ]
      },
      {
        title: '12.2 Assessment Integrity',
        paragraphs: ['Learners must submit their own work. The following are strictly prohibited:'],
        bullets: [
          'Cheating, plagiarism, contract cheating, identity fraud;',
          'Falsification of records;',
          'Use of unauthorised materials or examination misconduct.'
        ]
      },
      {
        title: '12.3 Assessment Verification',
        bullets: [
          'Verify identity;',
          'Request additional evidence;',
          'Conduct oral verification interviews;',
          'Require reassessment.'
        ]
      },
      {
        title: '12.4 Reassessments',
        paragraphs: [
          'Reassessments may be permitted subject to programme rules and additional fees.'
        ]
      }
    ]
  },
  {
    number: 13,
    title: 'Certification Policy',
    subsections: [
      {
        title: '13.1 Certificate Issuance',
        paragraphs: ['Certificates may be issued by Elevate Skills (Pty) Ltd, accredited partner institutions, certification bodies, or awarding organisations.']
      },
      {
        title: '13.2 Certification Requirements',
        bullets: [
          'Meet attendance requirements;',
          'Complete assessments;',
          'Achieve required competency standards;',
          'Meet financial obligations;',
          'Comply with these Terms.'
        ]
      },
      {
        title: '13.3 Verification',
        paragraphs: [
          'Employers and third parties may request certificate verification subject to applicable privacy laws.'
        ]
      },
      {
        title: '13.4 Revocation',
        paragraphs: ['Certificates may be withdrawn where fraud is discovered, academic misconduct is identified, false information was provided, or certification was issued in error.']
      }
    ]
  },
  {
    number: 14,
    title: 'Academic Integrity Policy',
    paragraphs: [
      'Elevate Skills maintains strict academic integrity standards. Learners shall produce original work, properly reference sources, follow assessment instructions, and cooperate with investigations.',
      'Violations may result in assessment failure, suspension, programme termination, certificate revocation, or permanent exclusion.'
    ]
  },
  {
    number: 15,
    title: 'Artificial Intelligence (AI) Policy',
    subsections: [
      {
        title: '15.1 Permitted Use',
        bullets: [
          'Research support, study assistance, brainstorming, language support, and skills development.'
        ]
      },
      {
        title: '15.2 Prohibited Use',
        paragraphs: [
          'AI-generated content may not be submitted as original work unless explicitly permitted. Learners must disclose AI assistance where required.'
        ]
      },
      {
        title: '15.3 Verification Rights',
        bullets: [
          'Investigate suspected AI misuse;',
          'Require supporting evidence;',
          'Conduct competency interviews;',
          'Require reassessment.'
        ]
      }
    ]
  },
  {
    number: 16,
    title: 'Intellectual Property Rights',
    subsections: [
      {
        title: '16.1 Ownership',
        paragraphs: [
          'All intellectual property remains the exclusive property of Elevate Skills or its licensors, including training manuals, videos, LMS content, assessments, templates, presentations, branding, logos, graphics, methodologies, and proprietary frameworks.'
        ]
      },
      {
        title: '16.2 Restrictions',
        paragraphs: ['Without written permission, users may not copy, reproduce, publish, sell, modify, create derivative works from, or share proprietary content.']
      },
      {
        title: '16.3 Corporate Clients',
        paragraphs: [
          'Corporate clients receive only the usage rights expressly granted under contract. Ownership remains with Elevate Skills unless otherwise agreed in writing.'
        ]
      }
    ]
  },
  {
    number: 17,
    title: 'Confidentiality',
    paragraphs: [
      'Each party agrees to maintain confidentiality regarding non-public information disclosed during the course of service delivery, including business plans, proprietary methods, client records, training materials, financial information, and strategic information.',
      'Confidentiality obligations survive termination of services.'
    ]
  },
  {
    number: 18,
    title: 'Consulting and Advisory Services',
    paragraphs: [
      'Recommendations provided by Elevate Skills are educational and advisory in nature. Clients remain responsible for business decisions, regulatory compliance, operational implementation, and financial decisions.',
      'No guarantee of specific commercial outcomes is provided.'
    ]
  },
  {
    number: 19,
    title: 'Recordings',
    paragraphs: [
      'Training sessions may be recorded for quality assurance, training delivery, compliance, or educational purposes. Participants consent to recording where lawful notice has been provided.',
      'Participants may not record sessions without written permission.'
    ]
  },
  {
    number: 20,
    title: 'Third-Party Providers',
    paragraphs: [
      'Elevate Skills may utilise third-party providers for learning management systems, payment processing, certification services, video conferencing, cloud storage, and communications.',
      'Elevate Skills is not responsible for interruptions caused by third-party systems beyond its reasonable control.'
    ]
  },
  {
    number: 21,
    title: 'Privacy Policy and Data Protection Framework',
    paragraphs: [
      'Elevate Skills is committed to protecting the privacy, confidentiality, integrity, and security of personal information entrusted to us by learners, clients, employees, contractors, corporate partners, and stakeholders.',
      'We process personal information in accordance with applicable laws of Botswana, international privacy best practices, GDPR-inspired principles, POPIA-inspired privacy standards, contractual obligations, and industry best practices for education and training providers.'
    ]
  },
  {
    number: 22,
    title: 'Personal Information Collected',
    subsections: [
      { title: 'Identity Information', bullets: ['Full names', 'National identity numbers', 'Passport numbers', 'Student numbers', 'Employee numbers'] },
      { title: 'Contact Information', bullets: ['Email addresses', 'Telephone numbers', 'Postal addresses', 'Physical addresses'] },
      { title: 'Educational Information', bullets: ['Academic records', 'Qualifications', 'Certifications', 'Assessment results', 'Attendance records'] },
      { title: 'Employment Information', bullets: ['Employer details', 'Job title', 'Professional experience', 'Sponsorship information'] },
      { title: 'Financial Information', bullets: ['Payment records', 'Billing information', 'Transaction histories'] },
      { title: 'Technical Information', bullets: ['Device identifiers', 'IP addresses', 'Browser information', 'LMS usage data', 'Website analytics'] }
    ]
  },
  {
    number: 23,
    title: 'Purpose of Processing',
    paragraphs: [
      'Personal information may be processed for learner registration, programme administration, training delivery, certification management, assessment administration, client support, contract administration, compliance obligations, quality assurance, audit requirements, regulatory reporting, and business operations.',
      'Information shall not be used for unlawful purposes.'
    ]
  },
  {
    number: 24,
    title: 'Legal Basis for Processing',
    bullets: [
      'Consent: the individual has provided consent.',
      'Contractual necessity: processing is necessary to deliver services.',
      'Legal obligations: processing is required by law.',
      'Legitimate interests: processing supports legitimate operational requirements while respecting privacy rights.'
    ]
  },
  {
    number: 25,
    title: 'Data Subject Rights',
    paragraphs: [
      'Subject to applicable law, individuals may request the following rights. Requests may be submitted in writing to Elevate Skills.'
    ],
    bullets: [
      'Right of Access — access to personal information held by Elevate Skills;',
      'Right of Correction — correction of inaccurate information;',
      'Right of Restriction — restriction of certain processing activities;',
      'Right of Objection — objection to certain forms of processing;',
      'Right of Erasure — deletion of information where legally permissible;',
      'Right to Withdraw Consent — where consent forms the legal basis of processing.'
    ]
  },
  {
    number: 26,
    title: 'Data Retention',
    paragraphs: [
      'Records may be retained for periods reasonably necessary for certification verification, regulatory compliance, tax compliance, contractual obligations, legal proceedings, historical certification validation, and audit purposes.',
      'Certain certification records may be retained indefinitely for verification purposes.'
    ]
  },
  {
    number: 27,
    title: 'International Data Transfers',
    paragraphs: [
      'Because Elevate Skills operates internationally, information may be processed outside Botswana where LMS providers, cloud services, partner institutions, or certifications require international processing or verification.',
      'Appropriate safeguards shall be implemented where reasonably practicable.'
    ]
  },
  {
    number: 28,
    title: 'Data Security',
    paragraphs: [
      'Elevate Skills maintains reasonable security measures including access controls, password protection, encryption where appropriate, secure cloud systems, staff confidentiality obligations, and regular security monitoring.',
      'However, no electronic system can be guaranteed completely secure.'
    ]
  },
  {
    number: 29,
    title: 'Cookies Policy',
    paragraphs: [
      'Websites and LMS systems may utilise essential cookies, authentication cookies, performance cookies, analytics tools, and security monitoring technologies.',
      'Users may adjust browser settings to manage cookies, although functionality may be affected.'
    ]
  },
  {
    number: 30,
    title: 'Marketing Communications',
    paragraphs: [
      'Elevate Skills may send course updates, training opportunities, event invitations, newsletters, and service announcements.',
      'Recipients may opt out of marketing communications at any time.'
    ]
  },
  {
    number: 31,
    title: 'Refund, Cancellation and Transfer Policy',
    subsections: [
      {
        title: 'Learner Cancellations',
        paragraphs: ['Written cancellation requests must be submitted.'],
        bullets: [
          'More than 14 days before commencement — eligible for refund less administrative fees;',
          'Between 7 and 14 days — may qualify for a partial refund;',
          'Less than 7 days — generally non-refundable.'
        ]
      },
      {
        title: 'Online Learning Programmes',
        paragraphs: [
          'Where substantial digital content has already been accessed, refunds may be reduced or declined.'
        ]
      },
      {
        title: 'Course Transfers',
        paragraphs: [
          'Transfers may be approved subject to programme availability, administrative requirements, and transfer fees where applicable.'
        ]
      },
      {
        title: 'Company Cancellations',
        paragraphs: [
          'Where Elevate Skills cancels a programme, participants may be offered rescheduling, programme transfer, credit note, or refund.'
        ]
      }
    ]
  },
  {
    number: 32,
    title: 'Service Availability Disclaimer',
    paragraphs: [
      'Elevate Skills strives to maintain uninterrupted services but does not guarantee continuous website availability, continuous LMS access, uninterrupted internet services, or availability of third-party platforms.',
      'Temporary interruptions may occur for maintenance, security updates, technical failures, or force majeure events.'
    ]
  },
  {
    number: 33,
    title: 'Warranties Disclaimer',
    paragraphs: [
      'Except where prohibited by law, services are provided “as available” and “as is”.',
      'Elevate Skills does not guarantee employment outcomes, salary increases, business success, professional licensing, regulatory approvals, or examination success.',
      'Success depends upon individual effort, experience, circumstances, and external factors.'
    ]
  },
  {
    number: 34,
    title: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, Elevate Skills shall not be liable for indirect losses, consequential losses, loss of profits, business interruption, data loss, or reputational damage.',
      'Maximum liability shall generally not exceed the amount paid for the affected service.'
    ]
  },
  {
    number: 35,
    title: 'Indemnity',
    paragraphs: [
      'Users agree to indemnify Elevate Skills against claims arising from breach of these Terms, misuse of services, intellectual property infringement, unlawful conduct, or negligence of the user.'
    ]
  },
  {
    number: 36,
    title: 'Force Majeure',
    paragraphs: [
      'Neither party shall be liable for delays or failures resulting from circumstances beyond reasonable control, including natural disasters, epidemics, pandemics, government restrictions, civil unrest, labour disputes, utility failures, cyberattacks, or telecommunications failures.'
    ]
  },
  {
    number: 37,
    title: 'Suspension and Termination',
    paragraphs: [
      'Elevate Skills may suspend or terminate access for non-payment, fraud, misconduct, harassment, academic dishonesty, intellectual property violations, security breaches, or breach of these Terms.',
      'Termination may occur without refund where misconduct is involved.'
    ]
  },
  {
    number: 38,
    title: 'Complaints Procedure',
    paragraphs: [
      'Complaints must be submitted in writing and should include name, contact information, programme details, description of complaint, and supporting evidence.',
      'Elevate Skills shall investigate complaints fairly and communicate outcomes within a reasonable period.'
    ]
  },
  {
    number: 39,
    title: 'Appeals Procedure',
    paragraphs: [
      'Learners may appeal assessment outcomes, certification decisions, and disciplinary decisions.',
      'Appeals must be submitted in writing within the prescribed period communicated by Elevate Skills.'
    ]
  },
  {
    number: 40,
    title: 'Dispute Resolution',
    bullets: [
      'Stage 1 — Internal Resolution: good-faith discussions between the parties.',
      'Stage 2 — Mediation: independent mediation where appropriate.',
      'Stage 3 — Legal Proceedings: where disputes remain unresolved, they shall be submitted to the competent courts of Botswana.'
    ]
  },
  {
    number: 41,
    title: 'Governing Law',
    paragraphs: [
      'These Terms and Conditions shall be governed by and interpreted according to the laws of Botswana.'
    ]
  },
  {
    number: 42,
    title: 'Severability',
    paragraphs: [
      'If any provision is determined to be unenforceable, the remaining provisions shall remain in full force and effect.'
    ]
  },
  {
    number: 43,
    title: 'Entire Agreement',
    paragraphs: [
      'These Terms, together with applicable policies and written agreements, constitute the entire agreement between the parties.'
    ]
  },
  {
    number: 44,
    title: 'Amendments',
    paragraphs: [
      'Elevate Skills may amend these Terms from time to time. Updated versions shall become effective upon publication on the website, LMS platform, or other official communication channels.'
    ]
  },
  {
    number: 45,
    title: 'Contact Details',
    bullets: [
      `${TERMS_META.companyName}`,
      `UIN: ${TERMS_META.uin}`,
      `Physical Address: ${TERMS_META.physicalAddress}`,
      `Postal Address: ${TERMS_META.postalAddress}`,
      `Telephone: ${TERMS_META.telephone}`,
      `Website: ${TERMS_META.website}`
    ]
  },
  {
    number: 46,
    title: 'Acceptance',
    paragraphs: [
      'By registering for, purchasing, accessing, or participating in any Elevate Skills service, the user acknowledges that they have read, understood, and agreed to these Terms and Conditions.'
    ]
  }
];
