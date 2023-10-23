import { useDispatch } from "react-redux";
import { showAndHidden } from "../redux/slices/PopoverSlice";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./popover-wrapper.css"

export default function PopoverWrapper() {
  const dispatch = useDispatch();

  return (
    <div className="popover-wrapper">
      <div className="popover-content">
        <header className="popover-header">
          <h4>Choose your location</h4>
        </header>
        <div className="popover-inner">
          <div className="popover-inner-top">
            <p>
              Delivery options and delivery speeds may vary for different
              locations
            </p>
            <Link
              to="/register"
              className="but-popover"
              onClick={() => dispatch(showAndHidden())}
            >
              Sign in to see your addresses
            </Link>
          </div>
          <div className="popover-inner-bottom">
            <Bar title="or enter a US zip code" />
            <form action="" className="zip-code d-flex align-items-center">
              <input type="text" placeholder="zip code" maxLength={5} />
              <Button className="but-popover">Apply</Button>
            </form>
            <Bar title="or" />
            <div className="popover-option">
              <Form.Select aria-label="Default select">
                <option value="egypt">Egypt</option>
                <option value="1">one</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="popover-footer">
          <Button
            className="but-popover"
            onClick={() => dispatch(showAndHidden())}
          >
            Done
          </Button>
        </div>
      </div>

      <div
        className="popover-declarative"
        onClick={() => dispatch(showAndHidden())}
      ></div>
    </div>
  );
}

interface BarProps {
  title: string;
}
function Bar({ title }: BarProps) {
  return (
    <div className="bar">
      <span>{title}</span>
    </div>
  );
}
