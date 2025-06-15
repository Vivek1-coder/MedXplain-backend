import mongoose from "mongoose";
const { Schema } = mongoose;
const MatricsSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  metrics: {
    type: Map,
    of: Schema.Types.Mixed,
    required: true,
  },
  remarks: {
    type: String,
    default: "",
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const MatricsModel = mongoose.model("Matrics", MatricsSchema);
export { MatricsModel };
