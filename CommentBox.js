import React from 'react';
import commentBox from 'commentbox.io';

class CommentBox extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('5649746060378112-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {
        let comment_styles={
            margin: '0 auto',
            width:'95%',
        }
        return (
            <div className="commentbox" style={comment_styles}/>
        );
    }
}
export default CommentBox;