import React from 'react'
import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { useTranslation } from 'contexts/Localization'
import { PageMeta } from 'components/Layout/Page'
import { Flex, Box, Heading, CardBody, CardFooter, Card, Table, LinkExternal } from 'hydroswap-uikit'
import tokens from 'config/constants/tokens'
import useTokenBalance, { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import { getFullDisplayBalance, formatBigNumber } from 'utils/formatBalance'
import { getBscScanLink } from 'utils'
import { MoralisProvider, useERC20Balances } from "react-moralis";

import Page from '../Page'




const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Portfolio: React.FC = () => {

  const { balance: cakeBalance, fetchStatus: cakeFetchStatus } = useTokenBalance(tokens.cake.address)
  const { balance, fetchStatus } = useGetBnbBalance()
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { data: assets } = useERC20Balances();
  console.log(assets);

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }


//  const contract = new library.eth.Contract(erc20abijson, '0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51')

  // const transactions = fetch(`https://api.bscscan.com/api?module=account&action=tokentx&address=${account}&page=1&offset=5&startblock=0&endblock=999999999&sort=asc`)
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data);
  //
  //   const l = data.result.length;
  //   for (let i = 0; i < l; i++) {
  //
  //     console.log(data.result[i]);
  //
  //     const thisTx = data.result[i];
  //
  //     const decimals = thisTx.tokenDecimal;
  //
  //     const atomic = thisTx.value;
  //
  //     if (tokenBalances[thisTx.contractAddress] === undefined) {
  //
  //       tokenBalances[thisTx.contractAddress] = { tokenName: thisTx.tokenName, tokenSymbol: thisTx.tokenSymbol, balance: (atomic / 10 ** decimals) };
  //
  //     } else {
  //
  //       tokenBalances[thisTx.contractAddress].balance += (atomic / 10 ** decimals);
  //
  //     }
  //
  //   }
  //
  //   console.log(tokenBalances);
  //
  //
  // })

  return (
    <>
    <Page>
      <Flex width="100vw" justifyContent="center" position="relative">
        <Card>
          <Box p="16px">
            <Heading size="xl" color="white">
              My portfolio
            </Heading>
          </Box>
          <CardBody><p>{account}</p>         <LinkExternal href={getBscScanLink(account, 'address')}>{t('View on BscScan')}</LinkExternal></CardBody>
          <CardFooter>
          <Table width="100%">
            <thead>
              <tr>
                <th>Token</th>
                <th>Amount</th>
                <th>USD Value</th>
              </tr>
            </thead>
            <tbody style={{textAlign: "left"}}>
              <tr>
                <td>BNB</td>
                <td>{formatBigNumber(balance, 6)}</td>
                <td>Cell 1-3</td>
              </tr>
              <tr>
                <td>HYDRO</td>
                <td>{getFullDisplayBalance(cakeBalance, 18, 3)}</td>
                <td>Cell 2-3</td>
              </tr>
            </tbody>
          </Table>
          </CardFooter>

        </Card>
        </Flex>

      </Page>
  </>
  )
}

export default Portfolio
