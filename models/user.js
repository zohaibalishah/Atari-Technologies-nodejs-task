var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { getHashValue } = require("../helpers/user");
userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "manager"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await getHashValue(this.password);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
