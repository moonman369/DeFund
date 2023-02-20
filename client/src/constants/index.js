import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
  home,
} from '../assets';

export const navlinks = [
  {
    name: 'home',
    imgUrl: home,
    link: '/',
  },
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/campaigns',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  // {
  //   name: 'payment',
  //   imgUrl: payment,
  //   link: '/',
  //   disabled: true,
  // },
  // {
  //   name: 'withdraw',
  //   imgUrl: withdraw,
  //   link: '/',
  //   disabled: true,
  // },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    // link: '/',
    // disabled: true,
  },
];

let map = new Map();
for (let navlink of navlinks) {
  if (!navlink.disabled) map.set(navlink.link, navlink.name);
}

export const linkMap = map;
