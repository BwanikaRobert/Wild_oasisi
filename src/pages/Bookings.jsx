import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  useEffect(function () {
    fetch("http://192.168.137.111:8000/api/users/", {
      method: "POST",
      body: JSON.stringify({
        username: "hjjsjjsjss",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => console.log(res));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All bookings</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Bookings;
