<h1 align='center'>CuteFetch</h1>

### What is CuteFetch ?

CuteFetch is a HTTP client, inspired by Axios, thats offers a sleek and minimalistic solution for modern web and Node.js applications

## 🚀 CuteFetch - Lightweight & Customizable HTTP Client

| Feature                       | Description                                          |
| ----------------------------- | ---------------------------------------------------- |
| 🌟 **Lightweight**            | A very lightweight library                           |
| ⚡ **Fast & Simple**          | Easy to use                                          |
| 🔄 **Auto Parsing**           | Automatically parses JSON, text, blobs               |
| 🎯 **Customizable**           | Can be customized and extended as desired            |
| 🔥 **Modern Fetch-Based**     | It is built based on the modern Fetch API            |
| 🛠 **Supports Extra Requests** | `cf.extra()` instance method for complete control    |
| ⏳ **Timeout Support**        | Add timeout globally or to specific instance methods |

# How to use?

```bash
npm install cutefetch  # Or yarn add cutefetch
```

```js
/*For ESM*/
import CuteFetch from "CuteFetch";

/*For CJS*/
const CuteFetch = require("CuteFetch");
```

## Create CuteFetch instance

```js
const cf = new CuteFetch({
  baseURL: "https://typecode-api.vercel.app",
  timeout: 12000,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  mode: "cors",
  cache: "force-cache",
  credentials: "include",
});
```

| Property    | Description                                                                                                                         | Default   | Optional |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| methods     | Add the HTTP Request methods you will use within the **methods** Array                                                              | `[]`      | No       |
| baseURL     | The baseURL for API requests                                                                                                        | `nothing` | Yes      |
| resultProps | Here you can define where the final Response Data will be received                                                                  | `data`    | Yes      |
| credentials | Here you can add the [credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) value for the HTTP Request | `omit`    | Yes      |
| cache       | Here you can add the [cache](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache) value for the HTTP Request             | `default` | Yes      |
| mode        | Here you can add the [mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) value for the HTTP Request               | `cors`    | Yes      |
| timeout     | Here you can add the timeout (in milliseconds) value for the HTTP Request                                                           | `5000`    | Yes      |

### CuteFetch instance methods (6)

1. **cf.get()**  
   **Syntax**: cf.get('/path-to-endpoint', { Request options })
2. **cf.post()**  
   **Syntax:** cf.post('/path-to-endpoint', { Request options })
3. **cf.put()**  
   **Syntax:** cf.put('/path-to-endpoint', { Request options })
4. **cf.patch()**  
   **Syntax:** cf.patch('/path-to-endpoint', { Request options })
5. **cf.delete()**  
   **Syntax:** cf.delete('/path-to-endpoint', { Request options })
6. **cf.extra()**  
   **Syntax:** cf.extra('/path-to-endpoint', { Request options })

### Request options properties:

| Property    | Default                                               | Optional | Replaceable |
| ----------- | ----------------------------------------------------- | :------: | :---------: |
| body        | Nothing                                               |   Yes    |     Yes     |
| query       | Nothing                                               |   Yes    |     Yes     |
| headers     | Taken from CuteFetch configuration, otherwise default |   Yes    |     Yes     |
| timeout     | Taken from CuteFetch configuration, otherwise default |   Yes    |     Yes     |
| baseURL     | Taken from CuteFetch configuration, otherwise nothing |   Yes    |     Yes     |
| credentials | Taken from CuteFetch configuration, otherwise default |   Yes    |     Yes     |
| mode        | Taken from CuteFetch configuration, otherwise default |   Yes    |     Yes     |
| cache       | Taken from CuteFetch configuration, otherwise default |   Yes    |     Yes     |
| resultProps | Taken from CuteFetch configuration, otherwise default |   Yes    |     Yes     |
| method      | Taken from the CuteFetch library                      |   Yes    |     No      |

## Example Request

**Create a Basic Instance**

```js
const cf = new CuteFetch({
  baseURL: "https://typecode-api.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### 1. GET

**Example Success Response handling:**

```js
const { data, error } = await cf.get("/api/posts", {
  timeout: 8000,
});

