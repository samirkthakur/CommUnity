// /src/lib/validations/event.ts
import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required."),
  location: z.string().min(3, "Location must be at least 3 characters."),
});
