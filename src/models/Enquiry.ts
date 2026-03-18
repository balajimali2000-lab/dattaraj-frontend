import mongoose, { Schema, model, models } from 'mongoose';

export interface IEnquiry {
  name: string;
  phone: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

const Enquiry = models.Enquiry || model<IEnquiry>('Enquiry', EnquirySchema);

export default Enquiry;
