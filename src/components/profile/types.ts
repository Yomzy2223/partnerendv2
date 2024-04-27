import { LucideIcon } from "lucide-react";

export interface FieldType {
    id?: string;
    type: string;
    question?: string;
    icon?: LucideIcon;
    compulsory?: boolean;
    options?: string[];
    fileName?: string;
    fileLink?: string;
    fileType?: string;
  }

