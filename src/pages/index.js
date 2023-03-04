import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Base from "../components/Base";
import axios from "axios";
import Store from "../components/users/Store";
function Index() {
  function showSuccessToast() {
    console.log("success toast");
    // toast.success("This is success message !!");
    toast.warn("this is error message");
  }

  const getDataFromServer = () => {
    toast.info("Getting data from server");

    axios
      .get("http://localhost:9090/users")
      .then((response) => {
        console.log(response.data);
        toast.success("request done");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };

  return (
    <Base
      title="Shop what you need"
      description={
        "Welcome to Trending Store, We provide best items as you need. "
      }
      buttonEnabled={true}
      buttonText="Start Shoping "
      buttonType="primary"
      buttonLink="/store"
    >
      <h1>Working on home page</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
        dolor nostrum ratione dolores eaque repellendus aut tenetur! Vero fugit
        maxime tempore deserunt fuga commodi reprehenderit quae consequuntur eum
        similique aut temporibus eligendi eveniet magnam natus nulla doloribus
        corrupti est, perspiciatis saepe. Labore laborum maiores repellat minima
        nam maxime ratione neque.
      </p>

      <Button variant="success" onClick={showSuccessToast}>
        Tostify Success
      </Button>

      <Button variant="primary" onClick={getDataFromServer}>
        Get data from Fake API
      </Button>
    </Base>
  );
}

export default Index;
