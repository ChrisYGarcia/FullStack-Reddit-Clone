const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  handle: {
    type: String
  },
  upvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  downvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      username: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      replies: [
        {
          username: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          text: {
            type: String,
            required: true
          },
          upvotes: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: "users"
              }
            }
          ],
          downvotes: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: "users"
              }
            }
          ],
          reply: [replies]
        }
      ],
      text: {
        type: String,
        required: true
      }
    }
  ],
  upvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  downvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
