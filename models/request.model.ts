import mongoose, { Model, model, Types, Schema } from 'mongoose';

interface IRequest {
  user: Types.ObjectId | string;
  payerName: string;
  payerEmail: string;
  requestAs: string;
  fiatCurrency: string;
  cryptoChain: string;
  walletAddress: string;
  dueDate: Date;
  description: string;
  amount: number;
}

const requestSchema = new Schema<IRequest>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  payerName: {
    type: String,
    required: true,
  },
  payerEmail: {
    type: String,
    required: true,
  },
  requestAs: {
    type: String,
    required: true,
  },
  fiatCurrency: {
    type: String,
    required: true,
  },
  cryptoChain: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const RequestModel: Model<IRequest> =
  mongoose.models && mongoose.models.request
    ? mongoose.models.request
    : model<IRequest>('request', requestSchema);

export default RequestModel;
