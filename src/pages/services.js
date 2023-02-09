import Base from "../components/Base";

function Services() {
  return (
    <Base
      title="Services we provide"
      description="In this page we will discuss about the services that we provide."
      buttonEnabled={true}
      buttonLink="/"
      buttonType="warning"
      buttonText="Home"
    >
      <div>This is Services page</div>
    </Base>
  );
}

export default Services;
