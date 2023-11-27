import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const HeroSection = () => {
  return (
    <Paper>
      <Container className="py-10" maxWidth={"xl"}>
        <Grid container spacing={12}>
          <Grid item xs={12} md={6}>
            <Box
              component={"img"}
              src="https://i.ibb.co/PgpS7n8/istockphoto-1316145932-1024x1024.jpg"
              sx={{ maxWidth: "100%" }}></Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="text-orange-500" variant="h2" sx={{ mb: 2 }}>
              We offer breakfast, lunch and dinner at low prices
            </Typography>
            <Typography variant="h6">
              Food is any substance consumed by an organism for nutritional
              support. Food is usually of plant, animal, or fungal origin and
              contains essential nutrients such as carbohydrates, fats,
              proteins, vitamins, or minerals.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default HeroSection;
