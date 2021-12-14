export type Tutor = {
  courses?: Array<"Math" | "English" | "Science" | "Other">;
  createdAt: Date;
  date: Date;
  email: string | null;
  id: string;
  name: string;
  updatedAt: Date;
};
