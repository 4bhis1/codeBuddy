const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    question_id: String,

    vcs: { type: "ObjectId", ref: "ProjectVersionControl" },
    user_id: { type: "ObjectId", ref: "User" },
    access_token: String,
    production_branch: String,
    development_branch: String,
    project_id: { type: "ObjectId", ref: "Project" },
    url: String,
    type: {
      type: String,
      enum: ["Frontend", "Backend", "UI Components", "Data Services"],
      required: true,
    },
    dependent_repositories: [{ type: "ObjectId", ref: "ProjectRepository" }],
    // vcs webhook
    webhook_status: String,

    language: String,
    frameworks: [String],
    framework_version: String,
    database_id: { type: "ObjectId", ref: "ProjectDatabase" },
    db_service_library: String,
    lock_for_qa: Boolean,

    //paths
    root_folder_path: String,
    screens_folder_path: String,
    schema_folder_path: String,
    api_folder_path: String,
    documentation_file_path: String,

    // destination folder for deployment
    destination_folder: String,

    is_deployable: Boolean,
    category: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// schema.virtual('dependent_repositories', {
//   ref: 'ProjectRepository',
//   localField: '_id',
//   foreignField: 'parent_repository',
// });

schema.virtual("feature_all_pr_count", {
  ref: "ProjectPullRequest",
  localField: "_id",
  foreignField: "repository_id",
  count: true,
});

schema.index(
  {
    repository: 1,
    project_id: 1,
  },
  { unique: true, sparse: true }
);

schema.index(
  {
    project_id: 1,
  },
  { sparse: true }
);

const ProjectRepository = mongoose.model("ProjectRepository", schema);

ProjectRepository.createIndexes()
  .then(() => {
    console.log("Indexes created successfully : ProjectRepository");
  })
  .catch((err) => {
    console.error("Error creating indexes : ProjectRepository", err);
  });

module.exports = ProjectRepository;
