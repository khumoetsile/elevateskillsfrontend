export interface FaqLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FaqItem {
  number: number;
  question: string;
  paragraphs: string[];
  bullets?: string[];
  closingParagraphs?: string[];
  links?: FaqLink[];
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    title: 'General Information',
    items: [
      {
        number: 1,
        question: 'What is Elevate Skills?',
        paragraphs: [
          'Elevate Skills is an online learning platform for individuals, professionals, entrepreneurs and organisations seeking practical, flexible and accessible training. Our courses are designed to help learners build relevant skills that can be applied in the workplace, in business and in everyday life.'
        ]
      },
      {
        number: 2,
        question: 'Who can enrol for Elevate Skills courses?',
        paragraphs: [
          'Anyone who wants to improve their knowledge or practical skills can enrol. Our courses are suitable for:'
        ],
        bullets: [
          'Students and job seekers',
          'Employees and professionals',
          'Entrepreneurs and small-business owners',
          'Farmers and agribusiness operators',
          'Corporate organisations',
          'Government departments and NGOs',
          'Trainers and training institutions'
        ]
      },
      {
        number: 3,
        question: 'Are the courses completed online?',
        paragraphs: [
          'Yes. Elevate Skills courses are delivered online through our learning platform. Learners can access course materials using a computer, tablet or supported smartphone with an internet connection.'
        ]
      },
      {
        number: 4,
        question: 'Can I study at my own pace?',
        paragraphs: [
          'Yes. Elevate Skills courses are self-paced, allowing you to study at times that are convenient for you.'
        ]
      },
      {
        number: 5,
        question: 'Can I access the platform from outside Botswana?',
        paragraphs: [
          'Yes. Elevate Skills can be accessed from other countries, provided you have a reliable internet connection.'
        ]
      },
      {
        number: 6,
        question: 'Do I need previous experience before enrolling?',
        paragraphs: [
          'Not necessarily. Many courses are designed for beginners and do not require previous experience.'
        ]
      }
    ]
  },
  {
    id: 'registration',
    title: 'Registration and Enrolment',
    items: [
      {
        number: 7,
        question: 'How do I create an account?',
        paragraphs: [
          'Visit elevateskills.online and select Register. Complete your name, email address and contact details, then accept the Privacy Notice and Terms.',
          'Your learner account is created immediately and you receive login credentials for the learner portal. Please ensure that your name is entered correctly, as it may appear on your certificate.'
        ]
      },
      {
        number: 8,
        question: 'How do I enrol for a course?',
        paragraphs: ['To enrol:'],
        bullets: [
          'Visit elevateskills.online.',
          'Browse the available courses.',
          'Select the course you are interested in.',
          'Review the course description, requirements and price.',
          'Select Enrol Now and complete checkout on this website.',
          'If you already have an account, use the same email address.',
          'After payment confirmation, log in to your learner account and begin the course.'
        ]
      },
      {
        number: 9,
        question: 'Can I enrol for more than one course?',
        paragraphs: [
          'Yes. From the course catalogue, select Enrol Now for each additional course and complete checkout using your existing email address. You do not need to log out or create a new account.',
          'After enrolment, your courses appear under My Courses in the learner portal.'
        ]
      },
      {
        number: 10,
        question: 'When can I start my course?',
        paragraphs: [
          'Courses are self-paced. Access is provided after successful registration and payment confirmation.'
        ]
      },
      {
        number: 11,
        question: 'I registered but did not receive a confirmation email. What should I do?',
        paragraphs: [
          'First, check your spam, junk or promotions folder.',
          'You should also confirm that the email address used during registration was entered correctly. If you still cannot find the email, contact Elevate Skills support and provide your full name, email address and contact number.'
        ]
      }
    ]
  },
  {
    id: 'learning',
    title: 'Course Access and Learning',
    items: [
      {
        number: 12,
        question: 'How long do I have access to a course?',
        paragraphs: [
          'The access period may differ from one course to another. The applicable access period will be shown in the course description or communicated during enrolment.',
          'Learners are encouraged to complete their courses within the recommended period.'
        ]
      },
      {
        number: 13,
        question: 'What learning materials are included?',
        paragraphs: ['Depending on the course, learning materials may include:'],
        bullets: [
          'Written lessons',
          'Presentations',
          'Practical activities',
          'Quizzes and assessments',
          'Assignments',
          'Case studies',
          'Templates and worksheets'
        ]
      },
      {
        number: 14,
        question: 'Can I download course materials?',
        paragraphs: [
          'Some resources may be available for download, while other content must be accessed directly through the Elevate Skills platform.',
          'Course materials may only be used by the registered learner and may not be copied, resold, shared or distributed without written permission.'
        ]
      },
      {
        number: 15,
        question: 'Can I use my mobile phone to complete a course?',
        paragraphs: [
          'Yes. Many courses can be accessed using a smartphone.',
          'However, for the best learning experience — particularly for courses involving spreadsheets, assignments, presentations or practical exercises — a laptop or desktop computer may be recommended.'
        ]
      },
      {
        number: 16,
        question: 'Do I need to be online all the time?',
        paragraphs: [
          'You will need an internet connection to access the platform, open lessons, complete assessments and submit assignments.'
        ]
      },
      {
        number: 17,
        question: 'What happens if I forget my password?',
        paragraphs: [
          'Select the “Forgot Password” option on the login page and follow the instructions sent to your registered email address.',
          'If you are still unable to access your account, contact Elevate Skills support.'
        ],
        links: [
          {
            label: 'help@elevateskills.online',
            href: 'mailto:help@elevateskills.online'
          }
        ]
      },
      {
        number: 18,
        question: 'Do I need two-factor authentication (2FA) to sign in?',
        paragraphs: [
          'Where two-factor authentication is enabled on the Elevate Skills learner portal, you will sign in with your password and then complete a second step using an authenticator app (for example Google Authenticator or Microsoft Authenticator).',
          'The first time you are prompted, follow the on-screen instructions to link your authenticator app. On later visits you will enter the code shown in the app after your password.',
          'If you lose access to your authenticator device, contact Elevate Skills support so your 2FA can be reset. Do not share your password or authentication codes with anyone.'
        ],
        links: [
          {
            label: 'help@elevateskills.online',
            href: 'mailto:help@elevateskills.online'
          }
        ]
      }
    ]
  },
  {
    id: 'certificates',
    title: 'Assessments and Certificates',
    items: [
      {
        number: 19,
        question: 'Will I receive a certificate?',
        paragraphs: [
          'Learners who successfully complete all required lessons, assessments and course requirements may receive a digital certificate of completion.',
          'Certificate availability and requirements will be stated on the relevant course page.'
        ]
      },
      {
        number: 20,
        question: 'What must I do to complete a course successfully?',
        paragraphs: [
          'Completion requirements vary by course and may include:'
        ],
        bullets: [
          'Reviewing all required lessons',
          'Completing quizzes',
          'Submitting assignments',
          'Achieving the required pass mark',
          'Completing a final assessment'
        ]
      },
      {
        number: 21,
        question: 'What happens if I fail an assessment?',
        paragraphs: [
          'Where permitted, you may be given another opportunity to attempt the assessment.'
        ]
      },
      {
        number: 22,
        question: 'Can the name on my certificate be changed?',
        paragraphs: [
          'Certificates are generated using the name registered on your learner profile.',
          'You should ensure that your details are correct before completing the course. Requests for certificate corrections may require identity verification and may be subject to administrative review and will attract a fee.'
        ]
      },
      {
        number: 23,
        question: 'Are Elevate Skills certificates accredited?',
        paragraphs: [
          'Elevate Skills offers skills-development and professional learning programmes. The accreditation or recognition status may differ between courses and training partners.',
          'Where a course is accredited, endorsed, CPD-recognised or delivered in partnership with another institution, this will be clearly stated on the course page and on the certificate. Learners should not assume that every course carries formal academic accreditation.'
        ]
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments',
    items: [
      {
        number: 24,
        question: 'How much do the courses cost?',
        paragraphs: [
          'Course prices vary depending on the subject, duration, content and level of support provided.',
          'The applicable price will be displayed on the course page before enrolment.'
        ]
      },
      {
        number: 25,
        question: 'What payment methods are accepted?',
        paragraphs: [
          'Available payment methods will be displayed during checkout. These may include supported bank cards, electronic payment options, bank transfers or other approved payment channels.',
          'Payment instructions will differ for individual and corporate customers.'
        ]
      },
      {
        number: 26,
        question: 'Is payment secure?',
        paragraphs: [
          'Elevate Skills uses approved payment service providers to process online payments.',
          'Learners should never share their passwords, PINs or one-time passwords with anyone claiming to represent Elevate Skills.'
        ]
      },
      {
        number: 27,
        question: 'Can my employer pay for my course?',
        paragraphs: [
          'Yes. Employers may sponsor individual employees or enrol groups of staff.',
          'The organisation may contact Elevate Skills for a quotation, invoice, bulk enrolment assistance or a customised training package.'
        ]
      },
      {
        number: 28,
        question: 'Do you offer discounts for group enrolments?',
        paragraphs: [
          'Group, institutional and corporate pricing may be available depending on the number of learners and the selected courses.',
          'Organisations may request a customised quotation from Elevate Skills.'
        ]
      },
      {
        number: 29,
        question: 'Can I request a refund after purchasing a course?',
        paragraphs: [
          'Refund requests are handled in accordance with the Elevate Skills refund and cancellation policy.',
          'Refund eligibility may depend on whether the learner has accessed the course, downloaded materials, completed lessons or started an assessment. Learners should review the applicable terms and conditions before making payment.'
        ],
        links: [
          {
            label: 'Terms and Conditions',
            href: '/terms',
            external: false
          }
        ]
      }
    ]
  },
  {
    id: 'corporate',
    title: 'Corporate and Organisational Training',
    items: [
      {
        number: 30,
        question: 'Does Elevate Skills provide corporate training?',
        paragraphs: [
          'Yes. Elevate Skills works with companies, government departments, NGOs and other organisations to support employee development and workplace training.',
          'Training may be delivered through existing courses, customised programmes or organisation-specific learning portals.'
        ]
      },
      {
        number: 31,
        question: 'Can courses be customised for our organisation?',
        paragraphs: [
          'Yes. Course content may be customised to reflect an organisation’s industry, policies, systems, customer environment, branding or staff-development objectives.',
          'Customisation requirements, timelines and costs will be agreed before sign-off.'
        ]
      },
      {
        number: 32,
        question: 'Can an organisation monitor employee progress?',
        paragraphs: [
          'Depending on the selected corporate package, authorised organisation representatives may receive reports showing enrolment, participation, course progress, assessment results and completion status.',
          'Access to learner information will be managed in accordance with applicable privacy and data-protection requirements.'
        ]
      },
      {
        number: 33,
        question: 'Can Elevate Skills train a large number of employees?',
        paragraphs: [
          'Yes. Elevate Skills can support group and bulk enrolments.',
          'Organisations should provide the expected number of learners, preferred courses, required completion dates and reporting requirements when requesting a quotation.'
        ]
      },
      {
        number: 34,
        question: 'Can our organisation have a branded learning portal?',
        paragraphs: [
          'Custom-branded or dedicated learning environments are made available for organisations, training providers and professional bodies.',
          'The available branding, administration, reporting and content-management options will depend on the selected package.'
        ]
      }
    ]
  },
  {
    id: 'trainers',
    title: 'Trainers and Content Partners',
    items: [
      {
        number: 35,
        question: 'Can trainers publish their courses on Elevate Skills?',
        paragraphs: [
          'Elevate Skills may work with qualified or accredited trainers, subject-matter experts and training organisations that wish to deliver courses through the platform.',
          'All proposed courses may be reviewed for quality, relevance, structure and compliance before they are approved.'
        ]
      },
      {
        number: 36,
        question: 'Can a trainer use Elevate Skills as a white-label platform?',
        paragraphs: [
          'White-label or branded training solutions may be available for approved trainers, institutions and organisations.',
          'Interested parties may contact Elevate Skills to discuss learner numbers, branding, course hosting, reporting and administration requirements.'
        ],
        links: [
          {
            label: 'sales@elevateskills.online',
            href: 'mailto:sales@elevateskills.online'
          }
        ]
      }
    ]
  },
  {
    id: 'support',
    title: 'Technical Support',
    items: [
      {
        number: 37,
        question: 'What should I do if a lesson or video does not open?',
        paragraphs: [
          'Confirm that your internet connection is working, refresh the page and try again.',
          'You may also try:'
        ],
        bullets: [
          'Logging out and signing in again',
          'Clearing your browser cache',
          'Using a different supported browser',
          'Restarting your device',
          'Switching to a more stable internet connection'
        ],
        closingParagraphs: [
          'If the problem continues, contact support and include the course name, lesson name, device used and a screenshot of the error.'
        ],
        links: [
          {
            label: 'help@elevateskills.online',
            href: 'mailto:help@elevateskills.online'
          }
        ]
      },
      {
        number: 38,
        question: 'Which internet browser should I use?',
        paragraphs: [
          'For the best experience, use an updated version of a widely supported browser such as Google Chrome, Microsoft Edge, Safari or Mozilla Firefox.',
          'Older browsers may not support all platform features.'
        ]
      },
      {
        number: 39,
        question: 'Can I share my account with another person?',
        paragraphs: [
          'No. Each learner must have their own account.',
          'Sharing login details or authenticator codes may compromise your personal information, affect assessment records and result in suspension of access.'
        ]
      },
      {
        number: 40,
        question: 'How do I contact Elevate Skills?',
        paragraphs: [
          'You can contact Elevate Skills through the contact details, enquiry form or support channels provided on elevateskills.online.',
          'When requesting assistance, include your full name, registered email address, contact number and the name of the course concerned.'
        ],
        links: [
          {
            label: 'Contact page',
            href: '/contact',
            external: false
          }
        ]
      },
      {
        number: 41,
        question: 'How is my personal information protected?',
        paragraphs: [
          'Elevate Skills takes reasonable measures to protect learner information and uses personal data for purposes connected to registration, payment, learning, certification, communication and support.',
          'Learners should review the Elevate Skills Privacy Notice for more information on how personal information is collected, processed, stored and protected.'
        ],
        links: [
          {
            label: 'Privacy Notice',
            href: '/privacy',
            external: false
          },
          {
            label: 'Terms and Conditions',
            href: '/terms',
            external: false
          }
        ]
      }
    ]
  }
];
