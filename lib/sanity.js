import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "ur70l7j4",
  dataset: "production",
  apiVersion: "2022-03-25",
  token: process.env.SANITY_API_KEY,
  useCdn: false,
});
