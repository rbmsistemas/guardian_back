import express from "express"

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  res.status(404).send({ error: err.message });
});

export default app;