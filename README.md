# APY Vision One Inch Supply Subgraph

#### Introduction 

This is one of the subgraphs used for [APY Vision](https://apy.vision)

#### Building
To generate the mapping ts files, please do:
```
yarn codegen
```
To deploy, please use:
```
 graph deploy \
    --debug \
    --node https://api.thegraph.com/deploy/ \
    --ipfs https://api.thegraph.com/ipfs/ \
    apyvision/one-inch-pool-supply
```


