import { DeployFunction } from 'hardhat-deploy/dist/types'

import {
  assertContractVariable,
  deploy, deploySleepTime,
  getContractFromArtifact,
} from '../src/deploy-utils'
import {sleep} from "@eth-optimism/core-utils";

const deployFn: DeployFunction = async (hre) => {
  const OptimismPortalProxy = await getContractFromArtifact(
    hre,
    'OptimismPortalProxy'
  )

  await sleep(deploySleepTime)
  await deploy({
    hre,
    name: 'PortalSender',
    args: [OptimismPortalProxy.address],
    postDeployAction: async (contract) => {
      await assertContractVariable(
        contract,
        'PORTAL',
        OptimismPortalProxy.address
      )
    },
  })
}

deployFn.tags = ['PortalSenderImpl', 'setup', 'l1']

export default deployFn
