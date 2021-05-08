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
import SignUp from '../pages/SingUp';
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
        <Route path="/question" exact component={Question} />
        <Route path="/search" exact component={Search} />
        <Route path="/problem/:prob_num" exact component={ProblemDetail} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
