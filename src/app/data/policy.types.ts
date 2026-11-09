export interface PolicySubsection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PolicySection {
  number?: number | string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: PolicySubsection[];
}

export interface PolicyMeta {
  title: string;
  shortTitle: string;
  effectiveDate: string;
  companyName: string;
  summary: string;
  owner?: string;
  approvedBy?: string;
}
