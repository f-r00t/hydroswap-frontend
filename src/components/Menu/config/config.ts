import { MenuItemsType, DropdownMenuItemType } from 'hydroswap-uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade 📈'),
    icon: 'Swap',
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('My Portfolio 💼'),
    href: '/soon',
    icon: 'Earn',
    items: [
      {
        label: t('My Tokens'),
        href: '/soon',
      },
      {
        label: t('My NFTs'),
        href: '/soon',
      },
    ],
  },
  // {
  //   label: t('Win'),
  //   href: '/prediction',
  //   icon: 'Trophy',
  //   items: [
  //     {
  //       label: t('Trading Competition'),
  //       href: '/competition',
  //     },
  //     {
  //       label: t('Prediction (BETA)'),
  //       href: '/prediction',
  //     },
  //     {
  //       label: t('Lottery'),
  //       href: '/lottery',
  //     },
  //   ],
  // },
  {
    label: t('NFTs 🎨'),
    href: `${nftsBaseUrl}`,
    icon: 'Nft',
    items: [
      {
        label: t('Overview'),
        href: '/soon',
      },
      {
        label: t('Collections'),
        href: '/soon',
      },
      {
        label: t('Activity'),
        href: '/soon',
      },
    ],
  },
  {
    label: 'Info',
    href: '/info',
    icon: 'More',
    hideSubNav: true,
    items: [
      {
        label: t('Stats'),
        href: '/info',
      },
      // {
      //   label: t('IFO'),
      //   href: '/ifo',
      // },
      // {
      //   label: t('Voting'),
      //   href: '/voting',
      // },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      // {
      //   label: t('Leaderboard'),
      //   href: '/teams',
      // },
      // {
      //   type: DropdownMenuItemType.DIVIDER,
      // },
      {
        label: t('Project Hydro'),
        href: 'https://projecthydro.org',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Docs'),
        href: 'https://docs.pancakeswap.finance',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export default config
