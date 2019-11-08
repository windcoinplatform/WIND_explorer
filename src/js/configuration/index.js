import mainnet from './config.mainnet';
import custom from './config.custom';


const configuredNetworks = [mainnet, custom]
    .filter(item => __NETWORKS__.includes(item.networkId));

export default configuredNetworks;
