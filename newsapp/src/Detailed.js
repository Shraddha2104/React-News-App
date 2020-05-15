import React, { Component } from "react";
import axios from "axios";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
import { css } from "glamor";

//import views
import DetailedChild from "./DetailedChild";
import CommentBox from "./CommentBox";
import ToggleBox from "./ToggleBox";
import Loader from "./Loader";
import DetailedShare from "./DetailedShare";

//rendering detailed version of news
class Detailed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      g_results: [], //guardian news
      n_results: [], //nyt news
      isLoading: false,
      error: null,
      bookmarked: false,
    };
    this.bookmarkItem = this.bookmarkItem.bind(this);
    this.deleteBookmarkItem = this.deleteBookmarkItem.bind(this);
    this.checkBookmarked = this.checkBookmarked.bind(this);
  }

  //styling toasts
  notify = (title) => {
    toast.dismiss();
    toast(title, {
      delay: 180,
      autoClose: 2200,
      className: css({
        background: "white !important",
        color: "black",
        textAlign: "left",
        fontSize: "15px",
      }),
    });
  };

  //bookmarking news item
  bookmarkItem(obj) {
    this.setState({ bookmarked: !this.state.bookmarked });
    var det = {
      category: this.props.category,
      obj: obj,
      sectionId: this.props.sectionId,
    };
    //inserting detailed object in bookmarks
    if (localStorage) {
      var articles;
      if (!localStorage["articles"]) articles = [];
      else articles = JSON.parse(localStorage["articles"]);
      if (!(articles instanceof Array)) articles = [];
      articles.push(det);
      localStorage.setItem("articles", JSON.stringify(articles));
    }
  }

  //check if article is already bookmarked
  checkBookmarked(obj) {
    var det = {
      category: this.props.category,
      obj: obj,
      sectionId: this.props.sectionId,
    };
    if (localStorage) {
      var articles;
      if (!localStorage["articles"]) articles = [];
      else articles = JSON.parse(localStorage["articles"]);

      var exist_check = false;
      var cat_chk = det.category;
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].category == cat_chk && cat_chk == "NYT") {
          if (articles[i].obj.docs[0].web_url == det.obj.docs[0].web_url)
            exist_check = true;
        } else if (articles[i].category == cat_chk && cat_chk == "guardian") {
          if (articles[i].obj.content.id == det.obj.content.id)
            exist_check = true;
        }
      }
      if (exist_check == true) {
        this.setState({ bookmarked: true });
      }
    }
  }
  //deleting bookmarked news item from local storage
  deleteBookmarkItem() {
    this.setState({ bookmarked: !this.state.bookmarked });
    if (localStorage) {
      var articles;
      if (!localStorage["articles"]) articles = [];
      else articles = JSON.parse(localStorage["articles"]);
      if (!(articles instanceof Array)) articles = [];

      articles.splice(articles.length - 1, 1);
      localStorage.setItem("articles", JSON.stringify(articles));
    }
    //re-render on deleting
    this.forceUpdate();
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    //making API calls
    axios
      .post("https://usc6352156.wl.r.appspot.com/detailed-nyt", {
        id: this.props.id,
      })
      .then((res) => {
        this.setState({
          n_results: res.data.response,
          isLoading: false,
        });
        this.checkBookmarked(this.state.n_results);
      })
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
    axios
      .post("https://usc6352156.wl.r.appspot.com/detailed-guardian", {
        id: this.props.id,
      })
      .then((res) => {
        this.setState({
          g_results: res.data.response,
          isLoading: false,
        });
        this.checkBookmarked(this.state.g_results);
      })
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    let img_styles = {
      margin: "0 auto",
      width: "100%",
      height: "70%",
      padding: "5px",
    };

    const { g_results, n_results, isLoading } = this.state;
    if (this.props.category == "guardian") {
      let final_articles = [];
      if (Object.keys(g_results).length != 0) {
        var mainCheck = g_results.content.blocks.main;
        //missing keys handling
        if (mainCheck !== undefined) {
          var assets = g_results.content.blocks.main.elements[0].assets;
          var assets_len = assets.length;
          var img_url;
          var description = g_results.content.blocks.body[0].bodyTextSummary;
          var pdate = g_results.content.webPublicationDate.substring(0, 10);
          var webUrl = g_results.content.webUrl;
          if (assets_len == 0)
            //provide default image if not returned from API
            img_url =
              "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
          else img_url = assets[assets_len - 1].file;
          final_articles.push(
            <div className="container-detailed " key="0">
              <p className="detailed-title">
                <i>{g_results.content.webTitle}</i>
              </p>
              <div className="fluid-container">
                <div class="row ">
                  <p className="detailed-date col-lg-10 col-5">
                    <i>{pdate}</i>
                  </p>
                  <div className="col-lg-1 col-5 ">
                    <DetailedShare
                      title={g_results.content.webTitle}
                      webUrl={webUrl}
                    />
                  </div>
                  <div className=" col-lg-1 col-2">
                    {/* //controlling the bookmark icon styles */}
                    {this.state.bookmarked ? (
                      <FaBookmark
                        className="bookmark1 "
                        data-tip="Bookmark"
                        data-effect="solid"
                        onClick={() => {
                          this.deleteBookmarkItem();
                          this.notify("Deleting " + g_results.content.webTitle);
                        }}
                      />
                    ) : (
                      <FaRegBookmark
                        className="bookmark1"
                        data-tip="Bookmark"
                        data-effect="solid"
                        onClick={() => {
                          this.bookmarkItem(g_results);
                          this.notify("Saving " + g_results.content.webTitle);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <ReactTooltip place="top" data-effect="solid" />
              <img
                src={img_url}
                className="container__image"
                style={img_styles}
              />
              {/* toggle between "Show More" and "Show less" */}
              <div className="container-detailed__text">
                <p className="detailed-description">
                  <ToggleBox>
                    <DetailedChild description={description} />
                  </ToggleBox>
                </p>
              </div>
            </div>
          );
        }
      }

      if (isLoading) {
        return <Loader />;
      }
      return (
        <div>
          <div className="guardian-news">{final_articles}</div>
          <CommentBox />
        </div>
      );
    } else {
      let final_articles = [];
      if (Object.keys(n_results).length != 0) {
        webUrl = n_results.docs[0].web_url;
        var multiCheck = n_results.docs[0].multimedia;
        if (Object.keys(multiCheck).length != 0)
          img_url =
            "https://www.nytimes.com/" + n_results.docs[0].multimedia[0].url;
        //provide default image if not returned by API
        else
          img_url =
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";

        final_articles.push(
          <div className="container-detailed" key="0">
            <p className="detailed-title">
              <i>{n_results.docs[0].headline.main}</i>
            </p>
            <div className="fluid-container">
              <div class="row ">
                <p className="detailed-date col-lg-10 col-5">
                  <i>{n_results.docs[0].pub_date.substring(0, 10)}</i>
                </p>
                <div className="col-lg-1 col-5">
                  <DetailedShare
                    webUrl={webUrl}
                    title={n_results.docs[0].headline.main}
                  />
                </div>
                <div className=" col-lg-1 col-2">
                  {this.state.bookmarked ? (
                    <FaBookmark
                      className="bookmark1"
                      data-tip="Bookmark"
                      data-effect="solid"
                      onClick={() => {
                        this.deleteBookmarkItem();
                        this.notify(
                          "Deleting " + n_results.docs[0].headline.main
                        );
                      }}
                    />
                  ) : (
                    <FaRegBookmark
                      className="bookmark1"
                      data-tip="Bookmark"
                      data-effect="solid"
                      onClick={() => {
                        this.bookmarkItem(n_results);
                        this.notify(
                          "Saving " + n_results.docs[0].headline.main
                        );
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <img
              src={img_url}
              className="container__image"
              style={img_styles}
            />
            <div className="container-detailed__text">
              <p className="detailed-description">
                <ToggleBox>
                  <DetailedChild description={n_results.docs[0].abstract} />
                </ToggleBox>
              </p>
            </div>
          </div>
        );
      }
      if (isLoading) {
        return <Loader />;
      }
      return (
        <div>
          <div className="guardian-news">{final_articles}</div>
          <ReactTooltip place="top" />
          <CommentBox />
        </div>
      );
    }
  }
}
export default Detailed;
