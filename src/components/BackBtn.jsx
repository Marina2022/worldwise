import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";

const BackBtn = ({url}) => {
  const navigate = useNavigate()
  return (
    <Button type='back' onClick={
      ()=> {
        if (url) {
          navigate(url)
        } else navigate(-1)
      }
    }>&larr; Back</Button>
  );
};

export default BackBtn;
