import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.text("Hello Node.js from user!"));

export default app;
