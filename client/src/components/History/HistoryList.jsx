import React from 'react';

export const HistoryList = ({ history }) => {
  let outcome;
  return (
    <div>
      {history.map(hist => {
        outcome = hist.outcome === 0 ? 'Loss' : 'Win';
        return (
          <li>
            <div>{outcome}</div>
            <div>Opponent: {hist.challenger_id}</div>
            <div>Clout Earned: {hist.clout}</div>
          </li>
        )})}
    </div>
  )
};

// line 12 used to have the below text. Are we supposed to join this query as well??
// <div>Opponent: {hist.receiver.rows[0].username}</div>