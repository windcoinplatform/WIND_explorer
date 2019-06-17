import mainnet from './config.mainnet';
import testnet from './config.testnet';
import devnet from './config.devnet';
import toolkit from './config.toolkit';

const configuredNetworks = [mainnet, testnet, devnet, toolkit]
    .filter(item => __NETWORKS__.includes(item.networkId));

export default configuredNetworks;
