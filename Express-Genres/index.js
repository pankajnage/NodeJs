const express = require("express");

const app = express();

const Joi = require("joi");

app.use(express.json());

const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
});

app.post("/api/genres/:id", (req, res) => {
  // check gernes
  // JOI Validation

  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

  // general Validation
  //if (! req.body.name || req.body.name.length < 2){
  //    res.status(400).send("Bad request - Name is required and it's length should be atleast 3 char");
  //}
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  //
  const genre = genres.find(c => c.id == parseInt(req.params.id));
  // if found --> 400 (bad req)
  if (genre) return res.status(404).send("Bad request - Genre already present");

  // otherwise push
  const genre1 = {
    id: req.params.id,
    name: req.body.name
  };
  genres.push(genre1);
  res.send(genre1);
});

app.put("/api/genres/:id", (req, res) => {
  //find the genres
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found");
  // validate the input
  const result = validationInput(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  //update the genre

  genre.name=req.body.name;

  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
 //find the genres
 const genre = genres.find(c => c.id === parseInt(req.params.id));
 if (!genre) return res.status(404).send("Genre not found");
 //delete the genre
 const index=genres.indexOf(genre);
genres.splice(index,1);
res.send(genre);

});

function validationInput(input) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(input, schema);
}

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on port ${port}`));
