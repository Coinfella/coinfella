import OnramperWidget from "@onramper/widget";
import React from "react";

interface Props {
  amount: string;
  preferredCrypto: string;
  walletAddress: string;
}

// onramper doc https://docs.onramper.com/widget/

if (document.readyState === "complete") {
  var title = document.getElementsByClassName("FT8c3")[0];
  //title.innerHTML = "Pay your invoice- add a tip if you'd like to support crypto entrepreneurs."
}
export default function DynamicOnramper({
  amount,
  preferredCrypto,
  walletAddress,
}: Props) {
  var walletAddresses = {};
  // TODO: We can change this later to as supported wallets rather than this check
  if (preferredCrypto == "ETH") {
    walletAddresses = { ETH: { address: walletAddress } };
  } else if (preferredCrypto == "SOL") {
    walletAddresses = { SOL: { address: walletAddress } };
  } else if (preferredCrypto == "BTC") {
    walletAddresses = { BTC: { address: walletAddress } };
  }
  
  return (
    <div
      style={{
        width: "440px",
        height: "595px",
        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
        borderRadius: "15px",
        margin: "auto",
      }}
    >
      <OnramperWidget
        defaultFiat="USD"
        defaultAmount={amount}
        addresses={walletAddress}
        isAddressEditable={false}
        // TODO: this should be changed later
        isAmountEditable={true}
        defaultAddrs={walletAddresses}
        defaultCrypto={preferredCrypto}
        API_KEY={process.env.NEXT_PUBLIC_ON_RAMPER_API_KEY}
      />
    </div>
  );
}
