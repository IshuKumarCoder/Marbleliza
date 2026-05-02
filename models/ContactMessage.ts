import { Schema, models, model } from 'mongoose';

export interface IContactMessage {
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  message: string;
  source?: string;
  createdAt: Date;
  location?: string;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String, default: 'General' },
  location: { type: String, required: false },
}, {
  timestamps: true,
  collection: 'query'
});

export const ContactMessage = models.ContactMessage || model<IContactMessage>('ContactMessage', ContactMessageSchema);
