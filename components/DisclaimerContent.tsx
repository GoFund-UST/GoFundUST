import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';

const DisclaimerContent = () => {
  return (
    <Box pt={['10', null, '16', '28']} pb={['16', null, null, '20']}>
      <Container
        maxW="container.xl"
        px={['8', null, '12']}
        color="white"
        className="prose"
      >
        <VStack spacing="34">
          <h1>GoFund Disclaimers (DRAFT)</h1>
          <VStack spacing="10" align="flex-start">
            <p>
              <i>
                Participation in the GoFund US(T) “GoFund” involves
                significant risks and uncertainties. Please be advised that all
                relevant technologies are being provided on an as-is basis,
                without representation, warranty, insurance or indemnity, and
                that all participation is solely at your own sole risk. You
                should carefully review and understand the{' '}
                <a
                  href="https://github.com/PFC-Validator/GoFund-UST-contracts"
                  target="_blank"
                  rel="noreferrer"
                >
                 GoFund US(T) smart contract code
                </a>{' '}
                and all relevant technologies before participating in the GoFund
                drop transactions. As noted below, in the event of security
                threats, such code is subject to change after launch by action
                of the owner (TBD Multisig). You should always ensure that you understand
                the specific smart contracts on Terra mainnet (columbus-5)
                blockchain system (the “<strong>Terra</strong>”) that are in
                control of your tokens—the addresses of these smart contracts on
                Terra can be found through the GoFund changelog{' '}
                <a
                  href="https://github.com/PFC-Validator/GoFund-UST-contracts"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
                , as it may be updated from time to time. Please note each GoFund will have a separate smart contract addresses by design.
              </i>
            </p>
            <p>
              <u>Nature of Token Deposits and Locking.</u> When you deposit any
              tokens into GoFund-related smart contracts, you are committing
              such tokens to the sole and absolute control of those smart
              contracts as operated on Terra until such time as you withdraw
              such tokens from such smart contracts.{' '}
              <strong>
                <u>
                  Once your tokens are “locked “in the GoFund smart contract
                  system, you will not be able to withdraw them until the lockup
                  period (if any) you selected has expired. During the lockup period, you
                  will lose all powers over and benefits with respect to the
                  locked tokens,
                </u>
              </strong>{' '}
              other than the specific uses that the GoFund smart contract
              systems will make of the locked tokens during the lockup period.
              For further detail regarding when deposited tokens become
              irrevocably locked in the GoFund smart contract system for the
              user-selected period pursuant to the GoFund process, as
              well as details regarding the specific uses that will be made of
              the locked-up tokens by the GoFund smart contract system while
              the tokens are locked, see{' '}
              <a
                href="https://example.com/tbd"
                target="_blank"
                rel="noreferrer"
              >
                “Hello, GoFund: Announcing the GoFund US(T)”
              </a>
              .
            </p>
            <p>
              <u>
                Irreversibility of Transactions and Lack of Remedies and
                Insurance for Damages.
              </u>{' '}
              Transactions on Terra are, under normal conditions, irreversible.
              Any tokens you deposit into GoFund-related smart contracts are
              subject to potential risk of permanent disablement, impairment,
              loss or forfeiture in the event of any exploits, bugs or
              malfunctions of the relevant smart contracts or Terra itself, and
              no remedy will be available from any person due to any damages you
              may suffer in connection with your participation in the GoFund
              or use of any of the relevant technologies.{' '}
            </p>
            <p>
              <u>
                No Investment or Lending; No Contract Rights; Absence of
                Counterparties.
              </u>{' '}
              The GoFund transactions are not intended to be an investment,
              a capital-raising transaction for an enterprise, a sale of your
              tokens to any person or group of persons or a purchase of GoFund
              from any person or group of persons. They are also not intended to
              be a loan, consignment or deposit of your tokens to or with, or a
              service provided to you by, any person or group of persons. Your
              deposited and/or locked tokens will not be owned by or under the
              control of any person or group of persons involved in creating
              GoFund, but will be under the control of permanent smart
              contract code on Terra. These smart contracts are operated on an
              unaffiliated basis by the proof-of-stake block validators for
              Terra. However, these validators also do not have individual
              ownership or control of the relevant smart contracts or Terra, and
              such validators lack any obligation or readily available method to
              coordinate a reversal or mitigation of any adverse results or
              damages you may suffer as a result of the operation of such smart
              contracts. There is no ‘transaction counterparty’ which has the
              discretionary power to reverse your transactions or recover your
              tokens or other assets, or which has made you a promise to return
              or refund any disabled, impaired, lost or forfeited assets. There
              is also no private or governmental insurance (on the part of the
              creators of the GoFund smart contract system, Terra validators,
              any nation-state or any other person) available to compensate you
              for any such losses or other adverse circumstances relating to the
              GoFund drop transactions.{' '}
            </p>
            <p>
              <u>Technical Risks; Independent Due Diligence Required.</u> The
              technologies and assets involved in the GoFund drop transactions
              are highly experimental and risky, have uncertain and potentially
              volatile value, and should be directly evaluated by experts in
              blockchain technologies before use. Use them solely at your own
              risk. You must not rely on any articles, summaries or published
              code audits as an accurate description or evaluation of the
              GoFund smart contracts or Terra or for purposes of making any
              financial or other decision. Instead, you must only participate in
              the GoFund drop transactions after thoroughly reviewing and
              understanding the code of the relevant smart contracts and Terra
              in your own independent due diligence process.
            </p>
            <p>
              <u>Multisig-Controlled Proxy Smart Contract Pattern.</u> The GoFund
              drop smart contracts will use a so-called ‘proxy upgradeability’
              pattern governed by a cryptographic multisignature smart contract
              stored on Terra (the “Multisig”). The Multisig, in turn, is
              administered by five natural persons who each hold a private key,
              any three of which may (by signing their respective private keys
              to the same transaction and broadcasting that transaction to Terra
              validators) instruct Terra validators to perform Multisig
              operations.{' '}
              <strong>
                <u>
                  Assuming Terra is operating in the ordinary course, it is
                  possible for the Multisig key holders, through the Multisig,
                  to change which smart contracts govern your locked tokens from
                  the{' '}
                  <a
                    href="https://github.com/link_to_safe"
                    target="_blank"
                    rel="noreferrer"
                  >
                  Apollo Safe page
                  </a>{' '}
                  to any arbitrary smart contract code selected by three or more
                  of the Multisig key holders.
                </u>
              </strong>{' '}
              This discretion of the Multisig key holders constitutes a material
              risk, and could enable your tokens to be misappropriated by the
              Multisig key holders if at least three of them collude.{' '}
              <strong>
                <u>
                  Due to the limitations of existing multisignature smart
                  contract architectures for Terra, there is no ‘timelock’ or
                  other delay feature which would guarantee GoFund drop
                  participants advanced notice of a code change initiated by the
                  Multisig.
                </u>
              </strong>
            </p>

            <p>
              <u>Lack of Governmental Oversight.</u> The GoFund transactions
              and all related facts and circumstances have not been reviewed,
              approved, endorsed or registered with any regulator or other
              governmental entity. The creators of the GoFund smart contract
              system and Terra are not licensed by any regulator or other
              authority to provide any legal, financial, accounting, investment
              or other advice or services.
            </p>

          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default DisclaimerContent;
