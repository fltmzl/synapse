import { Timestamp } from "firebase/firestore";

// ============================================================================
// Socials Type (Shared)
// ============================================================================

export type Socials = {
  whatsapp?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  instagram?: string | null;
};

// ============================================================================
// Person Types
// ============================================================================

export type Person = {
  id: string;
  idNumber?: string;
  code?: string;
  name: string;
  phoneNumber?: string;
  countryCode?: string;
  description?: string;
  email?: string;
  profilePicture?: string;
  currentJobPosition?: string;
  categoryId?: string;
  placeId?: string;
  territoryId?: string;
  slug: string;
  socials?: Socials;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type PersonWithDetails = Person & {
  territory?: {
    id: string;
    name: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
  } | null;
  category?: {
    id: string;
    name: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
  } | null;
  companies?: Array<Company & CompanyPerson>;
  educations?: Array<Education & EducationPerson>;
  associations?: Array<{
    id: string;
    associationId: string;
    name: string;
    profilePicture?: string;
    link?: string;
    title?: string;
    type?: string;
    startDate?: Timestamp;
    endDate?: Timestamp;
  }>;
  politicalParties?: Array<PoliticalParty & PoliticalPartyPerson>;
};

export type CreatePersonDto = {
  idNumber?: string;
  code?: string;
  name: string;
  phoneNumber?: string;
  countryCode?: string;
  description?: string;
  email?: string;
  profilePicture?: string;
  currentJobPosition?: string;
  categoryId?: string;
  placeId?: string;
  territoryId?: string;
  socials?: Socials;
};

export type CreateManyPersonFromExcelDto = {
  identifier: {
    id: string;
  };
  general: {
    gender: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
  };
  location: {
    implantation: string;
  };
  company: {
    occupation: string;
    id: string;
    entity: string;
    field: string;
    category: string;
    area: string;
  };
};

export type UpdatePersonDto = Partial<CreatePersonDto>;

// ============================================================================
// Company Types
// ============================================================================

export type EconomicalNumbers = {
  capital?: string | number | null;
  financial_result?: string | number | null;
  margin?: string | number | null;
  number_of_employees?: string | number | null;
  operating_profit?: string | number | null;
  turnover?: string | number | null;
};

export type Company = {
  id: string;
  idNumber?: string;
  code?: string;
  name: string;
  slug: string;
  profilePicture?: string;
  description?: string;
  categoryId?: string;
  placeId?: string;
  territoryId?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  establishmentDate?: Timestamp;
  authorizedRepresentativeId?: string;
  socials?: Socials;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  implantation?: string;
  zipCode?: string;
  city?: string;
  sirenCode?: string;
  legalStatus?: string;
  economicalNumbers?: EconomicalNumbers;
  nafCode?: string;
  activity?: string;
};

export type CompanyWithDetails = Omit<
  Company,
  "createdAt" | "updatedAt" | "establishmentDate"
> & {
  createdAt?: number | Timestamp | null;
  updatedAt?: number | Timestamp | null;
  establishmentDate?: number | Timestamp | null;
  category?: {
    id: string;
    name: string;
  } | null;
  territory?: {
    id: string;
    name: string;
  } | null;
  authorizedRepresentative?: {
    id: string;
    name: string;
    profilePicture?: string;
    email?: string;
    phoneNumber?: string;
    description?: string;
    currentJobPosition?: string;
    slug?: string;
  } | null;
};

export type CreateCompanyDto = {
  idNumber?: string;
  code?: string;
  name: string;
  profilePicture?: string;
  description?: string;
  categoryId?: string;
  placeId?: string;
  territoryId?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  establishmentDate?: Date;
  authorizedRepresentativeId?: string;
  socials?: Socials;
  implantation?: string;
  zipCode?: string;
  city?: string;
  sirenCode?: string;
  legalStatus?: string;
  economicalNumbers?: EconomicalNumbers;
  nafCode?: string;
  activity?: string;
};

export type UpdateCompanyDto = Partial<CreateCompanyDto>;

// ============================================================================
// CompanyPerson Types (Junction Table)
// ============================================================================

export type CompanyPersonEmploymentType =
  | "fulltime"
  | "parttime"
  | "contract"
  | "freelance"
  | "internship"
  | "other";

export type CompanyPerson = {
  id: string;
  companyId: string;
  personId: string;
  title?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  locationType?: string;
  description?: string;
  employmentType?: CompanyPersonEmploymentType;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateCompanyPersonDto = {
  companyId: string;
  personId: string;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  locationType?: string;
  description?: string;
  employmentType?: CompanyPersonEmploymentType;
};

export type CompanyDataFromExcelDto = {
  identifier: {
    id: string;
  };
  structure: {
    structure_name: string;
  };
  address: {
    implantation: string;
    date_of_creation: string;
    street: string;
    zip_code: string;
    city: string;
    phone: string;
    email: string;
    website: string;
    naf_code: string;
    activity: string;
    category: string;
    description: string;
    legal_status: string;
    siren_code: string;
  };
  legal_representative: {
    first_name: string;
    last_name: string;
    if_not_a_person: string;
    position: string;
    contact: string;
    id: string;
  };
  economical_numbers: {
    number_of_employees: number;
    capital: number;
    turnover: number;
    financial_result: number;
    margin: number;
    operating_profit: number;
  };
};

export type CompanyPersonRelationsFromExcelDto = {
  relation: {
    person: string;
    organization: string;
    nature_of_the_link: string;
  };
};

export type UpdateCompanyPersonDto = Partial<
  Omit<CreateCompanyPersonDto, "companyId" | "personId">
>;

// ============================================================================
// Education Types
// ============================================================================

export type Education = {
  id: string;
  code?: string;
  name: string;
  slug: string;
  implantation?: string;
  territoryId?: string;
  dateOfCreation?: Timestamp;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  categoryId?: string;
  description?: string;
  registrationCode?: string;
  authorizedRepresentativeId?: string;
  profilePicture?: string;
  link?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateEducationDto = {
  code?: string;
  name: string;
  implantation?: string;
  territoryId?: string;
  dateOfCreation?: Date;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  categoryId?: string;
  description?: string;
  registrationCode?: string;
  authorizedRepresentativeId?: string;
  profilePicture?: string;
  link?: string;
};

export type UpdateEducationDto = Partial<CreateEducationDto>;

export type EducationDataFromExcelDto = {
  identifier: {
    id: string;
  };
  structure: {
    structure_name: string;
  };
  address: {
    implantation: string;
    date_of_creation: string;
    street: string;
    zip_code: string;
    city: string;
    phone: string;
    email: string;
    website: string;
    category: string;
    description: string;
    registration_code: string;
  };
  legal_representative: {
    first_name: string;
    last_name: string;
    id: string;
  };
};

export type EducationPersonRelationsFromExcelDto = {
  relation: {
    organization: string;
    person: string;
    nature_of_the_link: string;
  };
};

// ============================================================================
// EducationPerson Types (Junction Table)
// ============================================================================

export type EducationPerson = {
  id: string;
  educationId: string;
  personId: string;
  major?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  gpa?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateEducationPersonDto = {
  educationId: string;
  personId: string;
  major?: string;
  startDate?: Date;
  endDate?: Date;
  gpa?: number;
};

export type UpdateEducationPersonDto = Partial<
  Omit<CreateEducationPersonDto, "educationId" | "personId">
>;

// ============================================================================
// Association Types
// ============================================================================

export type Association = {
  id: string;
  code?: string;
  name: string;
  slug: string;
  implantation?: string;
  territoryId?: string;
  dateOfCreation?: Timestamp;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  activity?: string;
  categoryId?: string;
  description?: string;
  registrationCode?: string;
  authorizedRepresentativeId?: string;
  action?: {
    numberOfEmployees?: number;
    numberOfMembers?: number;
    budget?: number;
    cause?: string;
    mainProject?: string;
  };
  profilePicture?: string;
  link?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateAssociationDto = {
  code?: string;
  name: string;
  implantation?: string;
  territoryId?: string;
  dateOfCreation?: Date;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  activity?: string;
  categoryId?: string;
  description?: string;
  registrationCode?: string;
  authorizedRepresentativeId?: string;
  action?: {
    numberOfEmployees?: number;
    numberOfMembers?: number;
    budget?: number;
    cause?: string;
    mainProject?: string;
  };
  profilePicture?: string;
  link?: string;
};

export type UpdateAssociationDto = Partial<CreateAssociationDto>;

export type AssociationDataFromExcelDto = {
  identifier: {
    id: string;
  };
  structure: {
    structure_name: string;
  };
  address: {
    implantation: string;
    date_of_creation: string;
    street: string;
    zip_code: string;
    city: string;
    phone: string;
    email: string;
    website: string;
    activity: string;
    category: string;
    description: string;
    registration_code: string;
  };
  legal_representative: {
    first_name: string;
    last_name: string;
    id: string;
  };
  action: {
    number_of_employees: number | string;
    number_of_members: number | string;
    budget: number | string;
    cause: string;
    main_project: string;
  };
};

export type AssociationPersonRelationsFromExcelDto = {
  relation: {
    organization: string;
    person: string;
    nature_of_the_link: string;
  };
};

// ============================================================================
// AssociationPerson Types (Junction Table)
// ============================================================================

export type AssociationPerson = {
  id: string;
  associationId: string;
  personId: string;
  title?: string;
  type?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateAssociationPersonDto = {
  associationId: string;
  personId: string;
  title?: string;
  type?: string;
  startDate?: Date;
  endDate?: Date;
};

export type UpdateAssociationPersonDto = Partial<
  Omit<CreateAssociationPersonDto, "associationId" | "personId">
>;

// ============================================================================
// PoliticalParty Types
// ============================================================================

export type PoliticalParty = {
  id: string;
  code?: string;
  name: string;
  slug: string;
  implantation: string; // territory name
  territoryId: string; // territory id
  dateOfCreation?: Timestamp;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  categoryId?: string;
  description?: string;
  registrationCode?: string;
  authorizedRepresentativeId?: string; // id person
  members: {
    numberOfMembers: number;
    numberOfCandidates: number;
    numberOfElected: number;
  };
  profilePicture?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreatePoliticalPartyDto = {
  code?: string;
  name: string;
  slug?: string;
  implantation?: string;
  territoryId?: string;
  dateOfCreation?: Date;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  categoryId?: string;
  description?: string;
  registrationCode?: string;
  authorizedRepresentativeId?: string;
  members?: {
    numberOfMembers?: number;
    numberOfCandidates?: number;
    numberOfElected?: number;
  };
  profilePicture?: string;
};

export type UpdatePoliticalPartyDto = Partial<CreatePoliticalPartyDto>;

export type PoliticalPartyDataFromExcelDto = {
  identifier: {
    id: string;
  };
  structure: {
    political_party: string;
  };
  address: {
    implantation: string;
    date_of_creation: string;
    street: string;
    zip_code: string;
    city: string;
    phone: string;
    email: string;
    website: string;
    category: string;
    description: string;
    registration_code: string;
  };
  legal_representative: {
    first_name: string;
    last_name: string;
    id: string;
  };
  members: {
    number_of_members: number | string;
    number_of_candidates: number | string;
    number_of_elected: number | string;
  };
};

export type PoliticalPartyPersonRelationsFromExcelDto = {
  relation: {
    person: string;
    political_party: string;
    nature_of_the_link: string;
  };
};

// ============================================================================
// PoliticalPartyPerson Types (Junction Table)
// ============================================================================

export type PoliticalPartyRelationType = "supports" | "opposes";

export type PoliticalPartyPerson = {
  id: string;
  politicalPartyId: string;
  personId: string;
  type: PoliticalPartyRelationType;
  title: string; // from nature_of_the_link
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreatePoliticalPartyPersonDto = {
  politicalPartyId: string;
  personId: string;
  type: PoliticalPartyRelationType;
  title: string;
};

export type UpdatePoliticalPartyPersonDto = Partial<
  Omit<CreatePoliticalPartyPersonDto, "politicalPartyId" | "personId">
>;

// ============================================================================
// Batch Create Person with Relations Types
// ============================================================================

/**
 * Type for creating a person with company relations
 */
export type CreatePersonWithCompaniesDto = {
  person: CreatePersonDto;
  companies?: Array<
    Omit<CreateCompanyPersonDto, "personId"> & {
      companyId: string;
    }
  >;
};

/**
 * Type for creating a person with education relations
 */
export type CreatePersonWithEducationsDto = {
  person: CreatePersonDto;
  educations?: Array<
    Omit<CreateEducationPersonDto, "personId"> & {
      educationId: string;
    }
  >;
};

/**
 * Type for creating a person with association relations
 */
export type CreatePersonWithAssociationsDto = {
  person: CreatePersonDto;
  associations?: Array<
    Omit<CreateAssociationPersonDto, "personId"> & {
      associationId: string;
    }
  >;
};

/**
 * Type for creating a person with political party relations
 */
export type CreatePersonWithPoliticalPartiesDto = {
  person: CreatePersonDto;
  politicalParties?: Array<
    Omit<CreatePoliticalPartyPersonDto, "personId"> & {
      politicalPartyId: string;
      type: PoliticalPartyRelationType;
    }
  >;
};

/**
 * Comprehensive type for creating a person with all possible relations
 */
export type CreatePersonWithRelationsDto = {
  person: CreatePersonDto;
  companies?: Array<
    Omit<CreateCompanyPersonDto, "personId"> & {
      companyId: string;
    }
  >;
  educations?: Array<
    Omit<CreateEducationPersonDto, "personId"> & {
      educationId: string;
    }
  >;
  associations?: Array<
    Omit<CreateAssociationPersonDto, "personId"> & {
      associationId: string;
    }
  >;
  politicalParties?: Array<
    Omit<CreatePoliticalPartyPersonDto, "personId"> & {
      politicalPartyId: string;
      type: PoliticalPartyRelationType;
    }
  >;
};

/**
 * Comprehensive type for updating a person with all possible relations
 */
export type UpdatePersonWithRelationsDto = {
  person: UpdatePersonDto;
  companies?: Array<
    Omit<CreateCompanyPersonDto, "personId"> & {
      companyId: string;
    }
  >;
  educations?: Array<
    Omit<CreateEducationPersonDto, "personId"> & {
      educationId: string;
    }
  >;
  associations?: Array<
    Omit<CreateAssociationPersonDto, "personId"> & {
      associationId: string;
    }
  >;
  politicalParties?: Array<
    Omit<CreatePoliticalPartyPersonDto, "personId"> & {
      politicalPartyId: string;
      type: PoliticalPartyRelationType;
    }
  >;
};

/**
 * Type for creating a company with a new authorized representative person
 */
export type CreateCompanyWithRepresentativeDto = {
  company: CreateCompanyDto;
  representative: CreatePersonDto;
};

/**
 * Type for updating a company with a new authorized representative person
 */
export type UpdateCompanyWithRepresentativeDto = {
  companyId: string;
  company: UpdateCompanyDto;
  representative: CreatePersonDto;
};
