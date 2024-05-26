import { useParams } from "react-router-dom";

const Sample = () => {
  const params = useParams();
  console.log(params);
  return <div>Sample</div>;
};

export default Sample;
