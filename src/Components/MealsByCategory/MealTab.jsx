/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const MealTab = ({ item }) => {
  // console.log(item);
  return (
  <div >
  <div className=" mt-10 mx-5" >
      <Card className="mx-auto">
        <CardMedia
          sx={{ height: 140 }}
          image={item?.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item?.mealName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item?.description?.slice(0, 170)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to={`/viewsDetails/${item?._id}`}>View Details</Link>
          </Button>
          <Rating name="read-only" value={item?.Rating} readOnly />
          <Button size="small">Price:{item?.price}</Button>
        </CardActions>
      </Card>
    </div></div>
    
  );
};

export default MealTab;
