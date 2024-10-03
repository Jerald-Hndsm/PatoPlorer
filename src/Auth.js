import { getAuth } from 'firebase/auth';

const auth = getAuth();
auth.currentUser.sendEmailVerification()
  .then(() => {
    console.log('Verification email sent.');
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
