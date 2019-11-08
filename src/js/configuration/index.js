import mainnet from './config.mainnet';



const configuredNetworks = [mainnet]
    .filter(item => __NETWORKS__.includes(item.networkId));

export default configuredNetworks;
