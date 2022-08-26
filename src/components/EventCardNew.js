import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { default as Box, default as Typography } from '@material-ui/core/Typography';
import React from "react";
import { Link } from "react-router-dom";

function EventCardNew({ event }) {
  return (
    <Card data-cy='event-card' style={{ height: 330 }}>
      <CardActionArea
        component={Link} to={"/event/" + event._id}
      >
        {!event.imgURL ?
          <CardMedia
            component="img"
            alt="Event image"
            height="140"
            data-src="https://yt3.ggpht.com/ytc/AAUvwnjO2_Wkoejhofk003Y3YcS09G0-JyrbQM8ybTIikw=s900-c-k-c0x00ffffff-no-rj"
            title={event.title}
          /> :
          <CardMedia
            component="img"
            alt="Event image"
            height="140"
            data-src={event.imgURL}
            title={event.title}
          />
        }
        <CardContent>
          <Box style={{ height: 100 }}>
            <Typography data-cy='event-title' gutterBottom variant="h5" component="h2" style={{ color: "#4e5154" }}>
              {event.title}
            </Typography>
            <Typography data-cy='event-description' variant="body2" color="textSecondary" component="p">
              {event.date == null ? "活動日期： null" : (event.dateEnd == null ? "活動日期： " + event.date.slice(0, 10) :
                "活動日期： " + event.date.slice(0, 10) + "~" + event.dateEnd.slice(0, 10))}<br />
              {"集合地點： " + event.location}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          分享
        </Button>
        <Button
          data-cy='more-info'
          size="small" color="primary"
          component={Link} to={"/event/" + event._id}
        >
          更多資訊
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventCardNew;