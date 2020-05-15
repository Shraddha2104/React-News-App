import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

//rendering detailed page social media icons
class DetailedShare extends React.Component {
  componentDidMount() {}

  render() {
    var { webUrl, title } = this.props;
    return (
      <div>
        <FacebookShareButton
          url={webUrl}
          data-effect="solid"
          data-tip="Facebook"
        >
          <FacebookIcon size={28} round />
        </FacebookShareButton>
        <TwitterShareButton url={webUrl} data-tip="Twitter" data-effect="solid">
          <TwitterIcon size={28} round />
        </TwitterShareButton>
        <EmailShareButton
          url={webUrl}
          data-tip="Email"
          data-effect="solid"
          title={title}
        >
          <EmailIcon size={28} round />
        </EmailShareButton>
      </div>
    );
  }
}
export default DetailedShare;
