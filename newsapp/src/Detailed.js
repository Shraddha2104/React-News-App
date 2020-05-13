import React, { Component } from 'react';
import axios from 'axios';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, EmailIcon } from "react-share";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip'
import CommentBox from './CommentBox';
import ToggleBox from "./ToggleBox";
import { css } from 'glamor';
import DetailedChild from "./DetailedChild";
//rendering detailed version of news
class Detailed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            g_results1: [],
            g_results2: [],
            isLoading: false,
            error: null,
            bookmarked: false,

        };
        this.bookmarkItem = this.bookmarkItem.bind(this);
        this.delbookmarkItem = this.delbookmarkItem.bind(this);
    }

    notify = (title) => {
        toast.dismiss(); toast(title, {
            delay: 180, autoClose: 2200,

            className: css({
                background: "white !important",
                color: "black",
                textAlign: "left",
                fontSize: "15px"
            })
        });
    }

    bookmarkItem(obj) {

        this.setState({ bookmarked: !this.state.bookmarked })
        var det = {
            category: this.props.category,
            obj: obj,
            sectionId: this.props.sectionId,
        };

        if (localStorage) {
            var articles;
            if (!localStorage['articles'])
                articles = [];
            else articles = JSON.parse(localStorage['articles']);
            if (!(articles instanceof Array)) articles = [];

            articles.push(det);
            localStorage.setItem('articles', JSON.stringify(articles));
        }


    }
    check_dup(obj) {
       
        
         var det = {
            category: this.props.category,
            obj: obj,
            sectionId: this.props.sectionId,
        };
        if (localStorage) {
            var articles;
            if (!localStorage['articles'])
                articles = [];
            else articles = JSON.parse(localStorage['articles']);
           
            var exist_check = false;
            var cat_chk = det.category;
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].category == cat_chk && cat_chk == 'NYT') {
                    if (articles[i].obj.docs[0].web_url == det.obj.docs[0].web_url)
                        exist_check = true;
                }
                else if (articles[i].category == cat_chk && cat_chk == 'guardian') {
                    if (articles[i].obj.content.id == det.obj.content.id)
                        exist_check = true;
                }
            }
            if (exist_check == true) {
                this.setState({ bookmarked: true })


            }
            

        }
    }
    delbookmarkItem() {
        this.setState({ bookmarked: !this.state.bookmarked })
        if (localStorage) {
            var articles;
            if (!localStorage['articles'])
                articles = [];
            else
                articles = JSON.parse(localStorage['articles']);
            if (!(articles instanceof Array))
                articles = [];

            articles.splice(articles.length - 1, 1);
            localStorage.setItem('articles', JSON.stringify(articles));

        }
        this.forceUpdate();
    }
    componentDidMount() {


        this.setState({ isLoading: true });
        axios.post('https://usc6352156.wl.r.appspot.com/detailed-nyt', {
            id: this.props.id

        })
            .then(res => {
                this.setState({
                    g_results2: res.data.response,
                    isLoading: false
                });
                this.check_dup(this.state.g_results2)
            })
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
        axios.post('https://usc6352156.wl.r.appspot.com/detailed-guardian', {
            id: this.props.id

        })
            .then(res => {
                this.setState({
                    g_results1: res.data.response,
                    isLoading: false
                });
                this.check_dup(this.state.g_results1)
            })
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    render() {
        let img_styles = {
            margin: '0 auto',
            width: '100%',
            height: '70%',
            padding: '5px',
        };

        const { g_results1, g_results2, isLoading } = this.state;
        if (this.props.category == 'guardian') {
            let final_articles = []
            if (Object.keys(g_results1).length != 0) {
                var mainCheck = g_results1.content.blocks.main;
                if (mainCheck !== undefined) {
                    var assets = g_results1.content.blocks.main.elements[0].assets;
                    var assets_len = assets.length;
                    var img_url;
                    var description = g_results1.content.blocks.body[0].bodyTextSummary;
                    var pdate = g_results1.content.webPublicationDate.substring(0, 10)
                    var webUrl = g_results1.content.webUrl;
                    if (assets_len == 0)
                        img_url = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                    else
                        img_url = assets[assets_len - 1].file;
                    final_articles.push(<div className="container-detailed " key="0">
                        <p className="detailed-title"><i>{g_results1.content.webTitle}</i></p>
                        <div className="fluid-container">
                            <div class="row ">
                                <p className="detailed-date col-lg-10 col-5"><i>{pdate}</i></p>
                                <div className="col-lg-1 col-5 ">
                                    <FacebookShareButton data-tip="Facebook" data-effect="solid" url={webUrl} >
                                        <FacebookIcon size={28} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton data-tip="Twitter" data-effect="solid" url={webUrl} >
                                        <TwitterIcon size={28} round />
                                    </TwitterShareButton>

                                    <EmailShareButton url={webUrl} data-tip="Email" data-effect="solid" title={g_results1.content.webTitle} >
                                        <EmailIcon size={28} round />
                                    </EmailShareButton>
                                </div>
                                <div className=" col-lg-1 col-2">
                                    {this.state.bookmarked
                                        ? <FaBookmark className="bookmark1 " data-tip="Bookmark" data-effect="solid" onClick={() => { this.delbookmarkItem(); this.notify("Deleting " + g_results1.content.webTitle); }} />
                                        : <FaRegBookmark className="bookmark1" data-tip="Bookmark" data-effect="solid" onClick={() => { this.bookmarkItem(g_results1); this.notify("Saving " + g_results1.content.webTitle); }} />

                                    }
                                </div>
                            </div>
                        </div>


                        <ReactTooltip place="top" data-effect="solid" />
                        <img src={img_url} className="container__image" style={img_styles} />
                        <div className="container-detailed__text">
                            <p className="detailed-description">
                                <ToggleBox title="Show Vehicles">
                                    <DetailedChild description={description} />
                                </ToggleBox></p>
                        </div>
                    </div>);
                }
            }

            if (isLoading) {
                return (<div className="sweet-loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BounceLoader
                        size={40} color="#123ABC" /><br />
                    <h4><b>Loading</b></h4>
                </div>);
            }
            return (
                <div><div className="guardian-news">{final_articles}<br></br></div>  <CommentBox /> </div>
            );
        }
        else {


            let final_articles = []
            if (Object.keys(g_results2).length != 0) {
               
                
                webUrl = g_results2.docs[0].web_url;
                var multiCheck = g_results2.docs[0].multimedia
                if (Object.keys(multiCheck).length != 0)
                    img_url = 'https://www.nytimes.com/' + g_results2.docs[0].multimedia[0].url;
                else
                    img_url = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

                final_articles.push(<div className="container-detailed" key="0">
                    <p className="detailed-title"><i>{g_results2.docs[0].headline.main}</i></p>
                    <div className="fluid-container">
                        <div class="row ">
                            <p className="detailed-date col-lg-10 col-5"><i>{g_results2.docs[0].pub_date.substring(0, 10)}</i></p>
                            <div className="col-lg-1 col-5">
                                <FacebookShareButton url={webUrl} data-effect="solid" data-tip="Facebook"  >
                                    <FacebookIcon size={28} round />
                                </FacebookShareButton>
                                <TwitterShareButton url={webUrl} data-tip="Twitter" data-effect="solid" >
                                    <TwitterIcon size={28} round />
                                </TwitterShareButton>
                                <EmailShareButton url={webUrl} data-tip="Email" data-effect="solid" title={g_results2.docs[0].headline.main} >
                                    <EmailIcon size={28} round />
                                </EmailShareButton>
                            </div>
                            <div className=" col-lg-1 col-2">
                                {this.state.bookmarked
                                    ? <FaBookmark className="bookmark1" data-tip="Bookmark" data-effect="solid" onClick={() => { this.delbookmarkItem(); this.notify("Deleting " + g_results2.docs[0].headline.main); }} />
                                    : <FaRegBookmark className="bookmark1" data-tip="Bookmark" data-effect="solid" onClick={() => { this.bookmarkItem(g_results2); this.notify("Saving " + g_results2.docs[0].headline.main); }} />

                                }
                            </div>

                        </div>
                    </div>

                    <img src={img_url} className="container__image" style={img_styles} />
                    <div className="container-detailed__text">
                        <p className="detailed-description">
                            <ToggleBox title="Show Vehicles">
                                <DetailedChild description={g_results2.docs[0].abstract} />
                            </ToggleBox></p>
                    </div></div>);
            }
            if (isLoading) {
                return (<div className="sweet-loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BounceLoader
                        size={40} color="#123ABC" /><br />
                    <h4><b>Loading</b></h4>
                </div>);
            }
            return (
                <div><div className="guardian-news">{final_articles}<br></br></div>  <ReactTooltip place="top" /><CommentBox />  </div>

            );
        }
    }
};
export default Detailed;