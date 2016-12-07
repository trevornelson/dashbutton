import request from 'superagent';

export const setButton = (button_id) => {
  return {
    type: 'SET_BUTTON',
    button_id: button_id
  }
};

export const encryptPayload = (payload, callback) => {
  request
    .post('https://8sun4rnppg.execute-api.us-west-2.amazonaws.com/prod/encryptData')
    .set('Content-Type', 'application/json')
    .send(payload)
    .end((err, res) => {
      if (err || !res.ok) {
        alert('Shucks, data could not be encrypted/saved.');
      } else {
        callback(res.body);
      }
    });
};