if (data) {
  console.log(data);
} else {
  console.log(error);
}
```

```js
// Console Output
{
  success: true,
  status: 200,
  message: 'All Posts here',
  data: [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\n' +
        'suscipit recusandae consequuntur expedita et cum\n' +
        'reprehenderit molestiae ut ut quas totam\n' +
        'nostrum rerum est autem sunt rem eveniet architecto'
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\n' +
        'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
        'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
        'qui aperiam non debitis possimus qui neque nisi nulla'
    },
    ...more
  ]
}
```

**Example Failed Response handling:**

```js
const { data, error } = await cf.get("/api/postss"); // Invalid endpoint

if (data) {
  console.log(data);
} else {
  console.log(error); // Error output in the console
}
```

```json
// Console Output
{
  "success": false,
  "status": 404,
  "message": "Requested data will not be found"
}
```

### 2. POST

```js
const post = {
  title: "তবে গল্পটা যদি আরও কিছুটা দুরে যেতো",
  body: "মনে আছে? একদিন আমরা আঁকাশের তারা গুনছিলাম। তুমি বোকার মত বলেছিলে হ্যাঁ। আমি তোমাকে একটা খোঁচা দিলাম। অমনি তোমার হুঁশ ফিরলো আর বললে, ধুর দিনের বেলা কে তাঁরা গুনলো?",
  userId: 1,
};

const { data, error } = await cf.post("/api/posts", {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(post),
});

if (data) {
  console.log(data);
} else {
  console.log(error); // No Error
}
```

```js
// Console Output
{
  success: true,
  status: 201,
  message: 'Post Successfully created',
  data: {
    title: 'তবে গল্পটা যদি আরও কিছুটা দুরে যেতো',
    body: 'মনে আছে? একদিন আমরা আঁকাশের তারা গুনছিলাম। তুমি বোকার মত বলেছিলে হ্যাঁ। আমি তোমাকে একটা খোঁচা দিলাম। অমনি তোমার হুঁশ ফিরলো আর বললে, ধুর দিনের বেলা কে তাঁরা গুনলো?',
    userId: 1,
    id: 101
  }
}
```

---

### 3. PUT

```js
const { data, error } = await cf.put("/api/posts/1", {
  body: JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  }),
});

if (data) {
  console.log(data);
} else {
  console.log(error); // No Error
}
```

```js
// Console Output
{
  success: true,
  status: 202,
  message: 'Post updated successfully',
  data: { title: 'foo', body: 'bar', userId: 1, id: 1 }
}
```

---

### 4. PATCH

```js
const { data, error } = await cf.patch("/api/posts/1", {
  body: JSON.stringify({
    title: "তুমি আমায় ডেকেছিলে এক মেঘে ঢাকা দিনে।",
  }),
});

if (data) {
  console.log(data);
} else {
  console.log(error); // No Error
}
```

```js
// Console Output
{
  success: true,
  status: 202,
  message: 'Post partially updated!',
  data: {
    userId: 1,
    id: 1,
    title: 'তুমি আমায় ডেকেছিলে এক মেঘে ঢাকা দিনে।',
    body: 'quia et suscipit\n' +
      'suscipit recusandae consequuntur expedita et cum\n' +
      'reprehenderit molestiae ut ut quas totam\n' +
      'nostrum rerum est autem sunt rem eveniet architecto'
  }
}
```

---

### 5. DELETE

```js
const { data, error } = await cf.delete("/api/posts/5");

if (data) {
  console.log(data);
} else {
  console.log(error); // No Error
}
```

```js
// Console Output
{ success: true, status: 200, message: 'Post deleted id: 5' }
```

<h2 align='center'>EXTRA - Methods</h2>

This method can handle any HTTP Request. Additionally, it gives the Developer more control. However, the `extra` method returns a Promise Response, so if you use it, you will be responsible for handling the Promise Response yourself

It's worth noting that `HEAD` and `OPTIONS` requests can also be used via the `extra` method.

**GET** request with extra method:

```js
const response = await cf.extra("/api/posts", {
  method: "GET",
  query: {
    _limit: "1",
    _start: "2",
  },
});

