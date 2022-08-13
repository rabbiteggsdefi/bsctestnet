import { RXSAMT ,TOKENNAME ,BASEIMAGEPATH } from "../config/constclient";

const coinpath = BASEIMAGEPATH.concat('rxscoin.png');
const data = {
  products: [
    {
      id: '1',
      name: TOKENNAME,
      price: RXSAMT,
      image: coinpath,
    }
  ],
};
export default data;
