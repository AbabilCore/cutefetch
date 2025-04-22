import CuteFetch from "@/CuteFetch";
import { log } from "@/shared";

log.info("Test Module running....");

const cf = new CuteFetch({
  methods: ["DELETE", "GET", "POST", "PUT", "PATCH"],
  baseURL: "https://typecode-api.vercel.app",
  timeout: 1000,
});

(async () => {
  const { error, data } = await cf.put("/api/posts/1", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: "hello", body: "its test post" }),
  });

  console.log(data);

  const res = await cf.extra("/api/posts/1", {
    method: "PATCH",
    body: JSON.stringify({ name: "Ababil" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    console.log(await res.json());
  } else {
    console.log(await res.json());
  }
})();
