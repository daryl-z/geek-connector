import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setCurrentData, setCurrentPage } from "../../actions/postActions";
import GlobalHeader from "./GlobalHeader";
import IndexContent from "./IndexContent";
import GlobalFooter from "./GlobalFooter";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../common/PrivateRoute";
import AdminRoute from "../common/AdminRoute";
import CreateProfile from "../create-profile/CreateProfile";
import EditProfile from "../edit-profile/EditProfile";
import AddExperience from "../add-credentials/AddExperience";
import AddEducation from "../add-credentials/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../not-found/NotFound";
import MyCloud from "../tagcloud/TagCloud";
import AdminDashboard from "../admin/AdminDashboard";
import TagManage from "../admin/TagManage";

class BasicLayout extends Component {
  state = {
    search: "",
    searchVisible: false
  };

  onSearch = search => {
    const { setCurrentData, setCurrentPage } = this.props;
    this.setState({ search: search.trim() });
    setCurrentData([]);
    setCurrentPage(1);
  };

  changeSearchVisible = value => {
    this.setState({ searchVisible: value });
  };

  render() {
    return (
      <Router>
        <div>
          <Layout>
            <GlobalHeader
              onSearch={this.onSearch}
              searchVisible={this.state.searchVisible}
            />
            <Route
              exact
              path="/"
              render={props => (
                <IndexContent
                  {...props}
                  search={this.state.search}
                  changeSearchVisible={this.changeSearchVisible}
                />
              )}
            />
            <div>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/tagcloud" component={MyCloud} />
              <Switch>
                <AdminRoute
                  exact
                  path="/admin/tag-manage"
                  component={TagManage}
                />
              </Switch>
              <Switch>
                <AdminRoute exact path="/admin" component={AdminDashboard} />
              </Switch>
              <Switch>
                <AdminRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <GlobalFooter />
          </Layout>
        </div>
      </Router>
    );
  }
}

BasicLayout.propTypes = {
  setCurrentData: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { setCurrentData, setCurrentPage })(
  BasicLayout
);
