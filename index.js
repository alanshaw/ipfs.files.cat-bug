const Ipfs = require('ipfs')

function getIpfs () {
  const ipfs = new Ipfs({ config: { Addresses: { Swarm: [] } } })
  return ipfs.isOnline()
    ? Promise.resolve(ipfs)
    : new Promise((resolve, reject) => {
      ipfs.on('ready', () => resolve(ipfs)).on('error', reject)
    })
}

(async () => {
  console.log('Please wait booting IPFS...')
  const ipfs = await getIpfs()
  const path = '/ipfs/QmfGBRT6BbWJd7yUc2uYdaUZJBbnEFvTqehPFoSMQ6wgdr/tour'
  console.log(`Getting path ${path}`)
  try {
    await ipfs.files.cat(path)
    console.log('??? should throw')
  } catch (err) {
    if (err.message.toLowerCase() === 'this dag node is a directory') {
      console.log('Hooray, it work!')
    } else {
      console.log(':( it not work')
      throw err
    }
  }
})()
