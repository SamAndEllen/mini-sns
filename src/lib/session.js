import { Base64 } from 'js-base64';

export default {
  setRouterSession($router, $store) {
    $router.beforeEach(async (to, from, next) => {
      const accessToken = document.cookie.match(
        new RegExp('access_token=([^;]+)')
      );

      if(accessToken) {
        const tokenDecode = JSON.parse(Base64.decode(accessToken[1].split('.')[1]));
        $store.commit('members/setName', tokenDecode.userName);
      }

      next();
    });
  }
}