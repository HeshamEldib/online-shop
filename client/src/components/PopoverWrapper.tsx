import { useDispatch } from "react-redux";
import { showAndHidden } from "../redux/slices/PopoverSlice";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./popover-wrapper.css";

export default function PopoverWrapper() {
  const dispatch = useDispatch();

  return (
    <div className="popover-wrapper">
      <div className="popover-content">
        <PopoverHeader />
        <PopoverInner />
        <PopoverFooter />
      </div>

      <div
        className="popover-declarative"
        onClick={() => dispatch(showAndHidden())}
      ></div>
    </div>
  );
}

function PopoverHeader() {
  return (
    <header className="popover-header">
      <h4>Choose your location</h4>
    </header>
  );
}

function PopoverInner() {
  return (
    <div className="popover-inner">
      <InnerTop />
      <InnerBottom />
    </div>
  );
}

function InnerTop() {
  const dispatch = useDispatch();

  return (
    <div className="popover-inner-top">
      <p>
        Delivery options and delivery speeds may vary for different locations
      </p>
      <Link
        to="/signin"
        className="main-button"
        onClick={() => dispatch(showAndHidden())}
      >
        Sign in to see your addresses
      </Link>
    </div>
  );
}

function InnerBottom() {
  return (
    <div className="popover-inner-bottom">
      <Bar title="or enter a US zip code" />
      <ZipCode />
      <Bar title="or" />
      <Option />
    </div>
  );
}

function ZipCode() {
  return (
    <form action="" className="zip-code d-flex align-items-center">
      <input type="text" placeholder="zip code" maxLength={5} />
      <Button className="main-button">Apply</Button>
    </form>
  );
}

function Option() {
  return (
    <div className="popover-option">
      <Form.Select aria-label="Default select">
        <option value="egypt">Egypt</option>
        <option value="1">one</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
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

function PopoverFooter() {
  const dispatch = useDispatch();

  return (
    <div className="popover-footer">
      <Button className="main-button" onClick={() => dispatch(showAndHidden())}>
        Done
      </Button>
    </div>
  );
}