const { status, statusText, ok /*... and more*/ } = response;

if (!ok) {
  // Some Error handling Logic
  console.log(await response.json());
} else {
  // manipulate respone data using response method e.g. response.text(),response.json()
  console.log(await response.json());
}
```

```js
// Console Output
{
  success: true,
  status: 200,
  message: 'All Posts here',
  data: [
    {
      userId: 1,
      id: 3,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      body: 'et iusto sed quo iure\n' +
        'voluptatem occaecati omnis eligendi aut ad\n' +
        'voluptatem doloribus vel accusantium quis pariatur\n' +
        'molestiae porro eius odio et labore et velit aut'
    }
  ]
}
```

**Similarly, other request methods can be applied through this `extra` method.**

<h2 align='center'> Error and Exceptions</h2>

You need to add the corresponding HTTP method in the `CuteFetch` Configuration for each `CuteFetch` instance method you intend to use.

For example: If you want to use the `cf.get()` method, you need to add it to the `CuteFetch` Configuration.

```js
const cf = new CuteFetch({
  methods: ["GET"],
  ...others,
});
```

If you call the `cf.get()` method without adding "GET" to the methods array in the `CuteFetch` configuration, you will see the following error:

<div align="center">
  <img src="./assets/config.err-1.png">
</div>

Similarly, you need to add all the HTTP Request methods you intend to use to the methods Array in the `CuteFetch` Configuration.

---

If you mistakenly change the HTTP Request method, you will see the following error.

For example:

```js
const result = await cf.get("/posts", {
  method: "POST",
});
```

<div align="center">
  <img src="./assets/config.err-2.png">
</div>

Note: It is pointless to try to modify the Request method of these five instance methods: `cf.get()`, `cf.post()`, `cf.put()`, `cf.patch()`, `cf.delete()`.

---

If you use the `cf.extra()` method, you must include the Request Method within the options.

For example:

```js
const response = await cf.extra("/posts", {
  method: "GET",
});

const { status, statusText, ok /*... and more*/ } = response;

if (!ok) {
  // Some Error handling Logic
} else {
  // manipulate respone data using response method e.g. response.text(),response.json()
}
```

If you don't do this, you will see the following error:

For example:

```js
const response = await cf.extra("/posts", {
  ...othes,
});
```

<div align="center">
  <img src="./assets/config.err-3.png">
</div>

---

### Bodyless HTTP request for CuteFetch:

```
 GET HEAD OPTIONS DELETE
```

If you include a body property in the options for the mentioned Bodyless HTTP requests, you will observe the following error.

For example:

```js
(async () => {
  try {
    const response = await cf.extra("/posts/1", {
      method: "HEAD",
      body: JSON.stringify({ name: "Ababil", age: undefined }),
    });
    if (response.ok) {
      console.log(await response.headers);
    }
  } catch (error) {
    console.log(error);
  }
})();
```

<div align="center">
  <img src="./assets/config.err-4.png">
</div>

## How to use it in plain HTML

**app.js**

```js
// import CuteFetch library
import CuteFetch from "https://www.unpkg.com/cutefetch@x.x.x/dist/index.mjs";

// navigate to 'https://www.npmjs.com/package/cutefetch' to see latest version for CuteFetch

// create CuteFetch instance
const cf = new CuteFetch({
  baseURL: "https://typecode-api.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

// use intance method
cf.get("/api/posts", {
  query: {
    _page: "1",
    _limit: "3",
  },
})
  .then(console.log)
  .catch(console.log);
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- linkup app.js in html -->
    <script type="module" src="./app.js"></script>
  </body>
</html>
```

**Inside browser console**

<div align="center">
  <img src="./assets/browser.console.result.png">
</div>

### Supported HTTP Methods for CuteFetch

```
GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS ✔️
```

---

---

<h3 align='center'>Thanks to you, and take care of your eyes.</h3>

<p align='center'>❤️😊</p>
