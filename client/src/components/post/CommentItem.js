import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Col, Row, Avatar, Button } from "antd";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  createMarkup = htmlcode => ({
    __html: htmlcode
  });

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <Card style={{ margin: "20px 20px" }}>
        <Row>
          <Col span={4}>
            <a href="profile.html">
              <Avatar src={comment.avatar} alt="avatar" />
            </a>
            &nbsp;&nbsp;&nbsp;
            <a>{comment.name}</a>
          </Col>
          <Col span={20}>
            <span dangerouslySetInnerHTML={this.createMarkup(comment.text)} />
            {comment.user === auth.user.id ? (
              <Button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="danger"
                style={{ float: "right" }}
              >
                删除
              </Button>
            ) : null}
          </Col>
        </Row>
      </Card>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
