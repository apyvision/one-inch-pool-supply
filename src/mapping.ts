import {BigDecimal, BigInt, log, ethereum, Address} from "@graphprotocol/graph-ts";
import {Deployed as DeployedV10} from "../generated/MooniswapFactory/MooniswapFactory";
import {Deployed as DeployedV11} from "../generated/MooniswapFactoryV11/MooniswapFactoryV11";
import {Erc20, Transfer} from "../generated/templates/Pool/Erc20";
import {Multicall} from "../generated/templates/Pool/Multicall";
import {Pool as PoolTemplate} from '../generated/templates'
import {Pool} from "../generated/schema";
import {PoolAbi} from "../generated/templates/Pool/PoolAbi";


let BI_8 = BigInt.fromI32(8)
let BI_18 = BigInt.fromI32(18)
let BI_10 = BigInt.fromI32(10)
let ZERO_BI = BigInt.fromI32(0)
let ONE_BI = BigInt.fromI32(1)

function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  // hardcode overrides
  if (tokenAddress.toHexString() == '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9') {
    return BigInt.fromI32(18)
  }

  let contract = Erc20.bind(tokenAddress)
  // try types uint8 for decimals
  let decimalValue = null
  let decimalResult = contract.try_decimals()
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value
  }
  return BigInt.fromI32(decimalValue as i32)
}


function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function handleNewPool(event: DeployedV10): void {
  let poolAddress = event.params.mooniswap;
  log.warning("[1inch] Creating factory tracking for pair address: {}", [poolAddress.toHexString()])
  let pool = Pool.load(poolAddress.toHexString())
  if (pool == null) {
    pool = new Pool(poolAddress.toHexString())
    pool.token1 = event.params.token1
    pool.token2 = event.params.token2
    pool.totalSupply = ZERO_BI.toBigDecimal()
    pool.token1Supply = ZERO_BI.toBigDecimal()
    pool.token2Supply = ZERO_BI.toBigDecimal()
    pool.save()
  }
  PoolTemplate.create(poolAddress);
}

export function handleNewPoolV11(event: DeployedV11): void {
  let poolAddress = event.params.mooniswap;
  log.warning("[1inch] Creating factory tracking for pair address: {}", [poolAddress.toHexString()])
  let pool = Pool.load(poolAddress.toHexString())
  if (pool == null) {
    pool = new Pool(poolAddress.toHexString())
    pool.token1 = event.params.token1
    pool.token2 = event.params.token2
    pool.totalSupply = ZERO_BI.toBigDecimal()
    pool.token1Supply = ZERO_BI.toBigDecimal()
    pool.token2Supply = ZERO_BI.toBigDecimal()
    pool.save()
  }
  PoolTemplate.create(poolAddress);
}

export function handleTransfer(event: Transfer): void {
  let poolAddress = event.address;
  let pool = Pool.load(poolAddress.toHexString())
  let poolContract = PoolAbi.bind(poolAddress);

  pool.totalSupply = convertTokenToDecimal(Erc20.bind(poolAddress).totalSupply(), BI_18);

  if (pool.token1.toHexString() == "0x0000000000000000000000000000000000000000") {
    // use multi call here
    const bal = Multicall.bind(Address.fromString("0xeefba1e63905ef1d7acba5a8513c70307c1ce441")).getEthBalance(poolAddress)
    pool.token1Supply = convertTokenToDecimal(bal, BI_18)
  } else {
    let tokenAddress = Address.fromString(pool.token1.toHexString());
    pool.token1Supply = convertTokenToDecimal(Erc20.bind(tokenAddress).balanceOf(poolAddress), fetchTokenDecimals(tokenAddress))
  }

  let tokenAddress = Address.fromString(pool.token2.toHexString());
  pool.token2Supply = convertTokenToDecimal(Erc20.bind(tokenAddress).balanceOf(poolAddress), fetchTokenDecimals(tokenAddress))

  pool.fee = convertTokenToDecimal(poolContract.fee(), BI_18)
  pool.slippageFee = convertTokenToDecimal(poolContract.slippageFee(), BI_18)

  pool.save()
}

