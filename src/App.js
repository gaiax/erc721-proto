import React, { Component } from 'react';
import './App.css';
//import web3 from './Web3.js'
import Web3 from 'web3'
import ipfs from "./ipfs.js";
import Token from './abis/TraceableToken.json'
import ForceDirected from './FroceDirected'
import ContentsList from './ContentsList'
import Guideline from './Guideline.js'
import Spinner from './Spinner.js'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  
  async loadBlockchainData() {
    try {
      const web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/v3/19fda31148fc4dc89c7f353ffd25d15b')
      //const network = await web3.eth.net.getNetworkType()
      const networkId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      const token = await web3.eth.Contract(Token.abi, Token.networks[networkId].address)
      this.setState({ web3 })
      this.setState({ account: accounts[0] })
      this.setState({ token })
      await this.loadTokenInfo()
    } catch (error) {
      var result = window.confirm('Metamaskをダウンドードし、ネットワークをRoptenに設定してください。ダウンロードの方法のページを開きますか？');
    
      if( result ) {
        await window.open('https://oss.gaiax-blockchain.com/metamask.html');
      }
      else {
        console.log('キャンセルがクリックされました');
      }
      console.error(error);
    }
  }

  async loadTokenInfo() {
    const lastTokenId = await this.state.token.methods.numberOfToken().call() 
    //コンテンツのデータを作る
    for (var i = 1; i <= lastTokenId; i++) { 
      const tokenURI = await this.state.token.methods.tokenURI(i).call()
      const tokenName = await this.state.token.methods.getTokenName(i).call()
      const referencedTokenIds = await this.state.token.methods.getRereferencedTokenId(i).call()
      var items = []
      items["tokenID"] = i;
      items["tokenURI"] = tokenURI;
      items["tokenName"] = tokenName;
      items["referencedTokenIds"] = referencedTokenIds;
      this.setState({
        tokenData: [...this.state.tokenData, items]
      })
    }
    //コンテンツのデータ
    console.log(this.state.tokenData)
    
    //Force directed graphを作るための配列
    const nodes = []
    const links = []
    for (var j = 1; j <= lastTokenId; j++) {
      nodes.push({ id: j })
      const rereferencedTokenIds = await this.state.token.methods.getRereferencedTokenId(j).call()
      if (rereferencedTokenIds != null) {
        for (var k = 0; k < rereferencedTokenIds.length; k++) {
          links.push({ source: j, target: Number(rereferencedTokenIds[k]) })
        }
      }
    }
    const data = ({nodes, links})
    this.setState({ data })
    //グラフのデータ
    console.log(this.state.data)
    
    this.setState({ loading: false })
  }
  
  onSubmit = async ( ipfsHash, tokenName, rereferenceTokenIds, distributionRates) => {
    console.log('on Submit ...')
    this.setState({ 
      loading: true,
      tokenData: [],
    })
    await ipfs.files.add(ipfsHash, async (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      console.log(result[0])
      await this.state.token.methods.mint(result[0].hash, tokenName, rereferenceTokenIds, distributionRates).send({ from: this.state.account })
      .once('receipt', async (receipt) => { 
        await window.location.reload()
        await this.setState({ loading: false }) 
      })
    }) 
  }

  payment = async ( tokenId, amount ) => {
    this.setState({ loading: true })
    const ethAmount = this.state.web3.utils.toWei((amount).toString(), 'ether')
    await this.state.token.methods.sendEther(tokenId).send({ from: this.state.account, value: ethAmount})
    await this.listenTransferEvents()
    await this.setState({ loading: false })
  }

  async listenTransferEvents() {
    const transferEvent = await this.state.token.events.TransferEther({}, {
      fromBlock: 0,
      toBlock: 'latest',
    })
    await console.log(transferEvent)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      tokenData: [],
      data: ``,
      sample: [],
      loading: true,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.payment = this.payment.bind(this)
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
          <a className="navbar-brand" href="/">ERC721 TraceableToken</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/#">#</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/#">#</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          { this.state.loading ? <div className="loader"><h3>loading...</h3><p>トランザクションの読み込みに時間がかかる場合があります...  <Spinner /></p></div> : 
            <>
              <Guideline />
              <ForceDirected 
                data = {this.state.data} 
                tokenData = {this.state.tokenData} 
                payment = {this.payment}
                onSubmit={this.onSubmit}
              />
              <hr/> 
              <ContentsList 
                tokenData = {this.state.tokenData}
              />
              { this.state.sample.map((item, key) => {
                return (
                  <div>
                    <p>{item.bar} : {item.baz}</p>
                  </div>
                )
              })}
            </> 
          }
        </div>
      </div>
    );
  }
}

export default App;


