import React, { Component } from 'react';
import axios from 'axios';
import Share from './Share'
import BounceLoader from 'react-spinners/BounceLoader';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Detailed from './Detailed'
//rendering world news
class World extends Component {

  constructor(props) {
    super(props);
    this.state = {
      g_results1: [],
      g_results2: [],
      isLoading: false,
      error: null,
      showComponent: false,
      showCards: true,
    };
    this.linktoArticles = this.linktoArticles.bind(this);
    this.linktoArticles1 = this.linktoArticles1.bind(this);
    this.renderDet = this.renderDet.bind(this);
    this.renderDetNYT = this.renderDetNYT.bind(this);
    this.isset = this.isset.bind(this);
  }
  linktoArticles(id) {
   
    localStorage.setItem('id', id);
    this.setState({
      showComponent: true,
      showCards: false,

    });
  }
  linktoArticles1(id, sectionId) {
  
    localStorage.setItem('id', id);
    localStorage.setItem('sectionId', sectionId);
   
    this.setState({
      showComponent: true,
      showCards: false,

    });
  }
  renderDet(category) {

    
    var retrievedObject = localStorage.getItem('id');
    this.props.func(false);
    if (this.state.showComponent)
      return (<Router>
        <Redirect to={"/article/" + retrievedObject} href="/article" />
        <Route path="/article" render={() => <Detailed id={retrievedObject} category={category} />} />
      </Router>);
  }
  renderDetNYT(category) {
   
    var retrievedObject = localStorage.getItem('id');
    var sectionId = localStorage.getItem('sectionId');
    
    this.props.func(false);
    if (this.state.showComponent)
      return (<Router>
        <Redirect to={"/article/" + retrievedObject} href="/article" />
        <Route path="/article" render={() => <Detailed id={retrievedObject} sectionId={sectionId} category={category} />} />
      </Router>);
  }
  isset(fn) {
    var value;
    try {
      value = fn();
    } catch (e) {
      return false;
    } finally {
      return true;
    }
  };
  componentDidMount() {
   
    this.props.func(true);
    this.setState({ isLoading: true });
    //nyt
    axios.get('https://usc6352156.wl.r.appspot.com/world-nyt', {
    })
      .then(res => this.setState({
        g_results2: res.data.results,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
    axios.get('https://usc6352156.wl.r.appspot.com/world-guardian', {
    })
      .then(res => this.setState({
        g_results1: res.data.response.results,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));

  }
  render() {

    var { g_results1, g_results2, isLoading } = this.state;
    function setSectionColor(sectionId) {
      var color;
      if (sectionId == 'sport' || sectionId == 'sports')
        color = 'rgb(243,191,78)';
      else if (sectionId == 'business')
        color = 'rgb(80,157,234)';
      else if (sectionId == 'technology')
        color = 'rgb(206,220,75)';
      else if (sectionId == 'politics')
        color = 'rgb(63,148,137)';
      else if (sectionId == 'world')
        color = 'rgb(124,79,251)';
      else
        color = 'rgb(110,117,124)'
      return color;
    }
  
    if (this.props.category == 'guardian') {
     
      let final_articles = []
      let img_styles = {
       
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: 'white',
        margin: '0 auto',
        
        boxShadow: '0 0 5px 0 #C6C4C4',

      };
      var count = 0;
      for (var i = 0; i < g_results1.length; i++) {
        if (count == 10)
          break;
        var sectionId = g_results1[i].sectionId;
        var color = setSectionColor(sectionId);
        let section_style;
        if (sectionId == 'technology' || sectionId == 'sport') {
          section_style = {
            
            fontSize: '14px',
            backgroundColor: color,
            textAlign: 'center',
            float: 'right',
            color: 'black',
            borderRadius: '5px',

          }
        }
        else {
          section_style = {
           
            fontSize: '14px',
            backgroundColor: color,
            textAlign: 'center',
            float: 'right',
            color: 'white',
            borderRadius: '5px',

          }
        }
        var bodyCheck = g_results1[i].blocks.body;

        if (bodyCheck !== undefined)
          description = g_results1[i].blocks.body[0].bodyTextSummary;

        var mainCheck = g_results1[i].blocks.main;
        var pdate = g_results1[i].webPublicationDate.substring(0, 10)
        var webUrl = g_results1[i].webUrl;
        var webTitle = g_results1[i].webTitle;
        var id = g_results1[i].id;
        console.log(mainCheck)
        if (mainCheck !== undefined && pdate !== undefined && webUrl !== undefined && id !== undefined && webTitle !== undefined) {
          count++;
          var assets = g_results1[i].blocks.main.elements[0].assets;
          var assets_len = assets.length;
          var img_url;
          var description = g_results1[i].blocks.body[0].bodyTextSummary;
          var short = description.split(' ').slice(0, 100).join(' ');
          sectionId = sectionId.toUpperCase();

          if (assets_len == 0)
            img_url = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
          else
            img_url = assets[assets_len - 1].file;
          final_articles.push(
            <div className="fluid-container containerer" key={i} onClick={function (id) {
              return function () {
                this.linktoArticles(id);
              }.bind(this)
            }.bind(this)(id)}>
              <div class="row" >
                <div class="col-lg-3 col-12  padder">
                  <img src={img_url} style={img_styles} /></div>
                <div class="col-lg-9 col-12 ">
                  <div className="container__text">
                    <p className="title"><b><i>{webTitle}</i></b>
                      <Share title={webTitle} url={webUrl} />
                    </p>
                    <p className="description">{short}</p>
                    <p className="date "><i>{pdate}</i></p><span className="badge badge-pill badge-primary " style={section_style}><b>{sectionId}</b></span></div></div></div></div>);

        }
      }
      // 
      if (isLoading) {


        return (<div className="sweet-loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <BounceLoader
            size={40} color="#123ABC" /><br />
          <h4><b>Loading</b></h4>
        </div>);
      }
      if (this.state.showCards)
        return (
          <div>

            <div className="guardian-news">{final_articles}<br></br> </div>
          </div>
        );
      else
        return (
          <div>
            {this.renderDet("guardian")}

          </div>);


    }
    else {
      let final_articles = []
     
      let img_styles = {
        // margin: '7px',
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: 'white',
        margin: '0 auto',
        boxShadow: '0 0 5px 0 #C6C4C4',

      };
      let col = {
        width: '100%',
      }
      var count = 0;
      for (var i = 0; i < g_results2.length; i++) {
        if (count == 10)
          break;
        var sectionId = g_results2[i].section;
        var url;
        var webUrl = g_results2[i].url;
        var multiCheck = g_results2[i].multimedia
        if (multiCheck != null)
          url = g_results2[i].multimedia[0].url;
        else
          url = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

        var color = setSectionColor(sectionId);
        count++;
        let section_style;
        if (sectionId == 'technology' || sectionId == 'sports') {
          section_style = {

            fontSize: '14px',
            backgroundColor: color,
            textAlign: 'center',
            float: 'right',
            color: 'black',
            borderRadius: '5px',

          }
        }

        else {
          section_style = {

            fontSize: '14px',
            backgroundColor: color,
            textAlign: 'center',
            float: 'right',
            // marginRight: '2%',
            color: 'white',
            borderRadius: '5px',

          }
        }
        sectionId = sectionId.toUpperCase();
        var date = g_results2[i].published_date;
        var new_date = date.substring(0, 10);
        final_articles.push(
          <div className="fluid-container container" key={i} onClick={function (webUrl, sectionId) {
            return function () {
              this.linktoArticles1(webUrl, sectionId);

            }.bind(this)
          }.bind(this)(webUrl, sectionId)}>
            <div class="row" >
              <div class="col-lg-3 col-12  padder">
                <img src={url} style={img_styles}></img></div>
              <div class="col-lg-9 col-12 ">
                <div className="container__text" style={col}>
                  <p className="title"><b><i>{g_results2[i].title}</i></b>
                    <Share url={webUrl} title={g_results2[i].title} />
                  </p>
                  <p className="description">{g_results2[i].abstract}</p>
                  <p className="date"><i>{new_date}</i></p><span className="badge badge-pill badge-primary" style={section_style}><b>{sectionId}</b></span>
                </div></div></div>
          </div>)
      }

      if (isLoading) {
        return (<div className="sweet-loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <BounceLoader
            size={40} color="#123ABC" /><br />
          <h4><b>Loading</b></h4>
        </div>);
      }

      if (this.state.showCards)
        return (
          <div>

            <div className="nyt-news">{final_articles}<br></br> </div>
          </div>
        );
      else
        return (
          <div>
            {this.renderDetNYT("NYT")}

          </div>);

    }
  }
};

export default World;  