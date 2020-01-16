# Contents Reference Mapping
This application visualizes which content refers to which contents by using ERC721, 
and will enable to design contents distribution system. 

[日本語の概要はこちら]()

## Web Demosite
https://oss.gaiax-blockchain.com/erc721-proto/


## Contributing
Pull requests and stars are always welcome.

```
1. Fork it!
// 2. Create your feature branch.
$ git checkout -b my-new-feature.
// 3. Commit your changes
$ git commit -am 'Add some feature.
// 4. Push to the branch.
$ git push origin my-new-feature
5. Submit a pull request 
```

For bugs and feature requests, [create an issue](https://github.com/gaiax/eth-checkin-proto/issues).

## Developer's guide

1. Install Ganache. (https://www.trufflesuite.com/ganache)
2. Launch Ganache. 

```
// Install dependencies
$ git clone 
$ npm install
// Deploy contracts
$ truffle migrare --reset
// Launch web view.
$ npm run
```

## Documentation


# コンテンツリファレンスマッピング

## 概要
ERC721を利用して、作成したコンテンツがどの作品を参照したのかを可視化できるようにしたアプリです.
このアプリを使用することで、コンテンツの流通のシステムをデザインすることができます。

https://oss.gaiax-blockchain.com/erc721-proto/
(MetamaskでRopstenを選択してください)

## ローカル環境

・Ganacheをインストール（ https://www.trufflesuite.com/ganache ）</br>
・Ganacheを起動する</br>

```
$ git clone 
$ npm install
$ truffle migrare --reset
$ npm run
```

## アプリの使い方

### tokenの登録

Addページで、作成したコンテンツ、参照したコンテンツのtokenIdを追加して登録します。

### tokenの内容の表示
「詳細」でコンテンツの中身を確認できます。

### Custom Metadateの追加
全てのMetadateはTokenIdに紐ずいて記録されています。</br>
ですので、Metadateを追加したい場合には、`mapping`を使って行います。
例えばtokenに名前のMetadateをつけたい場合は下記のようにコードを書くことができます。

```
mapping (uint256 => string) internal tokenName;
function setTokenName(uint256 _tokenId, string calldata _tokenName) external {
  tokenName[_tokenId] = _tokenName;
}
function getTokenName(uint256 _tokenId) view external returns(string) {
  return tokenName[_tokenId];
}
```

## ユースケース
### UGC（User Generated Content）のn次創作分野

UGCの社会に出回る流れは下記のような流れになると考えられます。
```
作成 → 登録 → 公開 → 流通
```
インターネットの普及により、誰でも簡単にUGCを公開できるようになりました。ですが、作成したUGCを流通できる仕組みは成り立っていません。</br>
そこで「流通」において、ブロックチェーンが介在できる領域だと考えます。</br>

ブロックチェーンにより</br>
　①作り手への対価の支払い</br>
　②コンテンツ流通者への貢献度に応じた利益の分配</br>
　③コンテンツの権利の移転</br>
 
などが容易になると考えます。

### 特許の分野

特許を利用する際は、特許の保持者にお金を払う必要があります。ですが、そのお金は特許の保持者のところにしか行きません。現状の特許には、他の特許の考えも参考にしながら作られているものも多くあります。</br>
特許申請時に参照した特許、参照先へのTokenの分配率を記載することにより、特許利用の際にその特許の保持者だけにTokenが支払われるだけでなく、参照先にまで分配されるようになります。</br>
実現的な案としては、特許検索サイトの追加機能として加えることができると考えます。https://www.j-platpat.inpit.go.jp/</br>
特許の真正性の担保のため、特許のコントラクトへのデプロイは特許庁が行うことを想定してます。</br>

### オープンソース分野

特許を申請せずに自分のアイディアを一般に公開する場合もにも活用できると考えます。</br>
アイディアを広く使ってもらうためにオープンにすることがありますが、そのアイディアの流通がうまく設計されてない場合が多いです。</br>
アイディアを公表し、それがどのように使われ変遷していったか、どのような人に使われたか、といったことを可視化できるようになると、様々なアイディアによるコラボレーション、イノベーションが加速されると考えられます。</br>

具体的にはハッカソンでのアイディアなどに活用されると考えます。ハッカソンでは期間中に考えたアイディアを発表するだけで終わってしまい、出てきた成果物がそのハッカソンの中でだけに埋もれてしまうことが多くあります。</br>
ハッカソン中に出したアイディア一般に公開し、流通できる仕組みを作り上げることができると考えます。</br>

### 論文の分野

論文を執筆する際には、様々な文献を参照します。論文登録時に参照した論文も追記することにより、それぞれの論文のつながりを可視化してみることができます。</br>
論文検索はキーワード検索が主流であるが、参照検索による論文検索もできるようになり、研究が効率的に行えると考えます。

### アート分野

多くの人に作品を認知されることによって作品の価値が上がるため、通常アート作品は中古市場の方が価値が上がると言われています。</br>
ですが、アート作品のn次流通はその時点でのアート作品の保持者と購入希望者間のみで行われます。どんなにアート作品の価値が上がっても、作成者が1つのアート作品から得られる利益は最初の売却時のみの金額になります。</br>
なので、アート作品の流通基盤を確立することは重要だと考えます。</br>
作品の流通の際に作成者を明記することによって、作品の価値の上昇分の利益もアート作品の作成者に還元されるようになります。</br>

また、アートの世界では「この作品が正しいものなのか」ということにかなりのコストをかけています。作品が誰から誰に渡ったかを可視化し明確にすることで、作品の信頼性の担保の1つとして利用されると考えます</br>

## 仕組みの解説
### Force Layout

![スクリーンショット 2019-06-04 11 39 27](https://user-images.githubusercontent.com/45360515/59407136-45d61600-8deb-11e9-9c33-21b7ac6d4a5a.png)

```
const data = {
  nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
  links: [{ source: 1, target: 2 }, { source: 1, target: 3 }, { source: 2, target: 3 }]
};
```

それぞれのコンテンツのtokenIdを`nodes`で定義し、`source`から`target`に矢印が伸びるようになっています。</br>
例えば下記のような場合

```
{ source: 1, target: 2 }, { source: 1, target: 3 }
```

`tokenId 1`のコンテンツは`tokenId 2`と`tokenId 3`により参照されたことになります。 

### ipfs
登録したコンテンツはIPFS上に保存しています。
そして、IPFSのHashをブロックチェーンに書き込んでいます。

### Ethereum

ERC721を利用してコンテンツをNFTとして扱ってます。
IPFSのHash、参照したコンテンツのId、分配率などは`tokenId`に紐ずけて保存しています。





