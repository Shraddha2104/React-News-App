import { Icon } from "@iconify/react";
import mdShare from "@iconify/icons-ion/md-share";
import React from "react";
import { useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import Modal from "react-bootstrap/Modal";

//rendering react-share modal
const Share = (props) => {
  const [show, setShow] = useState(false);
  const hideOutModal = () => {
    setShow(false);
  };
  return (
    <>
      <Icon
        icon={mdShare}
        className="icon"
        onClick={(event) => {
          setShow(true);
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
        }}
      />

      <div
        onClick={(event) => {
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Modal
          show={show}
          onHide={hideOutModal}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            {props.category == "GUARDIAN" || props.category == "NYTimes" ? (
              <Modal.Title
                id="example-custom-modal-styling-title"
                className="titleShare"
              >
                {props.category}
                <br />
                {props.title}
              </Modal.Title>
            ) : (
              <Modal.Title
                id="example-custom-modal-styling-title"
                className="titleShare"
              >
                {props.title}
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <p className="share">Share via</p>
            <p className="social">
              <FacebookShareButton
                url={props.url}
                className="fb"
                hashtag={"#CSCI_571_NewsApp"}
              >
                <FacebookIcon size={56} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={props.url}
                className="twit"
                hashtags={["CSCI_571_NewsApp"]}
              >
                <TwitterIcon size={56} round />
              </TwitterShareButton>
              <EmailShareButton
                url={props.url}
                title={props.title}
                className="email"
                subject={"#CSCI_571_NewsApp"}
              >
                <EmailIcon size={56} round />
              </EmailShareButton>
            </p>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default Share;
