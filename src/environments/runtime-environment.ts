declare var ENV;

export const runtimeEnvironment = {
  nodeName: ENV.nodeName === '${K8S_NODE_NAME}' ? false : ENV.nodeName,
  podName: ENV.podName === '${K8S_POD_NAME}' ? false : ENV.podName
};
