import { config } from './config.js';

export function authenticateUser() {
  const useCredentials = config.useCredentials;

  if (!useCredentials) {
    console.log('Autenticação desativada para desenvolvimento.');
    return;
  }

  const pathSegments = window.location.pathname.split('/');
  const id = pathSegments[1];
  const emailParam = pathSegments[3];
  const phoneParam = pathSegments[4];

  const email = emailParam ? emailParam.split('=')[1] : null;
  const phone = phoneParam ? phoneParam.split('=')[1] : null;

  if (!email || !phone || !id) {
    window.location.href = 'https://neuralbroker.com.br';
    return;
  }

  const authUser = config.basicAuthUser;
  const authPass = config.basicAuthPass;

  const headers = new Headers();
  if (authUser && authPass) {
    headers.set('Authorization', 'Basic ' + btoa(`${authUser}:${authPass}`));
  }

  const apiUrl = `https://crm.neuralbroker.com.br/api/v1/User?select=id,rolesIds&where[0][type]=equals&where[0][attribute]=emailAddress&where[0][value]=${email}&where[1][type]=equals&where[1][attribute]=id&where[1][value]=${id}&where[2][type]=equals&where[2][attribute]=phoneNumber&where[2][value]=${phone}`;

  fetch(apiUrl, { headers })
    .then(response => response.json())
    .then(data => {
      if (data.total !== 1) {
        window.location.href = 'https://neuralbroker.com.br';
      } else {
        // Continue with onboarding process
        console.log('User authenticated:', data.list[0]);
      }
    })
    .catch(() => {
      window.location.href = 'https://neuralbroker.com.br';
    });
}
