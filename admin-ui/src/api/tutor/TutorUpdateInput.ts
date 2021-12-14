export type TutorUpdateInput = {
  courses?: Array<"Math" | "English" | "Science" | "Other">;
  date?: Date;
  email?: string | null;
  name?: string;
};
