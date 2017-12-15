const Ipfs = require('ipfs')

const getIpfs = () => new Promise((resolve, reject) => {
  const ipfs = new Ipfs({ config: { Addresses: { Swarm: [] } } })
  if (ipfs.isOnline()) return resolve(ipfs)
  ipfs.on('ready', () => resolve(ipfs)).on('error', reject)
})

;(async () => {
  console.log('Please wait booting IPFS...')
  const ipfs = await getIpfs()
  const path = '/ipfs/QmfGBRT6BbWJd7yUc2uYdaUZJBbnEFvTqehPFoSMQ6wgdr/tour'
  console.log(`Getting path ${path}`)
  try {
    await ipfs.files.cat(path)
    console.error('??? should throw')
  } catch (err) {
    if (err.message.toLowerCase() === 'this dag node is a directory') {
      console.log('Hooray, it work!')
    } else {
      console.log(':( it not work')
      throw err
    }
  }
})()
