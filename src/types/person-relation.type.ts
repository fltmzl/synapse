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

export type UpdatePersonDto = Partial<CreatePersonDto>;

// ============================================================================
// Company Types
// ============================================================================

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
};

export type UpdateCompanyDto = Partial<CreateCompanyDto>;

// ============================================================================
// CompanyPerson Types (Junction Table)
// ============================================================================

export type CompanyPerson = {
  id: string;
  companyId: string;
  personId: string;
  title?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  locationType?: string;
  description?: string;
  employmentType?: string;
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
  employmentType?: string;
};

export type UpdateCompanyPersonDto = Partial<
  Omit<CreateCompanyPersonDto, "companyId" | "personId">
>;

// ============================================================================
// Education Types
// ============================================================================

export type Education = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  profilePicture?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateEducationDto = {
  name: string;
  description?: string;
  profilePicture?: string;
};

export type UpdateEducationDto = Partial<CreateEducationDto>;

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
  name: string;
  slug: string;
  profilePicture?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateAssociationDto = {
  name: string;
  profilePicture?: string;
};

export type UpdateAssociationDto = Partial<CreateAssociationDto>;

// ============================================================================
// AssociationPerson Types (Junction Table)
// ============================================================================

export type AssociationPerson = {
  id: string;
  associationId: string;
  personId: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateAssociationPersonDto = {
  associationId: string;
  personId: string;
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
  name: string;
  slug: string;
  profilePicture?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreatePoliticalPartyDto = {
  name: string;
  profilePicture?: string;
};

export type UpdatePoliticalPartyDto = Partial<CreatePoliticalPartyDto>;

// ============================================================================
// PoliticalPartyPerson Types (Junction Table)
// ============================================================================

export type PoliticalPartyRelationType = "supports" | "opposes";

export type PoliticalPartyPerson = {
  id: string;
  politicalPartyId: string;
  personId: string;
  type: PoliticalPartyRelationType;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreatePoliticalPartyPersonDto = {
  politicalPartyId: string;
  personId: string;
  type: PoliticalPartyRelationType;
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
 * Type for creating a company with a new authorized representative person
 */
export type CreateCompanyWithRepresentativeDto = {
  company: CreateCompanyDto;
  representative: CreatePersonDto;
};
