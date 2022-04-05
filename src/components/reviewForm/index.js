import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import MenuItem from "@mui/material/MenuItem";

const ratings = [
  {
    value: 5,
    label: "Excellent",
  },
  {
    value: 4,
    label: "Good",
  },
  {
    value: 3,
    label: "Average",
  },
  {
    value: 2,
    label: "Poor",
  },
  {
    value: 0,
    label: "Terrible",
  },
];

const ReviewForm = ({ movie, history }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const onSubmit = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    context.addReview(movie, review);
  };

  return (
    <Box component="div" sx={{
        marginTop: '2em',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>
      <form
        sx={{
            width: "100%",
            "& > * ": {
              marginTop: "2em",
            }}}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          sx={{ width: "40ch" }}
          variant="outlined"
          margin="normal"
          required
          id="author"
          label="Author's name"
          name="author"
          autoFocus
          inputRef={register({ required: "Author name required" })}
        />
        {errors.author && (
          <Typography variant="h6" component="p">
            {errors.author.message}
          </Typography>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="content"
          label="Review text"
          id="content"
          multiline
          rows={10}
          inputRef={register({
            required: "No review text",
            minLength: { value: 10, message: "Review is too short" },
          })}
        />
        {errors.content && (
          <Typography variant="h6" component="p">
            {errors.content.message}
          </Typography>
        )}
        <TextField
          id="select-rating"
          select
          variant="outlined"
          label="Rating Select"
          value={rating}
          onChange={handleRatingChange}
          helperText="Don't forget your rating"
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{marginRight: '2em'}}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={{marginRight: '2em'}}
            onClick={() => {
              reset({
                author: "",
                content: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;