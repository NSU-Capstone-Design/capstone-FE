import React from 'react';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SubPage from '../pages/SubPage';
import Main from '../pages/Main';
import Mypage from '../pages/Mypage';
import Login from '../pages/Login';
import Group from '../pages/Group';
import Search from '../pages/Search';
import Question from '../pages/Question';
import ProblemDetail from '../pages/ProblemDetail';
import GroupCreate from '../pages/GroupCreate';
import SignUp from '../pages/SingUp';
import GroupDetail from '../pages/GroupDetail';
import GroupManageList from '../pages/GroupManageList';
const useStyle = makeStyles({});

const Root = () => {
  const classes = useStyle();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/subpage" exact component={SubPage} />
        <Route path="/group" exact component={Group} />
        <Route path="/group/create" exact component={GroupCreate} />
        <Route path="/question" exact component={Question} />
        <Route path="/search" exact component={Search} />
        <Route path="/problemDetail" exact component={ProblemDetail} />
        <Route path="/group/:id" exact component={GroupDetail} />
        <Route path="/problem/:prob_num" exact component={ProblemDetail} />
        <Route
          path="/group/:id/memberManage"
          exact
          component={GroupManageList}
        />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
