import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { baseApi } from '../api/axiosApi';

const useStyles = makeStyles({});

const Search = () => {
  const loginState = useSelector((state) => state.account.status);
  const dispatch = useDispatch();
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
  }, []);
  const classes = useStyles();

  const [prob, setProb] = useState([]);
  useEffect(async () => {
    await baseApi.get('/problem/').then(({ data }) => setProb(data));
  }, []);

  return (
    <>
      <Header loginState={loginState} />
      <table id="problem-info">
        <thead>
          <tr>
            <th>문제 번호</th>
            <th>제목</th>
            <th>맞은 사람</th>
            <th>제출</th>
            <th>정답 비율</th>
          </tr>
        </thead>
        <tbody>
          {prob.map((probs) => (
            <div key={probs.id}>
              <table id="problme-info">
                <tbody>
                  <tr>
                    <td>{probs.id}</td>
                    <td>
                      <a href="/problem/">{probs.title}</a>
                    </td>
                    <td>{probs.correct_people}</td>
                    <td>{probs.submission}</td>
                    <td>{probs.correct_answer_rate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Search;
