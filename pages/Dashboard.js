import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

// console.log("private key", process.env.NEXT_PRIVATE_METAMASK_KEY);

// const provider = ethers.getDefaultProvider("rinkeby");
// console.log("provider", provider);
// const sdk = new ThirdwebSDK();
// new ethers.Wallet(process.env.NEXT_PRIVATE_METAMASK_KEY, provider);

function Dashboard({ address }) {
  const [sanityTokens, setSanityTokens] = useState([]);
  const [thirdWebTokens, setThirdWebTokens] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await fetch(
          "https://ur70l7j4.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D"
        );
        const sanityTokens = (await coins.json()).result;
        setSanityTokens(sanityTokens);
      } catch (error) {
        console.log(error);
      }
    };

    getCoins();
  }, []);

  useEffect(() => {
    if (sanityTokens) {
      const sdk = new ThirdwebSDK(
        new ethers.Wallet(
          process.env.NEXT_PUBLIC_METAMASK_KEY,
          ethers.getDefaultProvider(
            "https://rinkeby.infura.io/v3/2a1a6b9be6424cf3b8cc85b72847fa1e"
          )
        ),
        {
          gasSettings: {
            maxPriceInGwei: 10000000,
            speed: "fast",
          },
        }
      );

      sanityTokens.map((tokenItem) => {
        const currentToken = sdk.getToken(tokenItem.contractAddress);
        setThirdWebTokens((prevState) => [...prevState, currentToken]);
      });
    }
  }, [sanityTokens]);

  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
        <Main
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
      </MainContainer>
    </Wrapper>
  );
}

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
  overflow: hidden;
`;

const MainContainer = styled.div`
  flex: 1;
`;
