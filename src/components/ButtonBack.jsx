import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function ButtonBack() {
    const navigator = useNavigate();

  return (
    <Button
      className="back"
      onClick={(e) => {
        e.preventDefault();
        navigator(-1);
      }}
    >
      Back
    </Button>
  );
}
