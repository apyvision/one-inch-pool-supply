import {Address, BigDecimal, BigInt, log, ethereum} from "@graphprotocol/graph-ts";
import {Deployed} from "../generated/MooniswapFactory/MooniswapFactory";
import {Erc20, Transfer} from "../generated/templates/Pool/Erc20";
import {Pool as PoolTemplate} from '../generated/templates'
import {Pool} from "../generated/schema";


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

function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function handleNewPool(event: Deployed): void {
  let poolAddress = event.params.mooniswap;
  log.warning("[1inch] Creating factory tracking for pair address: {}", [poolAddress.toHexString()])
  PoolTemplate.create(poolAddress);
}

export function handleTransfer(event: Transfer): void {
  let poolAddress = event.address;
  let totalSupply = Erc20.bind(poolAddress).totalSupply();

  let pool = Pool.load(poolAddress.toHexString())
  if (pool == null) {
    pool = new Pool(poolAddress.toHexString())
  }
  pool.totalSupply = convertTokenToDecimal(totalSupply, BI_18);
  pool.save()
}

