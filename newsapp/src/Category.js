import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

//import views
import Detailed from "./Detailed";
import Share from "./Share";
import Loader from "./Loader";

//rendering category wise news
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      g_results: [], //guardian news
      n_results: [], //nyt news
      isLoading: false,
      error: null,
      showComponent: false,
      showCards: true,
    };
    this.linkToGuardianNews = this.linkToGuardianNews.bind(this);
    this.linkToNYTNews = this.linkToNYTNews.bind(this);
    this.renderGuardian = this.renderGuardian.bind(this);
    this.renderNYT = this.renderNYT.bind(this);
  }
  linkToGuardianNews(id) {
    localStorage.setItem("id", id);
    this.setState({
      showComponent: true,
      showCards: false,
    });
  }
  linkToNYTNews(id, sectionId) {
    localStorage.setItem("id", id);
    localStorage.setItem("sectionId", sectionId);

    this.setState({
      showComponent: true,
      showCards: false,
    });
  }
  //render guardian detailed version
  renderGuardian(category) {
    var retrievedObject = localStorage.getItem("id");
    this.props.func(false);
    if (this.state.showComponent)
      return (
        <Router>
          <Redirect to={"/article/" + retrievedObject} href="/article" />
          <Route
            path="/article"
            render={() => <Detailed id={retrievedObject} category={category} />}
          />
        </Router>
      );
  }
  //render NYT detailed version
  renderNYT(category) {
    var retrievedObject = localStorage.getItem("id");
    var sectionId = localStorage.getItem("sectionId");
    this.props.func(false);

    if (this.state.showComponent)
      return (
        <Router>
          <Redirect to={"/article/" + retrievedObject} href="/article" />
          <Route
            path="/article"
            render={() => (
              <Detailed
                id={retrievedObject}
                sectionId={sectionId}
                category={category}
              />
            )}
          />
        </Router>
      );
  }
  componentDidMount() {
    this.props.func(true);
    this.setState({ isLoading: true });

    //API calls
    if (this.props.category_type == "home") {
      axios
        .get("https://usc6352156.wl.r.appspot.com/nyc-home", {})
        .then((res) =>
          this.setState({
            n_results: res.data.results,
            isLoading: false,
          })
        )
        .catch((error) =>
          this.setState({
            error,
            isLoading: false,
          })
        );
      axios
        .get("https://usc6352156.wl.r.appspot.com/guardian-home", {})
        .then((res) =>
          this.setState({
            g_results: res.data.response.results,
            isLoading: false,
          })
        )
        .catch((error) =>
          this.setState({
            error,
            isLoading: false,
          })
        );
    } else {
      axios
        .get(
          "https://usc6352156.wl.r.appspot.com/" +
            this.props.category_type +
            "-nyt",
          {}
        )
        .then((res) =>
          this.setState({
            n_results: res.data.results,
            isLoading: false,
          })
        )
        .catch((error) =>
          this.setState({
            error,
            isLoading: false,
          })
        );
      axios
        .get(
          "https://usc6352156.wl.r.appspot.com/" +
            this.props.category_type +
            "-guardian",
          {}
        )
        .then((res) =>
          this.setState({
            g_results: res.data.response.results,
            isLoading: false,
          })
        )
        .catch((error) =>
          this.setState({
            error,
            isLoading: false,
          })
        );
    }
  }
  render() {
    var { g_results, n_results, isLoading } = this.state;
    function setSectionColor(sectionId) {
      var color;
      if (sectionId == "sport" || sectionId == "sports")
        color = "rgb(243,191,78)";
      else if (sectionId == "business") color = "rgb(80,157,234)";
      else if (sectionId == "technology") color = "rgb(206,220,75)";
      else if (sectionId == "politics") color = "rgb(63,148,137)";
      else if (sectionId == "world") color = "rgb(124,79,251)";
      else color = "rgb(110,117,124)";
      return color;
    }
    function defineSectionStyles(sectionId) {
      var section_style;
      if (
        sectionId == "technology" ||
        sectionId == "sport" ||
        sectionId == "sports"
      ) {
        section_style = {
          fontSize: "14px",
          backgroundColor: color,
          textAlign: "center",
          float: "right",
          color: "black",
          borderRadius: "5px",
        };
      } else {
        section_style = {
          fontSize: "14px",
          backgroundColor: color,
          textAlign: "center",
          float: "right",
          color: "white",
          borderRadius: "5px",
        };
      }
      return section_style;
    }
    let img_styles = {
      width: "100%",
      height: "100%",
      borderRadius: "5px",
      padding: "5px",
      backgroundColor: "white",
      margin: "0 auto",
      boxShadow: "0 0 5px 0 #C6C4C4",
    };
    if (this.props.category == "guardian") {
      let final_articles = [];

      var count = 0;
      for (var i = 0; i < g_results.length; i++) {
        //max 10 articles to display
        if (count == 10) break;
        var sectionId = g_results[i].sectionId;
        var color = setSectionColor(sectionId);
        var section_style = defineSectionStyles(sectionId);

        var mainCheck = g_results[i].blocks.main;
        //handling missing keys
        if (mainCheck !== undefined) {
          count++;
          var assets = g_results[i].blocks.main.elements[0].assets;
          var assets_len = assets.length;
          var img_url;
          var description = g_results[i].blocks.body[0].bodyTextSummary;
          var short = description.split(" ").slice(0, 100).join(" ");
          sectionId = sectionId.toUpperCase();
          var pdate = g_results[i].webPublicationDate.substring(0, 10);
          var webUrl = g_results[i].webUrl;
          var id = g_results[i].id;
          if (assets_len == 0)
            //provide default image if not present
            img_url =
              "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
          else img_url = assets[assets_len - 1].file;
          final_articles.push(
            <div
              className="fluid-container containerer"
              key={i}
              onClick={function (id) {
                return function () {
                  this.linkToGuardianNews(id);
                }.bind(this);
              }.bind(this)(id)}
            >
              <div class="row">
                <div class="col-lg-3 col-12  padder">
                  <img src={img_url} style={img_styles} />
                </div>
                <div class="col-lg-9 col-12 ">
                  <div className="container__text">
                    <p className="title">
                      <b>
                        <i>{g_results[i].webTitle}</i>
                      </b>
                      {/* Call the share component */}
                      <Share title={g_results[i].webTitle} url={webUrl} />
                    </p>
                    <p className="description">{short}</p>
                    <p className="date ">
                      <i>{pdate}</i>
                    </p>
                    <span
                      className="badge badge-pill badge-primary "
                      style={section_style}
                    >
                      <b>{sectionId}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }

      if (isLoading) {
        // call the Loading component
        return <Loader />;
      }
      if (this.state.showCards)
        return (
          <div>
            <div className="guardian-news">{final_articles}</div>
          </div>
        );
      else return <div>{this.renderGuardian("guardian")}</div>;
    } else {
      let final_articles = [];
      let col = {
        width: "100%",
      };
      var count = 0;
      for (var i = 0; i < n_results.length; i++) {
        if (count == 10) break;
        var sectionId = n_results[i].section;
        var url;
        var webUrl = n_results[i].url;
        var multiCheck = n_results[i].multimedia;

        if (multiCheck != null) url = n_results[i].multimedia[0].url;
        // provide default image
        else
          url =
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";

        var color = setSectionColor(sectionId);
        count++;

        var section_style = defineSectionStyles(sectionId);
        sectionId = sectionId.toUpperCase();

        var date = n_results[i].published_date;
        var new_date = date.substring(0, 10);
        final_articles.push(
          <div
            className="fluid-container container"
            key={i}
            onClick={function (webUrl, sectionId) {
              return function () {
                this.linkToNYTNews(webUrl, sectionId);
              }.bind(this);
            }.bind(this)(webUrl, sectionId)}
          >
            <div class="row">
              <div class="col-lg-3 col-12  padder">
                <img src={url} style={img_styles}></img>
              </div>
              <div class="col-lg-9 col-12 ">
                <div className="container__text" style={col}>
                  <p className="title">
                    <b>
                      <i>{n_results[i].title}</i>
                    </b>
                    <Share url={webUrl} title={n_results[i].title} />
                  </p>
                  <p className="description">{n_results[i].abstract}</p>
                  <p className="date">
                    <i>{new_date}</i>
                  </p>
                  <span
                    className="badge badge-pill badge-primary"
                    style={section_style}
                  >
                    <b>{sectionId}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (isLoading) {
        return <Loader />;
      }

      if (this.state.showCards)
        return (
          <div>
            <div className="nyt-news">{final_articles}</div>
          </div>
        );
      else return <div>{this.renderNYT("NYT")}</div>;
    }
  }
}

export default Category;
