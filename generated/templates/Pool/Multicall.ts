// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Multicall__aggregateResult {
  value0: BigInt;
  value1: Array<Bytes>;

  constructor(value0: BigInt, value1: Array<Bytes>) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromBytesArray(this.value1));
    return map;
  }
}

export class Multicall__aggregateInputCallsStruct extends ethereum.Tuple {
  get target(): Address {
    return this[0].toAddress();
  }

  get callData(): Bytes {
    return this[1].toBytes();
  }
}

export class Multicall extends ethereum.SmartContract {
  static bind(address: Address): Multicall {
    return new Multicall("Multicall", address);
  }

  getCurrentBlockTimestamp(): BigInt {
    let result = super.call(
      "getCurrentBlockTimestamp",
      "getCurrentBlockTimestamp():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getCurrentBlockTimestamp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCurrentBlockTimestamp",
      "getCurrentBlockTimestamp():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  aggregate(
    calls: Array<Multicall__aggregateInputCallsStruct>
  ): Multicall__aggregateResult {
    let result = super.call(
      "aggregate",
      "aggregate(tuple[]):(uint256,bytes[])",
      [ethereum.Value.fromTupleArray(calls)]
    );

    return new Multicall__aggregateResult(
      result[0].toBigInt(),
      result[1].toBytesArray()
    );
  }

  try_aggregate(
    calls: Array<Multicall__aggregateInputCallsStruct>
  ): ethereum.CallResult<Multicall__aggregateResult> {
    let result = super.tryCall(
      "aggregate",
      "aggregate(tuple[]):(uint256,bytes[])",
      [ethereum.Value.fromTupleArray(calls)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Multicall__aggregateResult(
        value[0].toBigInt(),
        value[1].toBytesArray()
      )
    );
  }

  getLastBlockHash(): Bytes {
    let result = super.call(
      "getLastBlockHash",
      "getLastBlockHash():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_getLastBlockHash(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getLastBlockHash",
      "getLastBlockHash():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getEthBalance(addr: Address): BigInt {
    let result = super.call(
      "getEthBalance",
      "getEthBalance(address):(uint256)",
      [ethereum.Value.fromAddress(addr)]
    );

    return result[0].toBigInt();
  }

  try_getEthBalance(addr: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getEthBalance",
      "getEthBalance(address):(uint256)",
      [ethereum.Value.fromAddress(addr)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCurrentBlockDifficulty(): BigInt {
    let result = super.call(
      "getCurrentBlockDifficulty",
      "getCurrentBlockDifficulty():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getCurrentBlockDifficulty(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCurrentBlockDifficulty",
      "getCurrentBlockDifficulty():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCurrentBlockGasLimit(): BigInt {
    let result = super.call(
      "getCurrentBlockGasLimit",
      "getCurrentBlockGasLimit():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getCurrentBlockGasLimit(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCurrentBlockGasLimit",
      "getCurrentBlockGasLimit():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCurrentBlockCoinbase(): Address {
    let result = super.call(
      "getCurrentBlockCoinbase",
      "getCurrentBlockCoinbase():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getCurrentBlockCoinbase(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getCurrentBlockCoinbase",
      "getCurrentBlockCoinbase():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getBlockHash(blockNumber: BigInt): Bytes {
    let result = super.call("getBlockHash", "getBlockHash(uint256):(bytes32)", [
      ethereum.Value.fromUnsignedBigInt(blockNumber)
    ]);

    return result[0].toBytes();
  }

  try_getBlockHash(blockNumber: BigInt): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getBlockHash",
      "getBlockHash(uint256):(bytes32)",
      [ethereum.Value.fromUnsignedBigInt(blockNumber)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }
}

export class AggregateCall extends ethereum.Call {
  get inputs(): AggregateCall__Inputs {
    return new AggregateCall__Inputs(this);
  }

  get outputs(): AggregateCall__Outputs {
    return new AggregateCall__Outputs(this);
  }
}

export class AggregateCall__Inputs {
  _call: AggregateCall;

  constructor(call: AggregateCall) {
    this._call = call;
  }

  get calls(): Array<AggregateCallCallsStruct> {
    return this._call.inputValues[0].value.toTupleArray<
      AggregateCallCallsStruct
    >();
  }
}

export class AggregateCall__Outputs {
  _call: AggregateCall;

  constructor(call: AggregateCall) {
    this._call = call;
  }

  get blockNumber(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get returnData(): Array<Bytes> {
    return this._call.outputValues[1].value.toBytesArray();
  }
}

export class AggregateCallCallsStruct extends ethereum.Tuple {
  get target(): Address {
    return this[0].toAddress();
  }

  get callData(): Bytes {
    return this[1].toBytes();
  }
}
