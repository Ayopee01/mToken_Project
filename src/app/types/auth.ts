export type DgaUser = {
  userId?: string;
  citizenId?: string;
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  dateOfBirthString?: string;
  mobile?: string;
  email?: string;
  notification?: boolean;
  appId?: string;
};

export type AuthContextValue = {
  user: DgaUser | null;
  loading: boolean;
  setUser: (user: DgaUser | null) => void;
  logout: () => void;
};