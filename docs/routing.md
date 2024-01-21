---
title: Routing
layout: default
nav_order: 4
---

<!-- markdownlint-disable MD033 -->
<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

Express.js is a minimal framework with a primitive way of routing:

```typescript
const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello world!");
});
```

It is quite flexible and efficient. However, it will need a lot of this kind of
of boilerplate codes if the project becomes larger. It is time for
`routing-controllers` to route with annotations.

## Prepare a project

Please start with source code of `reading-environment-variables`:

```shell
cp -R reading-environment-variables routing
```

## Installing routing-controllers

After renaming the project in `package.js`, install new dependencies:

```shell
cd routing
npm install reflect-meta routing-controllers lru-cache
```

Note: An up-to-date version of `lru-cache` is necessary because to override the
wrong version linked by `routing-controllers`. Some features in tsconfig.json
must be enabled:

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

## Using routing-controllers

Firstly, please create some controllers with routing annotations:

- `src/api/controllers/HelloWorldController.ts`

```typescript
import { Get, JsonController } from "routing-controllers";

@JsonController("/helloworld")
export class HelloWorldController {
  @Get("/")
  async sayHello() {
    return { message: "Welcome from HelloWorldController" };
  }
}
```

- `src/api/controllers/SampleController.ts`

```typescript
import { Get, JsonController } from "routing-controllers";

@JsonController("/sample")
export class SampleController {
  @Get("/")
  async greeting() {
    return { message: "Welcome from SampleController" };
  }
}
```

Then, update `src/index.ts` with `routing-controllers`'s wrapper of the express
application:

```typescript
import "reflect-metadata"; // once per project

import { configuration } from "@lib/miscellaneous";
import { createExpressServer } from "routing-controllers";

const app = createExpressServer({
  controllers: [`${__dirname}/src/api/controllers/**/*Controllers.ts`],
  routePrefix: "/api",
});

app.listen(3000, () => {
  console.log(`Running at the port 3000`);
});
```

Results can be seen at the address: [http://localhost:3000/api/helloworld] and
[http://localhost:3000/api/sample].

```text
{"message":"Welcome from HelloWorldController"}
```