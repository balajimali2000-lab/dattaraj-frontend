import mongoose, { Schema, model, models } from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, default: "General Inquiry" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = models.Contact || model<IContact>('Contact', ContactSchema);

export default Contact;
