import React, { useEffect, useState } from 'react'
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
import { Moralis } from "moralis";

import Page from '../Page'

const API_KEY = process.env.REACT_APP_MORALIS_X_API_KEY;
const SERVER_URL = process.env.MORALIS_SERVER_URL;

console.log(process.env);



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

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }
  const [balances, setBalances] = useState([])


 // const contract = new library.eth.Contract(erc20abijson, '0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51')


  useEffect(() => {

        const sleep = (ms) => {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        const sortByKey = (array, key) => {
            return array.sort(function(a, b) {
                const x = a[key]; const y = b[key];
                return y - x;
            });
        }

      const fetchPrices = async (balanceData) => {
        const finalBalance = balanceData;

        for (let i = 0; i < balanceData.length; i++) {

        await sleep(200);  // eslint-disable-line no-await-in-loop
        fetch(`https://deep-index.moralis.io/api/v2/erc20/${balanceData[i].token_address}/price?chain=bsc`, {
        headers: {
          'x-api-key': API_KEY,
          'accept': 'application/json'
        }
      })
      .then(
        response => response.json()
      )
      .then(data => {



        finalBalance[i].price = (data.usdPrice * parseFloat(getFullDisplayBalance(finalBalance[i].balance, finalBalance[i].decimals, 3))).toFixed(2);
        if (finalBalance[i].price === "NaN") {
          finalBalance[i].price = 0.00;
        }
        setBalances(sortByKey(finalBalance, 'price'));

      })



    }

  }


      const fetchBalance = () => {

        fetch(`https://deep-index.moralis.io/api/v2/${account}/erc20?chain=bsc`, {
        headers: {
          'x-api-key': API_KEY,
          'accept': 'application/json'
        }
      })
      .then(
        response => response.json()
      )
      .then(data => {

        console.log(data);
        fetchPrices(data);
      })

      }

    if(account){
      fetchBalance()
    }
  }, [account])

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
              {balances.length && balances.map(token => (
                <tr>
                  <td>{token.name} ({token.symbol})</td>
                  <td>{getFullDisplayBalance(token.balance, token.decimals, 2)}</td>
                  <td>${token.price}</td>
                </tr>
              ))}
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
