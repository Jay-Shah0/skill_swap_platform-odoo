import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offeredSkill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  wantedSkill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    default: 'PENDING'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.SwapRequest || mongoose.model('SwapRequest', swapRequestSchema);
