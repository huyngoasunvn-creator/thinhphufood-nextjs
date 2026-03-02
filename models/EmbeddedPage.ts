import mongoose from "mongoose"

const EmbeddedPageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    externalUrl: {
      type: String,
      required: true
    },
    showOnHeader: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

export default mongoose.models.EmbeddedPage ||
  mongoose.model("EmbeddedPage", EmbeddedPageSchema)