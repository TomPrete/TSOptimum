import React from 'react';
import firebase from '../../firebase'


const UserProfileInfo = ({ firstName, lastName, email, title, personId, isAdmin }) => {

  const testFB = () => {
    firebase.database().ref('users').child(`${personId}`).set({firstName, lastName, email, title})
  }
  return (
    <div>
      <p>First Name: { firstName }</p>
      <p>Last Name: { lastName}</p>
      <p>Email: { email }</p>
      <p>Title { title }</p>
      <p>Person ID: { personId }</p>
      <button type='submit' onClick={testFB}>Submit</button>
    </div>
  );
};

export default UserProfileInfo;
