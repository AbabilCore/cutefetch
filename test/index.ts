import CuteFetch from "@/CuteFetch";
import { log } from "@/shared";

log.info("Test Module running....");

const cf = new CuteFetch({
  methods: ["DELETE", "GET", "POST", "PATCH", "PUT"],
  baseURL: "https://typecode-api.vercel.app/api/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

(async () => {
  const { error, data, status, statusText } = await cf.put("/posts/1", {
    body: JSON.stringify({
      title: "It's Ababil Nefren",
      description: "A programmer whos brain is not static!",
    }),
    query: {
      param_a: "i am a",
      param_b: "i am b",
    },
    transformResponse: (data) => data,
    transformErrorResponse: (error) => error,
    inspect: () => ({
      name_space: "post data fetch",
      rule: {
        // methods: true,
        // method: true,
        // timeout: true,
        // credentials: true,
        // mode: true,
        // cors: true,
        // cache: true,
        baseURL: true,
        full_url: true,
        // headers: true,
        query: true,
        body: true,
      },
      callback: (result) => {
        // console.log(result["post data fetch"]);

        const { body, query } = result.extract();

        if (body) {
          log.info(JSON.parse(body as string));
        }

        log.info(query);
      },
    }),
  });

  // if (data) {
  //   log.info(data);
  // } else {
  //   log.info(error);
  // }

  // const res = await cf.extra("/posts/1", {
  //   method: "PATCH",
  //   body: JSON.stringify({ name: "Ababil" }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   inspect: () => ({
  //     name_space: "post data fetch",
  //     rule: {
  //       methods: true,
  //       method: true,
  //       timeout: true,
  //       credentials: true,
  //       mode: true,
  //       cors: true,
  //       cache: true,
  //       baseURL: true,
  //       full_url: true,
  //       headers: true,
  //       body: true,
  //     },
  //     callback: (result) => log.info(result),
  //   }),
  // });
  // if (res.ok) {
  //   log.info(await res.json());
  // } else {
  //   log.info(await res.json());
  // }
})();
