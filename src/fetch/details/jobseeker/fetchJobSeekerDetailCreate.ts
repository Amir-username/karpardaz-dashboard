import { BASE_LINK } from "@/config";

type BodyType = object;

export const fetchAddJobSeekerDetail = async (
  accessToken: string,
  body: BodyType
) => {
  const res = await fetch(BASE_LINK + "jobseeker-detail/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  console.log(data);
};
