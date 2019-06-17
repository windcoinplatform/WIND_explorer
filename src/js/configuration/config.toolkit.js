const nodeUrl = __TOOLKIT_API_NODE_URL__;
const nodes = __TOOLKIT_NODES_LIST__.split(',');

if (!nodes.includes(nodeUrl))
    nodes.push(nodeUrl);

export default {
    networkId: 'toolkit',
    displayName: 'Toolkit',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: false,
    nodes: nodes.map(url => ({
        url,
        maintainer: 'N/A',
        showAsLink: true
    }))
};
